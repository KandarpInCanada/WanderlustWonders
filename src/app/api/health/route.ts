import { NextResponse } from "next/server"

export async function GET() {
  try {
    console.log("🏥 Starting health check...")

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

    console.log("📊 Initial health status:", healthStatus)

    // Test AWS connectivity (DynamoDB)
    console.log("🗄️ Testing DynamoDB connection...")
    try {
      const { DynamoDBClient, DescribeTableCommand } = await import("@aws-sdk/client-dynamodb")

      const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1"
      const tableName = process.env.DYNAMODB_USER_TABLE || "UserDetails"

      console.log(`🗄️ DynamoDB config - Region: ${region}, Table: ${tableName}`)

      const client = new DynamoDBClient({
        region: region,
      })

      const command = new DescribeTableCommand({
        TableName: tableName,
      })

      const response = await client.send(command)
      console.log("✅ DynamoDB response:", {
        tableName: response.Table?.TableName,
        status: response.Table?.TableStatus,
        itemCount: response.Table?.ItemCount,
      })

      healthStatus.checks.database = "healthy"
    } catch (error) {
      console.error("❌ Database health check failed:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        tableName: process.env.DYNAMODB_USER_TABLE,
      })
      healthStatus.checks.database = "unhealthy"
    }

    // Test Supabase connectivity (simplified to avoid cookie issues)
    console.log("🔐 Testing Supabase connection...")
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      console.log(
        `🔐 Supabase config - URL: ${supabaseUrl ? "SET" : "NOT SET"}, Key: ${supabaseKey ? "SET" : "NOT SET"}`,
      )

      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase environment variables not configured")
      }

      const { createClient } = await import("@supabase/supabase-js")
      const supabase = createClient(supabaseUrl, supabaseKey)

      // Simple ping to check if Supabase is reachable - try to access auth
      const { data, error } = await supabase.auth.getSession()
      console.log("✅ Supabase response:", {
        hasSession: !!data.session,
        error: error?.message,
      })

      // Even if there's no session, if we can connect to Supabase, it's healthy
      healthStatus.checks.supabase = "healthy"
    } catch (error) {
      console.error("❌ Supabase health check failed:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "SET" : "NOT SET",
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "SET" : "NOT SET",
      })
      healthStatus.checks.supabase = "unhealthy"
    }

    // Test AWS S3 connectivity
    console.log("🪣 Testing S3 connection...")
    try {
      const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
      const region = process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1"

      console.log(`🪣 S3 config - Bucket: ${bucketName || "NOT SET"}, Region: ${region}`)

      if (!bucketName) {
        throw new Error("S3 bucket name not configured")
      }

      const { S3Client, HeadBucketCommand } = await import("@aws-sdk/client-s3")
      const s3Client = new S3Client({
        region: region,
      })

      const response = await s3Client.send(
        new HeadBucketCommand({
          Bucket: bucketName,
        }),
      )

      console.log("✅ S3 response:", {
        bucket: bucketName,
        region: region,
        metadata: response.$metadata,
      })

      healthStatus.checks.aws = "healthy"
    } catch (error) {
      console.error("❌ AWS S3 health check failed:", {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        bucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        region: process.env.NEXT_PUBLIC_AWS_REGION,
      })
      healthStatus.checks.aws = "unhealthy"
    }

    // Determine overall health
    const allHealthy = Object.values(healthStatus.checks).every((status) => status === "healthy")
    healthStatus.status = allHealthy ? "healthy" : "degraded"

    console.log("🏁 Final health status:", healthStatus)

    return NextResponse.json(healthStatus, {
      status: allHealthy ? 200 : 503,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("💥 Health check completely failed:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    })

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
