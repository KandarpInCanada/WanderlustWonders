import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { config } from "./config"

// Create S3 client using IAM roles (no explicit credentials)
const s3Client = new S3Client({
  region: config.aws.region,
  // Remove explicit credentials - the SDK will automatically use:
  // 1. IAM roles when running on ECS
  // 2. Environment variables in development
  // 3. AWS credentials file locally
})

export const s3Operations = {
  /**
   * Upload a file to S3
   */
  async uploadFile(key: string, body: Buffer | Uint8Array | string, contentType?: string) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
        Body: body,
        ContentType: contentType,
        // Add metadata for better organization
        Metadata: {
          uploadedAt: new Date().toISOString(),
          service: "travel-stories",
        },
      })

      const result = await s3Client.send(command)

      // Return the public URL
      const publicUrl = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${config.aws.region}.amazonaws.com/${key}`

      return {
        success: true,
        url: publicUrl,
        key,
        etag: result.ETag,
      }
    } catch (error) {
      console.error("Error uploading file to S3:", error)
      throw new Error("Failed to upload file")
    }
  },

  /**
   * Generate a presigned URL for uploading files directly from the client
   */
  async getPresignedUploadUrl(key: string, contentType: string, expiresIn = 3600) {
    try {
      const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
        ContentType: contentType,
        Metadata: {
          uploadedAt: new Date().toISOString(),
          service: "travel-stories",
        },
      })

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn })

      return {
        success: true,
        uploadUrl: presignedUrl,
        key,
        publicUrl: `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.${config.aws.region}.amazonaws.com/${key}`,
      }
    } catch (error) {
      console.error("Error generating presigned URL:", error)
      throw new Error("Failed to generate upload URL")
    }
  },

  /**
   * Delete a file from S3
   */
  async deleteFile(key: string) {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
      })

      await s3Client.send(command)

      return {
        success: true,
        key,
      }
    } catch (error) {
      console.error("Error deleting file from S3:", error)
      throw new Error("Failed to delete file")
    }
  },

  /**
   * Get a presigned URL for downloading/viewing files
   */
  async getPresignedDownloadUrl(key: string, expiresIn = 3600) {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
      })

      const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn })

      return {
        success: true,
        downloadUrl: presignedUrl,
        key,
      }
    } catch (error) {
      console.error("Error generating presigned download URL:", error)
      throw new Error("Failed to generate download URL")
    }
  },

  /**
   * Check if a file exists in S3
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
        Key: key,
      })

      await s3Client.send(command)
      return true
    } catch (error: any) {
      if (error.name === "NoSuchKey") {
        return false
      }
      console.error("Error checking file existence:", error)
      throw new Error("Failed to check file existence")
    }
  },
}
