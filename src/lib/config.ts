// Centralized configuration management
export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  },
  aws: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1",
    // Remove access key and secret key - use IAM roles instead
  },
  dynamodb: {
    userTable: process.env.DYNAMODB_USER_TABLE || "UserDetails",
    postTable: process.env.DYNAMODB_POST_TABLE || "PostMetadata",
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },
} as const

// Validation function to ensure all required env vars are present
export function validateConfig() {
  const requiredVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    // Remove AWS credentials from required vars since we're using IAM roles
  ]

  const missing = requiredVars.filter((varName) => !process.env[varName])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}
