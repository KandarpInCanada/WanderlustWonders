"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Camera, Tag, Send, ArrowLeft, ImageIcon, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CreateStoryPage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
    imageUrl: "",
    tags: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-md shadow-lg">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="h-8 w-8 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">You need to sign in to share your travel stories.</p>
          <Link href="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      })

      if (response.ok) {
        router.push("/")
      } else {
        throw new Error("Failed to create story")
      }
    } catch (error) {
      console.error("Error creating story:", error)
      alert("Failed to create story. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 mr-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Share Your Adventure</h1>
                <p className="text-gray-600 text-sm mt-1">Tell the world about your amazing travel experience</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Create Story</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Story Title */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Story Title</label>
                <p className="text-xs text-gray-500">Give your adventure a memorable name</p>
              </div>
            </div>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="My incredible journey to..."
              required
              className="text-lg font-medium border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Location</label>
                <p className="text-xs text-gray-500">Where did this adventure take place?</p>
              </div>
            </div>
            <Input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Paris, France"
              required
              className="border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          {/* Story Content */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Send className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Your Story</label>
                <p className="text-xs text-gray-500">Share your experience and what made it special</p>
              </div>
            </div>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="It all started when I decided to explore the hidden streets of Montmartre. The morning light was perfect, and I stumbled upon this incredible little café..."
              required
              rows={8}
              className="border-gray-200 focus:border-purple-500 focus:ring-purple-500 resize-none"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="text-xs text-gray-500">{formData.content.length} characters</div>
              <div className="text-xs text-gray-400">Minimum 10 characters</div>
            </div>
          </div>

          {/* Image URL */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <Camera className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Photo</label>
                <p className="text-xs text-gray-500">Add a photo URL to make your story more engaging (optional)</p>
              </div>
            </div>
            <Input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/your-amazing-photo.jpg"
              className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
            {formData.imageUrl && (
              <div className="mt-4">
                <div className="relative">
                  <img
                    src={formData.imageUrl || "/placeholder.svg"}
                    alt="Story preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                      const errorDiv = e.currentTarget.nextElementSibling as HTMLElement
                      if (errorDiv) errorDiv.style.display = "flex"
                    }}
                  />
                  <div className="hidden w-full h-48 bg-gray-100 rounded-lg border border-gray-200 items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Invalid image URL</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3">
                <Tag className="h-4 w-4 text-pink-600" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900">Tags</label>
                <p className="text-xs text-gray-500">Help others discover your story (separate with commas)</p>
              </div>
            </div>
            <Input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="adventure, photography, culture, food, mountains"
              className="border-gray-200 focus:border-pink-500 focus:ring-pink-500"
            />
            {formData.tags && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter((tag) => tag)
                  .slice(0, 5)
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-pink-50 text-pink-700 border border-pink-200"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">Ready to share your adventure with the world?</div>
              <Button
                type="submit"
                disabled={isSubmitting || !formData.title || !formData.content || !formData.location}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-base font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Publish Story
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
