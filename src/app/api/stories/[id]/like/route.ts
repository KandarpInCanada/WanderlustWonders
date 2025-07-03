import { type NextRequest, NextResponse } from "next/server"
import { postOperations } from "@/lib/in-memory-storage"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id: postId } = params
    const body = await request.json()
    const userId = body.userId || "anonymous"

    console.log(`❤️ Toggling like for story ${postId} by user ${userId}`)

    const updatedStory = await postOperations.toggleLike(postId, userId)

    if (!updatedStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 })
    }

    console.log(`✅ Successfully toggled like. New likes: ${updatedStory.likes}`)

    return NextResponse.json(updatedStory, {
      status: 200,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    })
  } catch (error) {
    console.error("❌ Error toggling like:", error)
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 })
  }
}
