import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("📤 Mock file upload endpoint called")

    // Mock successful upload response
    const mockImageUrl = `/placeholder.svg?height=600&width=800&text=Uploaded+Image`

    console.log("✅ Mock upload successful:", mockImageUrl)

    return NextResponse.json(
      {
        success: true,
        imageUrl: mockImageUrl,
        message: "File uploaded successfully (mocked)",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Mock upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
