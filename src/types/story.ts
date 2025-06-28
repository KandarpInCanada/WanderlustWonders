export interface TravelStory {
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
  author?: {
    name: string
    email: string
    avatar?: string
  }
}

export interface CreateStoryRequest {
  title: string
  content: string
  location: string
  imageUrl?: string
  tags: string[]
}

export interface StoryStats {
  totalStories: number
  totalLikes: number
  popularTags: { tag: string; count: number }[]
}

export interface UserProfile {
  userId: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  updatedAt?: string
}

export interface CreateUserData {
  userId: string
  email: string
  name: string
  avatar?: string
  createdAt: string
}
