"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { TravelStory, StoryStats } from "@/types/story"
import { useAuth } from "@/context/auth-context"
import { Heart, MapPin, Calendar, Tag, TrendingUp, BookOpen, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OptimizedImage } from "@/components/ui/image"
import Link from "next/link"
import ApiErrorPage from "@/components/error/api-error-page"
import { ApiErrorHandler } from "@/lib/api-error-handler"
import { formatTimeAgo } from "@/lib/utils"

export default function TravelStoriesOverview() {
  const [stories, setStories] = useState<TravelStory[]>([])
  const [stats, setStats] = useState<StoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const [likingStories, setLikingStories] = useState<Set<string>>(new Set())
  const { user } = useAuth()

  const initializeData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      await Promise.all([fetchStories(), fetchStats()])
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    initializeData()
  }, [initializeData])

  const fetchStories = async () => {
    try {
      console.log("🔄 Fetching stories from API...")
      const data = await ApiErrorHandler.handleApiCall<TravelStory[]>(() => fetch("/api/stories"), "/api/stories")

      if (Array.isArray(data)) {
        setStories(data)
        console.log(`📊 Loaded ${data.length} stories successfully`)
      } else {
        console.warn("Invalid data format received:", data)
        throw new Error("Invalid data format: expected array of stories")
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error)
      setStories([])
      throw error
    }
  }

  const fetchStats = async () => {
    try {
      console.log("📈 Fetching stats from API...")
      const data = await ApiErrorHandler.handleApiCall<StoryStats>(
        () => fetch("/api/stories/stats"),
        "/api/stories/stats",
      )

      setStats(data)
      console.log("📈 Stats loaded successfully:", data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
      setStats(null)
    }
  }

  const handleLike = async (storyId: string) => {
    if (!user || likingStories.has(storyId)) return

    setLikingStories((prev) => new Set(prev).add(storyId))

    try {
      const updatedStory = await ApiErrorHandler.handleApiCall<TravelStory>(
        () =>
          fetch(`/api/stories/${storyId}/like`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }),
        `/api/stories/${storyId}/like`,
      )

      setStories((prev) =>
        prev.map((story) =>
          story.postId === storyId
            ? {
                ...story,
                likes: updatedStory.likes,
                likedBy: updatedStory.likedBy,
                updatedAt: updatedStory.updatedAt,
              }
            : story,
        ),
      )

      fetchStats()
      console.log(`❤️ Story ${storyId} liked successfully`)
    } catch (error) {
      console.error("Failed to like story:", error)
    } finally {
      setLikingStories((prev) => {
        const newSet = new Set(prev)
        newSet.delete(storyId)
        return newSet
      })
    }
  }

  const handleRetry = () => {
    console.log("🔄 Retrying data fetch...")
    initializeData()
  }

  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [stories])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading amazing stories...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <ApiErrorPage error={error} onRetry={handleRetry} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Travel Stories</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover amazing adventures from travelers around the world
            </p>

            {user && (
              <Link href="/create-story">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-3 rounded-lg">
                  Share Your Story
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.totalStories}</div>
                <div className="text-gray-600">Stories Shared</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.totalLikes}</div>
                <div className="text-gray-600">Total Likes</div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stats.popularTags?.length || 0}</div>
                <div className="text-gray-600">Popular Tags</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!Array.isArray(sortedStories) || sortedStories.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share your travel adventure!</p>
            {user && (
              <Link href="/create-story">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Create First Story</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedStories.map((story) => (
              <div
                key={story.postId}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden card-hover shadow-sm"
              >
                {/* Story Image */}
                {story.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={story.imageUrl}
                      alt={story.title}
                      width={400}
                      height={192}
                      className="w-full h-full object-cover image-hover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center mb-4">
                    {story.author?.avatar ? (
                      <OptimizedImage
                        src={story.author.avatar}
                        alt={story.author.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full border-2 border-blue-500 mr-3"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-blue-500 mr-3 flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{story.author?.name || "Anonymous"}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatTimeAgo(story.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Story Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{story.title}</h3>

                  {/* Location */}
                  <div className="flex items-center text-blue-500 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{story.location}</span>
                  </div>

                  {/* Story Content */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{story.content}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array.isArray(story.tags) &&
                      story.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700 border border-gray-200"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    {Array.isArray(story.tags) && story.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{story.tags.length - 3} more</span>
                    )}
                  </div>

                  {/* Like Button */}
                  <div className="flex items-center justify-between">
                    <Button
                      onClick={() => handleLike(story.postId)}
                      variant="ghost"
                      size="sm"
                      className={`flex items-center space-x-2 ${
                        user && Array.isArray(story.likedBy) && story.likedBy.includes(user.id)
                          ? "text-red-500 hover:text-red-600"
                          : "text-gray-500 hover:text-red-500"
                      }`}
                      disabled={!user || likingStories.has(story.postId)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          user && Array.isArray(story.likedBy) && story.likedBy.includes(user.id) ? "fill-current" : ""
                        } ${likingStories.has(story.postId) ? "animate-pulse" : ""}`}
                      />
                      <span>{story.likes || 0}</span>
                    </Button>

                    <div className="text-xs text-gray-500">{story.content?.length || 0} characters</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popular Tags Section */}
      {stats && stats.popularTags && Array.isArray(stats.popularTags) && stats.popularTags.length > 0 && (
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Destinations & Themes</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.popularTags.map((tagData) => (
                <div
                  key={tagData.tag}
                  className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center space-x-2 shadow-sm"
                >
                  <Tag className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-900 font-medium">{tagData.tag}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{tagData.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
