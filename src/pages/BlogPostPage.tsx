"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Calendar, Clock, ArrowLeft, Share2, Heart, MessageCircle } from 'lucide-react'

// Mock data for travel blog post
const blogPost = {
  id: "1",
  title: "Hidden Gems of Southeast Asia: 10 Destinations You've Never Heard Of",
  content: `
    <p>Southeast Asia is a treasure trove of incredible destinations, but beyond the well-known hotspots like Bangkok, Bali, and Singapore, there are countless hidden gems waiting to be discovered. In this comprehensive guide, we'll explore 10 breathtaking locations that will give you authentic experiences away from the crowds.</p>
    
    <h2>1. Koh Rong Sanloem, Cambodia</h2>
    <p>This pristine island off the coast of Cambodia offers crystal-clear waters, powdery white sand beaches, and some of the most spectacular sunsets you'll ever witness. Unlike its busier neighbor Koh Rong, Sanloem maintains a peaceful, laid-back atmosphere perfect for digital detox.</p>
    
    <h2>2. Sapa Valley, Vietnam</h2>
    <p>Nestled in the mountains of northern Vietnam, Sapa Valley is home to terraced rice fields that cascade down mountainsides like giant green staircases. The area is inhabited by various ethnic minorities, offering visitors a glimpse into traditional Vietnamese highland culture.</p>
    
    <h2>3. Nusa Penida, Indonesia</h2>
    <p>While Bali gets all the attention, its smaller neighbor Nusa Penida offers dramatic cliff formations, hidden beaches, and incredible snorkeling opportunities. The island's rugged landscape and crystal-clear waters make it a paradise for adventure seekers.</p>
    
    <h2>Planning Your Adventure</h2>
    <p>When visiting these hidden gems, remember to travel responsibly. Respect local customs, support local businesses, and leave no trace. These destinations are special precisely because they've remained relatively untouched – let's keep them that way for future travelers to enjoy.</p>
  `,
  author: {
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Travel writer and photographer with 10+ years exploring Southeast Asia. Passionate about sustainable tourism and cultural immersion.",
  },
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Adventure",
  tags: ["Southeast Asia", "Hidden Gems", "Adventure", "Island Hopping"],
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
  likes: 127,
  comments: 23,
}

export default function BlogPostPage() {
  const { id } = useParams()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate day/night transition based on scroll
  const maxScroll = 2000
  const dayNightProgress = Math.min(scrollY / maxScroll, 1)

  // Sky colors transition from day to night
  const skyColor = {
    day: "from-blue-400 via-blue-300 to-orange-200",
    sunset: "from-purple-600 via-orange-400 to-yellow-300",
    night: "from-gray-900 via-blue-900 to-purple-900",
  }

  const getCurrentSkyColor = () => {
    if (dayNightProgress < 0.3) return skyColor.day
    if (dayNightProgress < 0.7) return skyColor.sunset
    return skyColor.night
  }

  // Sun and Moon positioning
  const sunArcProgress = Math.min(dayNightProgress * 1.5, 1)
  const sunPosition = {
    x: 50,
    y: 25 + sunArcProgress * 60,
    opacity: Math.max(0, 1 - (sunArcProgress - 0.7) * 3.33),
  }

  const moonArcProgress = Math.max(0, Math.min((dayNightProgress - 0.3) * 1.43, 1))
  const moonPosition = {
    x: 50,
    y: 85 - moonArcProgress * 60,
    opacity: Math.max(0, Math.min(moonArcProgress * 2, 1 - (moonArcProgress - 0.8) * 5)),
  }

  return (
    <div className="min-h-screen relative">
      {/* Fixed Parallax Mountain Background */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic Sky Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getCurrentSkyColor()} transition-all duration-1000`}
        ></div>

        {/* Clouds */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {/* Left Cloud */}
          <div
            className="absolute top-20 opacity-30 transition-opacity duration-1000"
            style={{
              left: `${10 + ((scrollY * 0.02) % 30)}%`,
              opacity: dayNightProgress < 0.8 ? 0.3 : 0.1,
            }}
          >
            <svg width="240" height="80" viewBox="0 0 240 80" className="fill-white">
              <ellipse cx="50" cy="50" rx="50" ry="30" />
              <ellipse cx="90" cy="40" rx="60" ry="36" />
              <ellipse cx="150" cy="50" rx="50" ry="30" />
              <ellipse cx="190" cy="44" rx="40" ry="24" />
            </svg>
          </div>

          {/* Right Cloud */}
          <div
            className="absolute top-32 opacity-25 transition-opacity duration-1000"
            style={{
              left: `${60 + ((scrollY * 0.015) % 30)}%`,
              opacity: dayNightProgress < 0.8 ? 0.25 : 0.08,
            }}
          >
            <svg width="200" height="70" viewBox="0 0 200 70" className="fill-white">
              <ellipse cx="40" cy="40" rx="40" ry="24" />
              <ellipse cx="80" cy="36" rx="50" ry="30" />
              <ellipse cx="130" cy="44" rx="44" ry="26" />
              <ellipse cx="160" cy="38" rx="36" ry="22" />
            </svg>
          </div>
        </div>

        {/* Flying Birds */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div
            className="absolute transition-all duration-1000"
            style={{
              left: `${10 + ((scrollY * 0.03) % 100)}%`,
              top: `${30 + Math.sin(scrollY * 0.01) * 5}%`,
              opacity: dayNightProgress < 0.9 ? 0.6 : 0.3,
            }}
          >
            <svg
              width="80"
              height="30"
              viewBox="0 0 80 30"
              className="fill-none stroke-current text-gray-800"
              strokeWidth="2"
            >
              <path d="M10,20 L15,15 M15,15 L20,18 M20,18 L25,13 M25,13 L30,16" />
              <path d="M30,16 L35,13 M35,13 L40,18 M40,18 L45,15 M45,15 L50,20" />
            </svg>
          </div>
        </div>

        {/* Stars */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: Math.max(0, dayNightProgress - 0.5) * 2 }}
        >
          <div className="absolute top-32 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-52 left-1/4 w-0.5 h-0.5 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Sun */}
        <div
          className="absolute transition-all duration-500"
          style={{
            left: `${sunPosition.x}%`,
            top: `${sunPosition.y}%`,
            opacity: sunPosition.opacity,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: "400px",
              height: "400px",
              background: `radial-gradient(circle, rgba(255, 255, 0, ${sunPosition.opacity * 0.1}) 0%, rgba(255, 200, 0, ${sunPosition.opacity * 0.05}) 30%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          ></div>
          <div
            className="relative w-40 h-40 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg"
            style={{
              boxShadow: `0 0 40px rgba(255, 255, 0, ${sunPosition.opacity * 0.8}), 0 0 80px rgba(255, 200, 0, ${sunPosition.opacity * 0.4})`,
            }}
          >
            <div className="absolute top-4 left-6 w-4 h-4 bg-yellow-200 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-4 w-3 h-3 bg-orange-300 rounded-full opacity-40"></div>
            <div className="absolute bottom-6 left-8 w-2 h-2 bg-yellow-100 rounded-full opacity-80"></div>
          </div>
        </div>

        {/* Moon */}
        <div
          className="absolute transition-all duration-500"
          style={{
            left: `${moonPosition.x}%`,
            top: `${moonPosition.y}%`,
            opacity: moonPosition.opacity,
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: "300px",
              height: "300px",
              background: `radial-gradient(circle, rgba(200, 200, 255, ${moonPosition.opacity * 0.08}) 0%, rgba(150, 150, 255, ${moonPosition.opacity * 0.04}) 40%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          ></div>
          <div
            className="relative w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-lg"
            style={{
              boxShadow: `0 0 30px rgba(200, 200, 255, ${moonPosition.opacity * 0.6}), 0 0 60px rgba(150, 150, 255, ${moonPosition.opacity * 0.3})`,
            }}
          >
            <div className="absolute top-4 left-4 w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-4 w-4 h-4 bg-gray-400 rounded-full opacity-40"></div>
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-gray-400 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Parallax Mountain Layers */}
        <div className="absolute inset-0">
          {/* Back Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-60"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="backMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(34, 68, 34, 0.8)" : "rgba(74, 144, 74, 0.8)"}
                  />
                  <stop
                    offset="100%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(20, 40, 20, 0.6)" : "rgba(50, 120, 50, 0.6)"}
                  />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,250 150,200 300,280 450,180 600,150 750,220 900,180 1050,200 1200,240 1200,600"
                fill="url(#backMountain)"
              />
            </svg>
          </div>

          {/* Middle Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-70"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="midMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(44, 78, 44, 0.9)" : "rgba(84, 154, 84, 0.9)"}
                  />
                  <stop
                    offset="100%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(30, 50, 30, 0.7)" : "rgba(60, 130, 60, 0.7)"}
                  />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,380 120,350 250,300 380,340 520,280 650,320 780,260 920,300 1080,280 1200,300 1200,600"
                fill="url(#midMountain)"
              />
            </svg>
          </div>

          {/* Front Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-80"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="frontMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(54, 88, 54, 1)" : "rgba(94, 164, 94, 1)"}
                  />
                  <stop
                    offset="100%"
                    stopColor={dayNightProgress > 0.7 ? "rgba(40, 60, 40, 0.8)" : "rgba(70, 140, 70, 0.8)"}
                  />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,480 80,450 200,420 320,460 450,400 580,440 720,380 850,420 980,390 1120,410 1200,420 1200,600"
                fill="url(#frontMountain)"
              />
            </svg>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {/* Fireflies at night */}
          <div
            className="absolute top-40 left-10 w-2 h-2 rounded-full animate-float transition-all duration-1000"
            style={{
              backgroundColor: dayNightProgress > 0.5 ? "rgba(255, 255, 100, 0.8)" : "rgba(255, 255, 255, 0.2)",
              boxShadow: dayNightProgress > 0.5 ? "0 0 10px rgba(255, 255, 100, 0.5)" : "none",
            }}
          ></div>
          <div
            className="absolute top-60 right-20 w-3 h-3 rounded-full animate-float-delayed transition-all duration-1000"
            style={{
              backgroundColor: dayNightProgress > 0.5 ? "rgba(255, 255, 100, 0.6)" : "rgba(255, 255, 255, 0.15)",
              boxShadow: dayNightProgress > 0.5 ? "0 0 8px rgba(255, 255, 100, 0.4)" : "none",
            }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center text-white hover:text-white/80 mb-8 transition-colors duration-300 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-2xl border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Stories
          </Link>

          {/* Article Header */}
          <article className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 overflow-hidden mb-8">
            <div className="p-8 lg:p-12">
              <span className="inline-block mb-6 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                {blogPost.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">{blogPost.title}</h1>

              {/* Author and Meta Info */}
              <div className="flex items-center justify-between flex-wrap gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={blogPost.author.avatar || "/placeholder.svg"}
                    alt={blogPost.author.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{blogPost.author.name}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(blogPost.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {blogPost.readTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors duration-300">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                  <button className="flex items-center px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl transition-colors duration-300">
                    <Heart className="w-4 h-4 mr-2" />
                    {blogPost.likes}
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              <img
                src={blogPost.image || "/placeholder.svg"}
                alt={blogPost.title}
                className="w-full h-64 lg:h-96 object-cover rounded-2xl mb-8 shadow-lg"
              />

              {/* Article Content */}
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }} />

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-gray-200">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-medium transition-colors duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Author Bio */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8 mb-8">
            <div className="flex items-start space-x-6">
              <img
                src={blogPost.author.avatar || "/placeholder.svg"}
                alt={blogPost.author.name}
                className="w-20 h-20 rounded-full object-cover shadow-lg"
              />
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">About {blogPost.author.name}</h3>
                <p className="text-gray-600 leading-relaxed">{blogPost.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
            <div className="flex items-center mb-8">
              <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Comments ({blogPost.comments})</h3>
            </div>

            <div className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-white/10">
              <p className="text-gray-600 mb-6 text-lg">
                Share your travel experiences and connect with fellow adventurers!
              </p>
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
