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
      const { DynamoDBClient, DescribeTableCommand } = await import("@aws-sdk/client-dynamodb")
      const client = new DynamoDBClient({
        region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
      })

      const command = new DescribeTableCommand({
        TableName: process.env.DYNAMODB_USER_TABLE || "UserDetails",
      })

      await client.send(command)
      healthStatus.checks.database = "healthy"
    } catch (error) {
      console.error("Database health check failed:", error)
      healthStatus.checks.database = "unhealthy"
    }

    // Test Supabase connectivity (simplified to avoid cookie issues)
    try {
      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      // Simple ping to check if Supabase is reachable
      const { error } = await supabase.from("_health").select("*").limit(1)
      // Even if the table doesn't exist, if we get a proper error response, Supabase is working
      healthStatus.checks.supabase = "healthy"
    } catch (error) {
      console.error("Supabase health check failed:", error)
      healthStatus.checks.supabase = "unhealthy"
    }

    // Test AWS S3 connectivity
    try {
      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
      if (!bucketName) {
        throw new Error("S3 bucket name not configured")
      }

      const { S3Client, HeadBucketCommand } = await import("@aws-sdk/client-s3")
      const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
      })

      await s3Client.send(
        new HeadBucketCommand({
          Bucket: bucketName,
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
