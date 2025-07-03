import { type NextRequest, NextResponse } from "next/server"
import { postOperations } from "@/lib/in-memory-storage"

export async function GET() {
  try {
    console.log("📚 Fetching all stories from in-memory storage...")

    const stories = await postOperations.getAllPosts()

    console.log(`✅ Successfully fetched ${stories.length} stories`)

    return NextResponse.json(stories, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ Error fetching stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📝 Creating new story:", body.title)

    const postId = `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const postData = {
      postId,
      userId: body.userId || "anonymous",
      title: body.title,
      content: body.content,
      location: body.location,
      imageUrl: body.imageUrl || "/placeholder.svg?height=600&width=800",
      tags: Array.isArray(body.tags) ? body.tags : [],
      likes: 0,
      likedBy: [],
      createdAt: now,
      updatedAt: now,
    }

    await postOperations.createPost(postData)

    const createdStory = await postOperations.getPost(postId)

    console.log(`✅ Successfully created story: ${postId}`)

    return NextResponse.json(createdStory, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating story:", error)
    return NextResponse.json({ error: "Failed to create story" }, { status: 500 })
  }
}
