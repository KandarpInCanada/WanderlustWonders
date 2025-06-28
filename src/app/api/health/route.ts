import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Enhanced health check with dependency verification
    const healthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      checks: {
        database: "checking",
        aws: "checking",
        supabase: "checking",
      },
    }

    // Test AWS connectivity (DynamoDB)
    try {
      const { dynamodb } = await import("@/lib/dynamodb")
      // Simple operation to test connectivity
      await dynamodb.send({
        input: {
          TableName: process.env.DYNAMODB_USER_TABLE || "UserDetails",
        },
        name: "DescribeTableCommand",
      } as any)
      healthStatus.checks.database = "healthy"
    } catch (error) {
      console.error("Database health check failed:", error)
      healthStatus.checks.database = "unhealthy"
    }

    // Test Supabase connectivity
    try {
      const { createServerSupabaseClient } = await import("@/lib/supabase-server")
      const supabase = createServerSupabaseClient()
      await supabase.auth.getSession()
      healthStatus.checks.supabase = "healthy"
    } catch (error) {
      console.error("Supabase health check failed:", error)
      healthStatus.checks.supabase = "unhealthy"
    }

    // Test AWS S3 connectivity
    try {
      const { S3Client, HeadBucketCommand } = await import("@aws-sdk/client-s3")
      const s3Client = new S3Client({ region: process.env.NEXT_PUBLIC_AWS_REGION })
      await s3Client.send(
        new HeadBucketCommand({
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        }),
      )
      healthStatus.checks.aws = "healthy"
    } catch (error) {
      console.error("AWS health check failed:", error)
      healthStatus.checks.aws = "unhealthy"
    }

    // Determine overall health
    const allHealthy = Object.values(healthStatus.checks).every((status) => status === "healthy")
    healthStatus.status = allHealthy ? "healthy" : "degraded"

    return NextResponse.json(healthStatus, {
      status: allHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Health check failed",
        checks: {
          database: "unknown",
          aws: "unknown",
          supabase: "unknown",
        },
      },
      { status: 503 },
    )
  }
}

// Add a simple root health check
export async function HEAD() {
  return new Response(null, { status: 200 })
}
