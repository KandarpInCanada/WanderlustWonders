import { type NextRequest, NextResponse } from "next/server"
import { postOperations, userOperations } from "@/lib/dynamodb"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { createStorySchema, sanitizeHtml, validateImageUrl } from "@/lib/validation"
import type { CreateUserData, TravelStory } from "@/types/story"

export async function GET() {
  try {
    const posts = await postOperations.getAllPosts()

    // Enrich posts with user data
    const enrichedPosts: TravelStory[] = await Promise.all(
      posts.map(async (post) => {
        try {
          const user = await userOperations.getUser(post.userId)
          return {
            postId: post.postId,
            userId: post.userId,
            title: post.title,
            content: post.content,
            location: post.location,
            imageUrl: post.imageUrl,
            tags: Array.isArray(post.tags) ? post.tags : [],
            likes: post.likes || 0,
            likedBy: Array.isArray(post.likedBy) ? post.likedBy : [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            author: user
              ? {
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                }
              : null,
          } as TravelStory
        } catch (error) {
          console.error(`Error enriching post ${post.postId}:`, error)
          // Return post without author info if user fetch fails
          return {
            postId: post.postId,
            userId: post.userId,
            title: post.title,
            content: post.content,
            location: post.location,
            imageUrl: post.imageUrl,
            tags: Array.isArray(post.tags) ? post.tags : [],
            likes: post.likes || 0,
            likedBy: Array.isArray(post.likedBy) ? post.likedBy : [],
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            author: null,
          } as TravelStory
        }
      }),
    )

    // Sort by creation date (newest first)
    enrichedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json(enrichedPosts)
  } catch (error) {
    console.error("Error fetching stories:", error)
    return NextResponse.json(
      { error: "Failed to fetch stories", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate input
    const validationResult = createStorySchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.errors,
        },
        { status: 400 },
      )
    }

    const { title, content, location, imageUrl, tags } = validationResult.data

    // Sanitize content
    const sanitizedTitle = sanitizeHtml(title)
    const sanitizedContent = sanitizeHtml(content)
    const sanitizedLocation = sanitizeHtml(location)

    // Validate image URL if provided
    if (imageUrl && !validateImageUrl(imageUrl)) {
      return NextResponse.json(
        { error: "Invalid image URL. Please use a supported image hosting service." },
        { status: 400 },
      )
    }

    // Ensure user exists in UserDetails table
    let userProfile = await userOperations.getUser(user.id)
    if (!userProfile) {
      const newUserData: CreateUserData = {
        userId: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name || user.email!.split("@")[0],
        avatar: user.user_metadata?.avatar_url,
        createdAt: new Date().toISOString(),
      }
      await userOperations.createUser(newUserData)
      userProfile = newUserData
    }

    // Create post
    const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const postData = {
      postId,
      userId: user.id,
      title: sanitizedTitle,
      content: sanitizedContent,
      location: sanitizedLocation,
      imageUrl: imageUrl || undefined,
      tags: tags || [],
      likes: 0,
      likedBy: [],
      createdAt: now,
      updatedAt: now,
    }

    await postOperations.createPost(postData)

    // Return post with author info
    const newPost: TravelStory = {
      ...postData,
      author: {
        name: userProfile.name,
        email: userProfile.email,
        avatar: userProfile.avatar,
      },
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating story:", error)
    return NextResponse.json(
      {
        error: "Failed to create story",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
