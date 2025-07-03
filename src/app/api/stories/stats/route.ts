import { NextResponse } from "next/server"
import { postOperations } from "@/lib/in-memory-storage"

export async function GET() {
  try {
    console.log("📊 Calculating story statistics from in-memory storage...")

    const stories = await postOperations.getAllPosts()

    // Calculate total likes
    const totalLikes = stories.reduce((sum, story) => sum + (story.likes || 0), 0)

    // Calculate popular tags
    const tagCounts: Record<string, number> = {}
    stories.forEach((story) => {
      if (Array.isArray(story.tags)) {
        story.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    const popularTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const stats = {
      totalStories: stories.length,
      totalLikes,
      popularTags,
    }

    console.log("✅ Successfully calculated stats:", stats)

    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ Error calculating stats:", error)
    return NextResponse.json({ error: "Failed to calculate statistics" }, { status: 500 })
  }
}
