import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand, GetCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"
import type { CreateUserData, UserProfile } from "@/types/story"
import { config } from "./config"

// Create DynamoDB client using IAM roles (no explicit credentials)
const client = new DynamoDBClient({
  region: config.aws.region,
  // Remove explicit credentials - the SDK will automatically use:
  // 1. IAM roles when running on ECS
  // 2. Environment variables in development
  // 3. AWS credentials file locally
})

export const dynamodb = DynamoDBDocumentClient.from(client)

// User operations
export const userOperations = {
  async createUser(userData: CreateUserData) {
    try {
      const command = new PutCommand({
        TableName: config.dynamodb.userTable,
        Item: {
          UserId: userData.userId,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar,
          createdAt: userData.createdAt,
          updatedAt: userData.createdAt,
        },
      })
      return await dynamodb.send(command)
    } catch (error) {
      console.error("Error creating user:", error)
      throw new Error("Failed to create user")
    }
  },

  async getUser(userId: string): Promise<UserProfile | undefined> {
    try {
      const command = new GetCommand({
        TableName: config.dynamodb.userTable,
        Key: { UserId: userId },
      })
      const result = await dynamodb.send(command)

      if (!result.Item) return undefined

      return {
        userId: result.Item.UserId,
        email: result.Item.email,
        name: result.Item.name,
        avatar: result.Item.avatar,
        createdAt: result.Item.createdAt,
        updatedAt: result.Item.updatedAt,
      } as UserProfile
    } catch (error) {
      console.error("Error getting user:", error)
      throw new Error("Failed to get user")
    }
  },

  async updateUser(userId: string, updates: Partial<UserProfile>) {
    try {
      const updateExpression = Object.keys(updates)
        .map((key, index) => `#${key} = :val${index}`)
        .join(", ")

      const expressionAttributeNames = Object.keys(updates).reduce(
        (acc, key) => {
          acc[`#${key}`] = key
          return acc
        },
        {} as Record<string, string>,
      )

      const expressionAttributeValues = Object.keys(updates).reduce(
        (acc, key, index) => {
          acc[`:val${index}`] = updates[key as keyof UserProfile]
          return acc
        },
        {} as Record<string, any>,
      )

      const command = new UpdateCommand({
        TableName: config.dynamodb.userTable,
        Key: { UserId: userId },
        UpdateExpression: `SET ${updateExpression}, updatedAt = :updatedAt`,
        ExpressionAttributeNames: {
          ...expressionAttributeNames,
          "#updatedAt": "updatedAt",
        },
        ExpressionAttributeValues: {
          ...expressionAttributeValues,
          ":updatedAt": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      })

      const result = await dynamodb.send(command)
      return result.Attributes as UserProfile
    } catch (error) {
      console.error("Error updating user:", error)
      throw new Error("Failed to update user")
    }
  },
}

// Post operations
export const postOperations = {
  async createPost(postData: {
    postId: string
    userId: string
    title: string
    content: string
    location: string
    imageUrl?: string
    tags: string[]
    likes: number
    likedBy: string[]
    createdAt: string
    updatedAt: string
  }) {
    try {
      const command = new PutCommand({
        TableName: config.dynamodb.postTable,
        Item: {
          PostId: postData.postId,
          userId: postData.userId,
          title: postData.title,
          content: postData.content,
          location: postData.location,
          imageUrl: postData.imageUrl,
          tags: postData.tags,
          likes: postData.likes,
          likedBy: postData.likedBy,
          createdAt: postData.createdAt,
          updatedAt: postData.updatedAt,
        },
      })
      return await dynamodb.send(command)
    } catch (error) {
      console.error("Error creating post:", error)
      throw new Error("Failed to create post")
    }
  },

  async getPost(postId: string) {
    try {
      const command = new GetCommand({
        TableName: config.dynamodb.postTable,
        Key: { PostId: postId },
      })
      const result = await dynamodb.send(command)

      if (!result.Item) return null

      return {
        postId: result.Item.PostId,
        userId: result.Item.userId,
        title: result.Item.title,
        content: result.Item.content,
        location: result.Item.location,
        imageUrl: result.Item.imageUrl,
        tags: result.Item.tags || [],
        likes: result.Item.likes || 0,
        likedBy: result.Item.likedBy || [],
        createdAt: result.Item.createdAt,
        updatedAt: result.Item.updatedAt,
      }
    } catch (error) {
      console.error("Error getting post:", error)
      throw new Error("Failed to get post")
    }
  },

  async getAllPosts() {
    try {
      const command = new ScanCommand({
        TableName: config.dynamodb.postTable,
      })
      const result = await dynamodb.send(command)

      return (result.Items || []).map((item) => ({
        postId: item.PostId,
        userId: item.userId,
        title: item.title,
        content: item.content,
        location: item.location,
        imageUrl: item.imageUrl,
        tags: item.tags || [],
        likes: item.likes || 0,
        likedBy: item.likedBy || [],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    } catch (error) {
      console.error("Error getting all posts:", error)
      throw new Error("Failed to get posts")
    }
  },

  async getPostsByUser(userId: string) {
    try {
      const command = new ScanCommand({
        TableName: config.dynamodb.postTable,
        FilterExpression: "userId = :userId",
        ExpressionAttributeValues: {
          ":userId": userId,
        },
      })
      const result = await dynamodb.send(command)

      return (result.Items || []).map((item) => ({
        postId: item.PostId,
        userId: item.userId,
        title: item.title,
        content: item.content,
        location: item.location,
        imageUrl: item.imageUrl,
        tags: item.tags || [],
        likes: item.likes || 0,
        likedBy: item.likedBy || [],
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    } catch (error) {
      console.error("Error getting posts by user:", error)
      throw new Error("Failed to get user posts")
    }
  },

  async updatePost(postId: string, updates: Record<string, any>) {
    try {
      const updateExpression = Object.keys(updates)
        .map((key, index) => `#${key} = :val${index}`)
        .join(", ")

      const expressionAttributeNames = Object.keys(updates).reduce(
        (acc, key) => {
          acc[`#${key}`] = key
          return acc
        },
        {} as Record<string, string>,
      )

      const expressionAttributeValues = Object.keys(updates).reduce(
        (acc, key, index) => {
          acc[`:val${index}`] = updates[key]
          return acc
        },
        {} as Record<string, any>,
      )

      const command = new UpdateCommand({
        TableName: config.dynamodb.postTable,
        Key: { PostId: postId },
        UpdateExpression: `SET ${updateExpression}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
      })

      const result = await dynamodb.send(command)

      if (!result.Attributes) return null

      return {
        postId: result.Attributes.PostId,
        userId: result.Attributes.userId,
        title: result.Attributes.title,
        content: result.Attributes.content,
        location: result.Attributes.location,
        imageUrl: result.Attributes.imageUrl,
        tags: result.Attributes.tags || [],
        likes: result.Attributes.likes || 0,
        likedBy: result.Attributes.likedBy || [],
        createdAt: result.Attributes.createdAt,
        updatedAt: result.Attributes.updatedAt,
      }
    } catch (error) {
      console.error("Error updating post:", error)
      throw new Error("Failed to update post")
    }
  },

  async toggleLike(postId: string, userId: string) {
    try {
      const post = await this.getPost(postId)
      if (!post) return null

      const likedBy = post.likedBy || []
      const isLiked = likedBy.includes(userId)

      const updatedLikedBy = isLiked ? likedBy.filter((id: string) => id !== userId) : [...likedBy, userId]

      const updatedLikes = Math.max(0, updatedLikedBy.length)

      return await this.updatePost(postId, {
        likedBy: updatedLikedBy,
        likes: updatedLikes,
        updatedAt: new Date().toISOString(),
      })
    } catch (error) {
      console.error("Error toggling like:", error)
      throw new Error("Failed to toggle like")
    }
  },
}
