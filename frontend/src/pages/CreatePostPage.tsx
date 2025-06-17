"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

const categories = ["Adventure", "Solo Travel", "Budget Travel", "Destinations", "Digital Nomad", "Sustainable Travel"]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ title, excerpt, content, category, image })
    alert("Travel story published successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-6 transition-colors duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Stories
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Share Your Adventure</h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="title" className="block text-lg font-bold text-gray-900 mb-3">
                Story Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your travel story title"
                required
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-lg font-bold text-gray-900 mb-3">
                Story Summary *
              </label>
              <textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your travel experience"
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-lg font-bold text-gray-900 mb-3">
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="image" className="block text-lg font-bold text-gray-900 mb-3">
                Featured Photo URL
              </label>
              <input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/your-travel-photo.jpg"
                className="w-full px-4 py-4 text-lg border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-lg font-bold text-gray-900 mb-3">
                Your Travel Story *
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your travel experience, tips, and insights..."
                required
                className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none"
                rows={15}
              />
            </div>

            <div className="flex gap-4 pt-8 border-t border-gray-200">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold"
              >
                Publish Story
              </button>
              <button
                type="button"
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl transition-all duration-300 font-semibold"
              >
                Save as Draft
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
