import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase-server"
import { s3Operations } from "@/lib/s3"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { fileName, contentType } = await request.json()

    if (!fileName || !contentType) {
      return NextResponse.json({ error: "fileName and contentType are required" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Generate unique key
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const fileExtension = fileName.split(".").pop()
    const key = `travel-stories/${user.id}/${timestamp}-${randomString}.${fileExtension}`

    // Generate presigned URL
    const result = await s3Operations.getPresignedUploadUrl(key, contentType)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error generating upload URL:", error)
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 })
  }
}
