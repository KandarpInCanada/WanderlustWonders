import type { TravelStory } from "@/types/story"

// In-memory storage
const users: Map<string, any> = new Map()
const posts: Map<string, TravelStory> = new Map()

// Initialize with sample data
const initializeSampleData = () => {
  // Sample users
  const sampleUsers = [
    {
      userId: "user_1",
      email: "alice@example.com",
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=150&width=150",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
    },
    {
      userId: "user_2",
      email: "bob@example.com",
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=150&width=150",
      createdAt: "2024-01-10T08:30:00Z",
      updatedAt: "2024-01-10T08:30:00Z",
    },
    {
      userId: "user_3",
      email: "charlie@example.com",
      name: "Charlie Brown",
      avatar: "/placeholder.svg?height=150&width=150",
      createdAt: "2024-01-05T14:20:00Z",
      updatedAt: "2024-01-05T14:20:00Z",
    },
  ]

  // Sample stories with placeholder images
  const sampleStories: TravelStory[] = [
    {
      postId: "post_1",
      userId: "user_1",
      title: "Mountain Escape in the Rockies",
      content:
        "Hiking through the Rocky Mountains reminded me how small we really are in this vast world. The crisp mountain air, the stunning vistas, and the peaceful silence created an unforgettable experience. Every step on the trail brought new discoveries - from hidden waterfalls to wildlife encounters. This journey taught me the importance of disconnecting from technology and reconnecting with nature.",
      location: "Rocky Mountains, Colorado, USA",
      imageUrl: "/placeholder.svg?height=600&width=800",
      tags: ["mountains", "hiking", "nature", "adventure", "colorado"],
      likes: 24,
      likedBy: ["user_2", "user_3"],
      createdAt: "2024-06-25T10:30:00Z",
      updatedAt: "2024-06-25T10:30:00Z",
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=150&width=150",
      },
    },
    {
      postId: "post_2",
      userId: "user_2",
      title: "Hiking the Swiss Alps",
      content:
        "Nothing beats the fresh alpine air and stunning mountain views of Switzerland. The trail from Zermatt to the Matterhorn base camp was challenging but incredibly rewarding. Meeting fellow hikers from around the world and sharing stories around mountain huts created lasting memories. The Swiss hospitality and the precision of their mountain infrastructure made this adventure both safe and spectacular.",
      location: "Zermatt, Switzerland",
      imageUrl: "/placeholder.svg?height=600&width=800",
      tags: ["switzerland", "alps", "hiking", "matterhorn", "adventure"],
      likes: 18,
      likedBy: ["user_1"],
      createdAt: "2024-06-22T09:00:00Z",
      updatedAt: "2024-06-22T09:00:00Z",
      author: {
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=150&width=150",
      },
    },
    {
      postId: "post_3",
      userId: "user_3",
      title: "Markets of Marrakech",
      content:
        "Exploring the spice-scented souks of Marrakech was an unforgettable sensory journey. The vibrant colors, exotic aromas, and bustling energy of the medina created an atmosphere unlike anywhere else. Bargaining with local merchants, trying traditional mint tea, and discovering hidden riads made every moment an adventure. The warmth and hospitality of the Moroccan people made this trip truly special.",
      location: "Marrakech, Morocco",
      imageUrl: "/placeholder.svg?height=600&width=800",
      tags: ["morocco", "culture", "markets", "food", "adventure"],
      likes: 31,
      likedBy: ["user_1", "user_2"],
      createdAt: "2024-06-19T12:30:00Z",
      updatedAt: "2024-06-19T12:30:00Z",
      author: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=150&width=150",
      },
    },
    {
      postId: "post_4",
      userId: "user_1",
      title: "Northern Lights in Iceland",
      content:
        "Witnessing the Aurora Borealis dance across the Icelandic sky was a magical experience that words cannot fully capture. The ethereal green lights painting the darkness while standing in the middle of nowhere, surrounded by volcanic landscapes and geysers, felt like being on another planet. The Blue Lagoon's geothermal waters provided the perfect way to warm up after hours of aurora hunting.",
      location: "Reykjavik, Iceland",
      imageUrl: "/placeholder.svg?height=600&width=800",
      tags: ["iceland", "aurora", "nature", "photography", "winter"],
      likes: 42,
      likedBy: ["user_2", "user_3"],
      createdAt: "2024-06-15T20:45:00Z",
      updatedAt: "2024-06-15T20:45:00Z",
      author: {
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=150&width=150",
      },
    },
    {
      postId: "post_5",
      userId: "user_2",
      title: "Temple Hopping in Kyoto",
      content:
        "The ancient temples and serene gardens of Kyoto offered a peaceful escape from modern life. Walking through the bamboo groves of Arashiyama and exploring the golden Kinkaku-ji temple felt like stepping back in time. The traditional tea ceremonies and encounters with geishas in the Gion district provided authentic glimpses into Japanese culture that have stayed with me long after returning home.",
      location: "Kyoto, Japan",
      imageUrl: "/placeholder.svg?height=600&width=800",
      tags: ["japan", "temples", "culture", "zen", "tradition"],
      likes: 27,
      likedBy: ["user_3"],
      createdAt: "2024-06-12T14:15:00Z",
      updatedAt: "2024-06-12T14:15:00Z",
      author: {
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=150&width=150",
      },
    },
  ]

  // Initialize storage
  sampleUsers.forEach((user) => users.set(user.userId, user))
  sampleStories.forEach((story) => posts.set(story.postId, story))
}

// Initialize sample data on module load
initializeSampleData()

// User operations
export const userOperations = {
  async createUser(userData: any): Promise<void> {
    users.set(userData.userId, userData)
  },

  async getUser(userId: string): Promise<any | undefined> {
    return users.get(userId)
  },

  async updateUser(userId: string, updates: any): Promise<any | undefined> {
    const existingUser = users.get(userId)
    if (!existingUser) return undefined

    const updatedUser = {
      ...existingUser,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    users.set(userId, updatedUser)
    return updatedUser
  },
}

// Post operations
export const postOperations = {
  async createPost(postData: any): Promise<void> {
    const user = users.get(postData.userId)
    const story: TravelStory = {
      ...postData,
      author: user
        ? {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
          }
        : undefined,
    }
    posts.set(postData.postId, story)
  },

  async getPost(postId: string): Promise<TravelStory | null> {
    return posts.get(postId) || null
  },

  async getAllPosts(): Promise<TravelStory[]> {
    return Array.from(posts.values())
  },

  async getPostsByUser(userId: string): Promise<TravelStory[]> {
    return Array.from(posts.values()).filter((post) => post.userId === userId)
  },

  async updatePost(postId: string, updates: Record<string, any>): Promise<TravelStory | null> {
    const existingPost = posts.get(postId)
    if (!existingPost) return null

    const updatedPost: TravelStory = {
      ...existingPost,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    posts.set(postId, updatedPost)
    return updatedPost
  },

  async toggleLike(postId: string, userId: string): Promise<TravelStory | null> {
    const post = posts.get(postId)
    if (!post) return null

    const likedBy = post.likedBy || []
    const isLiked = likedBy.includes(userId)

    const updatedLikedBy = isLiked ? likedBy.filter((id: string) => id !== userId) : [...likedBy, userId]

    const updatedLikes = Math.max(0, updatedLikedBy.length)

    return await this.updatePost(postId, {
      likedBy: updatedLikedBy,
      likes: updatedLikes,
    })
  },
}
