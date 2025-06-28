import { z } from "zod"

// Story validation schemas
export const createStorySchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters").trim(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters")
    .trim(),
  location: z.string().min(1, "Location is required").max(100, "Location must be less than 100 characters").trim(),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  tags: z.array(z.string().trim().min(1).max(50)).max(10, "Maximum 10 tags allowed").optional().default([]),
})

export const updateStorySchema = createStorySchema.partial()

// User validation schemas
export const createUserSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").trim(),
  avatar: z.string().url("Invalid avatar URL").optional(),
})

// Sanitization functions
export function sanitizeHtml(input: string): string {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

export function validateImageUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url)
    const allowedDomains = [
      "images.unsplash.com",
      "images.pexels.com",
      "cdn.pixabay.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
    ]

    return allowedDomains.some((domain) => parsedUrl.hostname.includes(domain))
  } catch {
    return false
  }
}

export type CreateStoryInput = z.infer<typeof createStorySchema>
export type UpdateStoryInput = z.infer<typeof updateStorySchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
