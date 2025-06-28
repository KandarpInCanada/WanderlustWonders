import { NextResponse } from "next/server"
import { postOperations } from "@/lib/dynamodb"

export async function GET() {
  try {
    const posts = await postOperations.getAllPosts()

    const totalStories = posts.length
    const totalLikes = posts.reduce((sum, post) => sum + (post.likes || 0), 0)

    // Count tags
    const tagCounts: { [key: string]: number } = {}
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag: string) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    const popularTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    const stats = {
      totalStories,
      totalLikes,
      popularTags,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching story stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
