"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Search, TrendingUp, Users, Globe, ArrowRight } from "lucide-react"

// Mock data for travel blog
const featuredPost = {
  id: "1",
  title: "Hidden Gems of Southeast Asia: 10 Destinations You've Never Heard Of",
  excerpt:
    "Discover breathtaking locations off the beaten path in Southeast Asia. From secret beaches to mountain villages, these hidden gems will transform your travel experience.",
  author: {
    name: "Emma Rodriguez",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    bio: "Travel Writer & Adventure Seeker",
  },
  publishedAt: "2024-01-15",
  readTime: "8 min read",
  category: "Adventure",
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
}

const blogPosts = [
  {
    id: "2",
    title: "Solo Female Travel: Safety Tips for Your First Adventure",
    excerpt:
      "Essential safety tips and confidence-building advice for women embarking on their first solo travel adventure.",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    publishedAt: "2024-01-12",
    readTime: "6 min read",
    category: "Solo Travel",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Budget Backpacking Through Europe: $50 a Day Guide",
    excerpt:
      "How to explore Europe's most beautiful cities without breaking the bank. Complete budget breakdown included.",
    author: {
      name: "Jake Thompson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    publishedAt: "2024-01-10",
    readTime: "5 min read",
    category: "Budget Travel",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "The Ultimate Japan Itinerary: 2 Weeks of Culture and Cuisine",
    excerpt:
      "From Tokyo's neon lights to Kyoto's ancient temples, discover the perfect balance of modern and traditional Japan.",
    author: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    publishedAt: "2024-01-08",
    readTime: "7 min read",
    category: "Destinations",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Digital Nomad Paradise: Best Co-working Spaces in Bali",
    excerpt:
      "Work remotely from paradise with our guide to Bali's best co-working spaces and digital nomad communities.",
    author: {
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
    publishedAt: "2024-01-05",
    readTime: "4 min read",
    category: "Digital Nomad",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Sustainable Travel: How to Explore Responsibly",
    excerpt:
      "Learn how to minimize your environmental impact while maximizing your travel experiences with these eco-friendly tips.",
    author: {
      name: "Maria Santos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    },
    publishedAt: "2024-01-03",
    readTime: "9 min read",
    category: "Sustainable Travel",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
  },
]

const stats = [
  { icon: Globe, label: "Countries Explored", value: "127+" },
  { icon: Users, label: "Travel Stories", value: "2.4K+" },
  { icon: TrendingUp, label: "Monthly Readers", value: "45K+" },
]

// Smooth color interpolation function
const interpolateColor = (color1: number[], color2: number[], factor: number): string => {
  const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)))
  return `rgb(${result.join(",")})`
}

// Easing functions for smoother animations
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4)
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Enhanced day/night transition with smoother progression
  const maxScroll = 3000
  const rawProgress = Math.min(scrollY / maxScroll, 1)
  const dayNightProgress = easeInOutCubic(rawProgress)

  // Define color stops for smooth transitions
  const skyColors = {
    dawn: [135, 206, 250], // Light blue
    morning: [87, 160, 211], // Sky blue
    noon: [70, 130, 180], // Steel blue
    afternoon: [255, 165, 0], // Orange
    sunset: [255, 69, 0], // Red orange
    dusk: [75, 0, 130], // Indigo
    night: [25, 25, 112], // Midnight blue
    deepNight: [0, 0, 0], // Black
  }

  // Calculate current sky color based on progress
  const getSkyColor = (): string => {
    if (dayNightProgress < 0.15) {
      const factor = dayNightProgress / 0.15
      return interpolateColor(skyColors.dawn, skyColors.morning, factor)
    } else if (dayNightProgress < 0.3) {
      const factor = (dayNightProgress - 0.15) / 0.15
      return interpolateColor(skyColors.morning, skyColors.noon, factor)
    } else if (dayNightProgress < 0.5) {
      const factor = (dayNightProgress - 0.3) / 0.2
      return interpolateColor(skyColors.noon, skyColors.afternoon, factor)
    } else if (dayNightProgress < 0.65) {
      const factor = (dayNightProgress - 0.5) / 0.15
      return interpolateColor(skyColors.afternoon, skyColors.sunset, factor)
    } else if (dayNightProgress < 0.8) {
      const factor = (dayNightProgress - 0.65) / 0.15
      return interpolateColor(skyColors.sunset, skyColors.dusk, factor)
    } else if (dayNightProgress < 0.9) {
      const factor = (dayNightProgress - 0.8) / 0.1
      return interpolateColor(skyColors.dusk, skyColors.night, factor)
    } else {
      const factor = (dayNightProgress - 0.9) / 0.1
      return interpolateColor(skyColors.night, skyColors.deepNight, factor)
    }
  }

  // Enhanced sun positioning with realistic arc
  const sunProgress = Math.min(dayNightProgress * 1.4, 1)
  const sunAngle = sunProgress * Math.PI // Full semicircle
  const sunPosition = {
    x: 15 + (Math.cos(Math.PI - sunAngle) + 1) * 35, // Moves from east to west
    y: 25 + Math.sin(sunAngle) * -15, // Arc from horizon to zenith to horizon
    opacity: Math.max(0, Math.cos(sunAngle * 0.7)), // Fades as it sets
    size: 120 + Math.sin(sunAngle) * 40, // Larger at horizon (perspective effect)
  }

  // Enhanced moon positioning - appears after sunset
  const moonStartProgress = 0.6
  const moonProgress = Math.max(0, (dayNightProgress - moonStartProgress) / (1 - moonStartProgress))
  const moonAngle = moonProgress * Math.PI * 0.8 // Slightly different arc
  const moonPosition = {
    x: 85 - (Math.cos(Math.PI - moonAngle) + 1) * 35, // Opposite direction
    y: 20 + Math.sin(moonAngle) * -12,
    opacity: Math.min(0.9, moonProgress * 2), // Fades in gradually
    size: 100 + Math.sin(moonAngle) * 20,
  }

  // Enhanced bird animations with more natural movement
  const birdFlock1 = {
    x: 5 + ((scrollY * 0.03 + Date.now() * 0.001) % 100),
    y: 15 + Math.sin(scrollY * 0.008 + Date.now() * 0.002) * 8,
    opacity: Math.max(0.1, 0.7 - dayNightProgress * 0.6),
    rotation: Math.sin(scrollY * 0.005) * 15,
  }

  const birdFlock2 = {
    x: -10 + ((scrollY * 0.025 + Date.now() * 0.0008) % 120),
    y: 25 + Math.sin(scrollY * 0.006 + Date.now() * 0.0015 + 1) * 6,
    opacity: Math.max(0.05, 0.5 - dayNightProgress * 0.5),
    rotation: Math.sin(scrollY * 0.004 + 1) * 12,
  }

  // Enhanced cloud movement
  const cloud1 = {
    x: ((scrollY * 0.015 + Date.now() * 0.0005) % 130) - 30,
    opacity: Math.max(0.1, 0.4 - dayNightProgress * 0.3),
    scale: 1 + Math.sin(scrollY * 0.002) * 0.1,
  }

  const cloud2 = {
    x: ((scrollY * 0.012 + Date.now() * 0.0004) % 140) - 40,
    opacity: Math.max(0.05, 0.3 - dayNightProgress * 0.25),
    scale: 1 + Math.sin(scrollY * 0.0015 + 1) * 0.08,
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Enhanced Parallax Background */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic Sky with Smooth Gradient */}
        <div
          className="absolute inset-0 transition-all duration-1000 ease-out"
          style={{
            background: `linear-gradient(to bottom, ${getSkyColor()}, ${interpolateColor(
              [135, 206, 250],
              [25, 25, 112],
              dayNightProgress,
            )})`,
          }}
        />

        {/* Enhanced Clouds with Better Movement */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          <div
            className="absolute top-16 transition-all duration-1000 ease-out"
            style={{
              left: `${cloud1.x}%`,
              opacity: cloud1.opacity,
              transform: `scale(${cloud1.scale})`,
            }}
          >
            <svg width="300" height="100" viewBox="0 0 300 100" className="fill-white drop-shadow-sm">
              <ellipse cx="60" cy="60" rx="60" ry="35" />
              <ellipse cx="120" cy="50" rx="70" ry="40" />
              <ellipse cx="180" cy="55" rx="55" ry="32" />
              <ellipse cx="240" cy="52" rx="45" ry="28" />
            </svg>
          </div>
          <div
            className="absolute top-28 transition-all duration-1000 ease-out"
            style={{
              left: `${cloud2.x}%`,
              opacity: cloud2.opacity,
              transform: `scale(${cloud2.scale})`,
            }}
          >
            <svg width="250" height="80" viewBox="0 0 250 80" className="fill-white drop-shadow-sm">
              <ellipse cx="50" cy="50" rx="50" ry="30" />
              <ellipse cx="100" cy="45" rx="60" ry="35" />
              <ellipse cx="160" cy="48" rx="48" ry="28" />
              <ellipse cx="200" cy="44" rx="40" ry="24" />
            </svg>
          </div>
        </div>

        {/* Enhanced Flying Birds */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: `${birdFlock1.x}%`,
              top: `${birdFlock1.y}%`,
              opacity: birdFlock1.opacity,
              transform: `rotate(${birdFlock1.rotation}deg)`,
            }}
          >
            <svg
              width="100"
              height="40"
              viewBox="0 0 100 40"
              className="fill-none stroke-current text-gray-800 drop-shadow-sm"
              strokeWidth="2"
            >
              <path d="M10,25 L18,18 M18,18 L26,22 M26,22 L34,16 M34,16 L42,20 M42,20 L50,15 M50,15 L58,19 M58,19 L66,14 M66,14 L74,18 M74,18 L82,13 M82,13 L90,17" />
            </svg>
          </div>
          <div
            className="absolute transition-all duration-500 ease-out"
            style={{
              left: `${birdFlock2.x}%`,
              top: `${birdFlock2.y}%`,
              opacity: birdFlock2.opacity,
              transform: `rotate(${birdFlock2.rotation}deg)`,
            }}
          >
            <svg
              width="70"
              height="30"
              viewBox="0 0 70 30"
              className="fill-none stroke-current text-gray-700 drop-shadow-sm"
              strokeWidth="1.5"
            >
              <path d="M15,18 L22,14 M22,14 L29,17 M29,17 L36,13 M36,13 L43,16 M43,16 L50,12 M50,12 L57,15" />
            </svg>
          </div>
        </div>

        {/* Enhanced Stars with Twinkling Effect */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: Math.max(0, (dayNightProgress - 0.4) * 1.5) }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${10 + ((i * 37) % 80)}%`,
                top: `${15 + ((i * 23) % 40)}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i % 3)}s`,
                opacity: 0.6 + (i % 3) * 0.2,
              }}
            />
          ))}
        </div>

        {/* Enhanced Sun with Realistic Lighting */}
        <div
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: `${sunPosition.x}%`,
            top: `${sunPosition.y}%`,
            opacity: sunPosition.opacity,
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          {/* Sun's Glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: `${sunPosition.size * 3}px`,
              height: `${sunPosition.size * 3}px`,
              background: `radial-gradient(circle, rgba(255, 255, 0, ${sunPosition.opacity * 0.1}) 0%, rgba(255, 200, 0, ${sunPosition.opacity * 0.05}) 30%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: `${sunPosition.size * 2}px`,
              height: `${sunPosition.size * 2}px`,
              background: `radial-gradient(circle, rgba(255, 255, 100, ${sunPosition.opacity * 0.2}) 0%, rgba(255, 220, 0, ${sunPosition.opacity * 0.1}) 50%, transparent 80%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          {/* Sun Body */}
          <div
            className="relative bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg"
            style={{
              width: `${sunPosition.size}px`,
              height: `${sunPosition.size}px`,
              boxShadow: `0 0 ${sunPosition.size * 0.3}px rgba(255, 255, 0, ${sunPosition.opacity * 0.8}), 0 0 ${sunPosition.size * 0.6}px rgba(255, 200, 0, ${sunPosition.opacity * 0.4})`,
            }}
          >
            <div className="absolute top-4 left-6 w-4 h-4 bg-yellow-200 rounded-full opacity-60" />
            <div className="absolute top-8 right-4 w-3 h-3 bg-orange-300 rounded-full opacity-40" />
            <div className="absolute bottom-6 left-8 w-2 h-2 bg-yellow-100 rounded-full opacity-80" />
          </div>
        </div>

        {/* Enhanced Moon with Realistic Phases */}
        <div
          className="absolute transition-all duration-700 ease-out"
          style={{
            left: `${moonPosition.x}%`,
            top: `${moonPosition.y}%`,
            opacity: moonPosition.opacity,
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          {/* Moon's Glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: `${moonPosition.size * 2.5}px`,
              height: `${moonPosition.size * 2.5}px`,
              background: `radial-gradient(circle, rgba(200, 200, 255, ${moonPosition.opacity * 0.08}) 0%, rgba(150, 150, 255, ${moonPosition.opacity * 0.04}) 40%, transparent 70%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              width: `${moonPosition.size * 1.8}px`,
              height: `${moonPosition.size * 1.8}px`,
              background: `radial-gradient(circle, rgba(220, 220, 255, ${moonPosition.opacity * 0.15}) 0%, rgba(180, 180, 255, ${moonPosition.opacity * 0.08}) 50%, transparent 80%)`,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          {/* Moon Body */}
          <div
            className="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-lg"
            style={{
              width: `${moonPosition.size}px`,
              height: `${moonPosition.size}px`,
              boxShadow: `0 0 ${moonPosition.size * 0.25}px rgba(200, 200, 255, ${moonPosition.opacity * 0.6}), 0 0 ${moonPosition.size * 0.5}px rgba(150, 150, 255, ${moonPosition.opacity * 0.3})`,
            }}
          >
            {/* Moon Craters */}
            <div className="absolute top-4 left-4 w-3 h-3 bg-gray-400 rounded-full opacity-60" />
            <div className="absolute top-8 right-4 w-4 h-4 bg-gray-400 rounded-full opacity-40" />
            <div className="absolute bottom-6 left-6 w-2 h-2 bg-gray-400 rounded-full opacity-50" />
            <div className="absolute top-12 left-10 w-2 h-2 bg-gray-400 rounded-full opacity-70" />
            <div className="absolute bottom-4 right-6 w-3 h-3 bg-gray-400 rounded-full opacity-30" />
          </div>
        </div>

        {/* Enhanced Parallax Mountain Layers with Better Depth */}
        <div className="absolute inset-0">
          {/* Back Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-40"
            style={{ transform: `translateY(${scrollY * 0.6}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="backMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={interpolateColor([74, 144, 74], [34, 68, 34], dayNightProgress)} />
                  <stop offset="100%" stopColor={interpolateColor([50, 120, 50], [20, 40, 20], dayNightProgress)} />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,200 100,150 200,220 350,120 500,100 650,180 800,140 950,160 1100,190 1200,200 1200,600"
                fill="url(#backMountain)"
              />
            </svg>
          </div>

          {/* Mid Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-60"
            style={{ transform: `translateY(${scrollY * 0.4}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="midMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={interpolateColor([84, 154, 84], [44, 78, 44], dayNightProgress)} />
                  <stop offset="100%" stopColor={interpolateColor([60, 130, 60], [30, 50, 30], dayNightProgress)} />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,320 80,280 180,240 300,280 420,220 540,260 660,200 780,240 900,220 1020,240 1120,260 1200,280 1200,600"
                fill="url(#midMountain)"
              />
            </svg>
          </div>

          {/* Front Mountains */}
          <div
            className="absolute bottom-0 w-full h-full opacity-80"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="frontMountain" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={interpolateColor([94, 164, 94], [54, 88, 54], dayNightProgress)} />
                  <stop offset="100%" stopColor={interpolateColor([70, 140, 70], [40, 60, 40], dayNightProgress)} />
                </linearGradient>
              </defs>
              <polygon
                points="0,600 0,420 60,380 140,360 240,400 340,340 440,380 540,320 640,360 740,330 840,350 940,340 1040,360 1140,370 1200,380 1200,600"
                fill="url(#frontMountain)"
              />
            </svg>
          </div>
        </div>

        {/* Night Cityscape - Square Buildings with Proper Window Placement */}
        <div
          className="absolute bottom-0 w-full h-full transition-opacity duration-1000"
          style={{
            opacity: Math.max(0, (dayNightProgress - 0.4) * 1.5),
            transform: `translateY(${scrollY * 0.1}px)`,
            zIndex: 4,
          }}
        >
          {/* City Skyline with Square Buildings */}
          <div className="absolute bottom-0 w-full h-full">
            <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="cityBuilding" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={interpolateColor([30, 41, 59], [15, 23, 42], dayNightProgress)} />
                  <stop offset="100%" stopColor={interpolateColor([15, 23, 42], [8, 14, 28], dayNightProgress)} />
                </linearGradient>
              </defs>

              {/* Background Layer - Tallest Buildings */}
              <rect x="50" y="100" width="60" height="500" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="130" y="80" width="70" height="520" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="220" y="120" width="50" height="480" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="290" y="60" width="80" height="540" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="390" y="90" width="65" height="510" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="480" y="110" width="55" height="490" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="560" y="70" width="75" height="530" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="660" y="100" width="60" height="500" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="740" y="85" width="70" height="515" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="830" y="95" width="65" height="505" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="920" y="75" width="80" height="525" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="1020" y="105" width="55" height="495" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="1100" y="90" width="70" height="510" fill="url(#cityBuilding)" opacity="0.6" />

              {/* Mid Layer - Medium Buildings */}
              <rect x="20" y="250" width="45" height="350" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="80" y="220" width="55" height="380" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="150" y="240" width="50" height="360" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="220" y="200" width="60" height="400" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="300" y="230" width="45" height="370" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="370" y="210" width="65" height="390" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="460" y="240" width="50" height="360" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="530" y="220" width="70" height="380" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="620" y="200" width="55" height="400" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="700" y="230" width="60" height="370" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="780" y="210" width="50" height="390" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="850" y="240" width="65" height="360" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="940" y="220" width="55" height="380" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="1020" y="200" width="70" height="400" fill="url(#cityBuilding)" opacity="0.8" />
              <rect x="1110" y="230" width="50" height="370" fill="url(#cityBuilding)" opacity="0.8" />

              {/* Foreground Layer - Shorter Buildings */}
              <rect x="0" y="400" width="70" height="200" fill="url(#cityBuilding)" />
              <rect x="90" y="380" width="60" height="220" fill="url(#cityBuilding)" />
              <rect x="170" y="420" width="50" height="180" fill="url(#cityBuilding)" />
              <rect x="240" y="390" width="80" height="210" fill="url(#cityBuilding)" />
              <rect x="340" y="410" width="55" height="190" fill="url(#cityBuilding)" />
              <rect x="420" y="370" width="75" height="230" fill="url(#cityBuilding)" />
              <rect x="520" y="400" width="60" height="200" fill="url(#cityBuilding)" />
              <rect x="600" y="380" width="70" height="220" fill="url(#cityBuilding)" />
              <rect x="690" y="420" width="50" height="180" fill="url(#cityBuilding)" />
              <rect x="760" y="390" width="65" height="210" fill="url(#cityBuilding)" />
              <rect x="850" y="410" width="55" height="190" fill="url(#cityBuilding)" />
              <rect x="930" y="370" width="80" height="230" fill="url(#cityBuilding)" />
              <rect x="1030" y="400" width="60" height="200" fill="url(#cityBuilding)" />
              <rect x="1110" y="380" width="90" height="220" fill="url(#cityBuilding)" />

              {/* Special Buildings */}
              {/* Antenna Building */}
              <rect x="290" y="60" width="80" height="540" fill="url(#cityBuilding)" opacity="0.6" />
              <rect x="325" y="40" width="10" height="20" fill="url(#cityBuilding)" />
              <circle cx="330" cy="35" r="3" fill="url(#cityBuilding)" />
            </svg>

            {/* Lit Windows - Precisely Placed Within Buildings */}
            <div className="absolute bottom-0 w-full h-full">
              {/* Background Layer Windows */}
              {[
                // Building 1: x=50, y=100, width=60, height=500
                ...Array.from({ length: 24 }, (_, i) => ({
                  buildingX: 50,
                  buildingY: 100,
                  buildingWidth: 60,
                  buildingHeight: 500,
                  windowX: 50 + 8 + (i % 4) * 12,
                  windowY: 100 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 2: x=130, y=80, width=70, height=520
                ...Array.from({ length: 28 }, (_, i) => ({
                  buildingX: 130,
                  buildingY: 80,
                  buildingWidth: 70,
                  buildingHeight: 520,
                  windowX: 130 + 8 + (i % 4) * 14,
                  windowY: 80 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 3: x=220, y=120, width=50, height=480
                ...Array.from({ length: 20 }, (_, i) => ({
                  buildingX: 220,
                  buildingY: 120,
                  buildingWidth: 50,
                  buildingHeight: 480,
                  windowX: 220 + 6 + (i % 3) * 12,
                  windowY: 120 + 20 + Math.floor(i / 3) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 4: x=290, y=60, width=80, height=540 (Antenna building)
                ...Array.from({ length: 32 }, (_, i) => ({
                  buildingX: 290,
                  buildingY: 60,
                  buildingWidth: 80,
                  buildingHeight: 540,
                  windowX: 290 + 8 + (i % 5) * 14,
                  windowY: 60 + 20 + Math.floor(i / 5) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 5: x=390, y=90, width=65, height=510
                ...Array.from({ length: 25 }, (_, i) => ({
                  buildingX: 390,
                  buildingY: 90,
                  buildingWidth: 65,
                  buildingHeight: 510,
                  windowX: 390 + 8 + (i % 4) * 12,
                  windowY: 90 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 6: x=480, y=110, width=55, height=490
                ...Array.from({ length: 21 }, (_, i) => ({
                  buildingX: 480,
                  buildingY: 110,
                  buildingWidth: 55,
                  buildingHeight: 490,
                  windowX: 480 + 8 + (i % 3) * 13,
                  windowY: 110 + 20 + Math.floor(i / 3) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 7: x=560, y=70, width=75, height=530
                ...Array.from({ length: 30 }, (_, i) => ({
                  buildingX: 560,
                  buildingY: 70,
                  buildingWidth: 75,
                  buildingHeight: 530,
                  windowX: 560 + 8 + (i % 5) * 12,
                  windowY: 70 + 20 + Math.floor(i / 5) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 8: x=660, y=100, width=60, height=500
                ...Array.from({ length: 24 }, (_, i) => ({
                  buildingX: 660,
                  buildingY: 100,
                  buildingWidth: 60,
                  buildingHeight: 500,
                  windowX: 660 + 8 + (i % 4) * 12,
                  windowY: 100 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 9: x=740, y=85, width=70, height=515
                ...Array.from({ length: 28 }, (_, i) => ({
                  buildingX: 740,
                  buildingY: 85,
                  buildingWidth: 70,
                  buildingHeight: 515,
                  windowX: 740 + 8 + (i % 4) * 14,
                  windowY: 85 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 10: x=830, y=95, width=65, height=505
                ...Array.from({ length: 25 }, (_, i) => ({
                  buildingX: 830,
                  buildingY: 95,
                  buildingWidth: 65,
                  buildingHeight: 505,
                  windowX: 830 + 8 + (i % 4) * 12,
                  windowY: 95 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 11: x=920, y=75, width=80, height=525
                ...Array.from({ length: 32 }, (_, i) => ({
                  buildingX: 920,
                  buildingY: 75,
                  buildingWidth: 80,
                  buildingHeight: 525,
                  windowX: 920 + 8 + (i % 5) * 14,
                  windowY: 75 + 20 + Math.floor(i / 5) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 12: x=1020, y=105, width=55, height=495
                ...Array.from({ length: 21 }, (_, i) => ({
                  buildingX: 1020,
                  buildingY: 105,
                  buildingWidth: 55,
                  buildingHeight: 495,
                  windowX: 1020 + 8 + (i % 3) * 13,
                  windowY: 105 + 20 + Math.floor(i / 3) * 40,
                  size: "small",
                  layer: "back",
                })),
                // Building 13: x=1100, y=90, width=70, height=510
                ...Array.from({ length: 28 }, (_, i) => ({
                  buildingX: 1100,
                  buildingY: 90,
                  buildingWidth: 70,
                  buildingHeight: 510,
                  windowX: 1100 + 8 + (i % 4) * 14,
                  windowY: 90 + 20 + Math.floor(i / 4) * 40,
                  size: "small",
                  layer: "back",
                })),
              ].map((window, index) => {
                const isLit = Math.random() > 0.3 // 70% chance of being lit
                const windowSizes = {
                  small: { width: 4, height: 6 },
                  medium: { width: 6, height: 8 },
                  large: { width: 8, height: 10 },
                }
                const size = windowSizes[window.size]
                const opacity = 0.6

                return isLit ? (
                  <div
                    key={`back-window-${index}`}
                    className="absolute transition-all duration-1000"
                    style={{
                      left: `${(window.windowX / 1200) * 100}%`,
                      bottom: `${((600 - window.windowY) / 600) * 100}%`,
                      width: `${size.width}px`,
                      height: `${size.height}px`,
                      backgroundColor: `rgba(255, ${220 + Math.random() * 35}, ${100 + Math.random() * 155}, ${0.8 + Math.random() * 0.2})`,
                      boxShadow: `0 0 ${size.width + 2}px rgba(255, 235, 150, ${opacity * 0.6})`,
                      borderRadius: "1px",
                      opacity: dayNightProgress > 0.5 ? opacity : 0,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ) : null
              })}

              {/* Mid Layer Windows */}
              {[
                // Mid layer buildings - 15 buildings
                ...Array.from({ length: 12 }, (_, buildingIndex) => {
                  const buildings = [
                    { x: 20, y: 250, width: 45, height: 350 },
                    { x: 80, y: 220, width: 55, height: 380 },
                    { x: 150, y: 240, width: 50, height: 360 },
                    { x: 220, y: 200, width: 60, height: 400 },
                    { x: 300, y: 230, width: 45, height: 370 },
                    { x: 370, y: 210, width: 65, height: 390 },
                    { x: 460, y: 240, width: 50, height: 360 },
                    { x: 530, y: 220, width: 70, height: 380 },
                    { x: 620, y: 200, width: 55, height: 400 },
                    { x: 700, y: 230, width: 60, height: 370 },
                    { x: 780, y: 210, width: 50, height: 390 },
                    { x: 850, y: 240, width: 65, height: 360 },
                  ]
                  const building = buildings[buildingIndex]
                  const windowsPerRow = Math.floor(building.width / 15)
                  const rows = Math.floor(building.height / 30)

                  return Array.from({ length: windowsPerRow * rows }, (_, windowIndex) => ({
                    buildingX: building.x,
                    buildingY: building.y,
                    buildingWidth: building.width,
                    buildingHeight: building.height,
                    windowX: building.x + 8 + (windowIndex % windowsPerRow) * 15,
                    windowY: building.y + 15 + Math.floor(windowIndex / windowsPerRow) * 30,
                    size: "medium",
                    layer: "mid",
                  }))
                }).flat(),
              ].map((window, index) => {
                const isLit = Math.random() > 0.4 // 60% chance of being lit
                const windowSizes = {
                  medium: { width: 6, height: 8 },
                }
                const size = windowSizes[window.size]
                const opacity = 0.8

                return isLit ? (
                  <div
                    key={`mid-window-${index}`}
                    className="absolute transition-all duration-1000"
                    style={{
                      left: `${(window.windowX / 1200) * 100}%`,
                      bottom: `${((600 - window.windowY) / 600) * 100}%`,
                      width: `${size.width}px`,
                      height: `${size.height}px`,
                      backgroundColor: `rgba(255, ${200 + Math.random() * 55}, ${100 + Math.random() * 155}, ${0.7 + Math.random() * 0.3})`,
                      boxShadow: `0 0 ${size.width + 2}px rgba(255, 220, 150, ${opacity * 0.5})`,
                      borderRadius: "1px",
                      opacity: dayNightProgress > 0.5 ? opacity : 0,
                      animationDelay: `${Math.random() * 4}s`,
                    }}
                  />
                ) : null
              })}

              {/* Foreground Layer Windows */}
              {[
                // Foreground buildings - 14 buildings
                ...Array.from({ length: 14 }, (_, buildingIndex) => {
                  const buildings = [
                    { x: 0, y: 400, width: 70, height: 200 },
                    { x: 90, y: 380, width: 60, height: 220 },
                    { x: 170, y: 420, width: 50, height: 180 },
                    { x: 240, y: 390, width: 80, height: 210 },
                    { x: 340, y: 410, width: 55, height: 190 },
                    { x: 420, y: 370, width: 75, height: 230 },
                    { x: 520, y: 400, width: 60, height: 200 },
                    { x: 600, y: 380, width: 70, height: 220 },
                    { x: 690, y: 420, width: 50, height: 180 },
                    { x: 760, y: 390, width: 65, height: 210 },
                    { x: 850, y: 410, width: 55, height: 190 },
                    { x: 930, y: 370, width: 80, height: 230 },
                    { x: 1030, y: 400, width: 60, height: 200 },
                    { x: 1110, y: 380, width: 90, height: 220 },
                  ]
                  const building = buildings[buildingIndex]
                  const windowsPerRow = Math.floor(building.width / 18)
                  const rows = Math.floor(building.height / 35)

                  return Array.from({ length: windowsPerRow * rows }, (_, windowIndex) => ({
                    buildingX: building.x,
                    buildingY: building.y,
                    buildingWidth: building.width,
                    buildingHeight: building.height,
                    windowX: building.x + 10 + (windowIndex % windowsPerRow) * 18,
                    windowY: building.y + 20 + Math.floor(windowIndex / windowsPerRow) * 35,
                    size: "large",
                    layer: "front",
                  }))
                }).flat(),
              ].map((window, index) => {
                const isLit = Math.random() > 0.35 // 65% chance of being lit
                const windowSizes = {
                  large: { width: 8, height: 10 },
                }
                const size = windowSizes[window.size]
                const opacity = 1.0

                return isLit ? (
                  <div
                    key={`front-window-${index}`}
                    className="absolute transition-all duration-1000"
                    style={{
                      left: `${(window.windowX / 1200) * 100}%`,
                      bottom: `${((600 - window.windowY) / 600) * 100}%`,
                      width: `${size.width}px`,
                      height: `${size.height}px`,
                      backgroundColor: `rgba(255, ${180 + Math.random() * 75}, ${80 + Math.random() * 175}, ${0.8 + Math.random() * 0.2})`,
                      boxShadow: `0 0 ${size.width + 4}px rgba(255, 200, 120, ${opacity * 0.7})`,
                      borderRadius: "2px",
                      opacity: dayNightProgress > 0.5 ? opacity : 0,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  />
                ) : null
              })}

              {/* Street Level Lighting */}
              <div className="absolute bottom-0 w-full h-16">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={`street-${i}`}
                    className="absolute bottom-0 transition-all duration-1000"
                    style={{
                      left: `${3 + i * 4.7}%`,
                      opacity: dayNightProgress > 0.6 ? 1 : 0,
                    }}
                  >
                    <div className="w-0.5 bg-gray-700" style={{ height: "40px" }} />
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1"
                      style={{
                        width: "30px",
                        height: "30px",
                        background: "radial-gradient(circle, rgba(255, 255, 150, 0.2) 0%, transparent 70%)",
                        borderRadius: "50%",
                      }}
                    />
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(255, 255, 150, 0.9)",
                        boxShadow: "0 0 6px rgba(255, 255, 150, 0.6)",
                      }}
                    />
                  </div>
                ))}

                <div
                  className="absolute bottom-0 w-full h-8 transition-opacity duration-1000"
                  style={{
                    background: `linear-gradient(to top, rgba(255, 235, 150, ${dayNightProgress > 0.6 ? 0.1 : 0}) 0%, transparent 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                left: `${10 + ((i * 15) % 80)}%`,
                top: `${30 + Math.sin(scrollY * 0.005 + i) * 20}%`,
                width: `${8 + (i % 3) * 4}px`,
                height: `${8 + (i % 3) * 4}px`,
                backgroundColor:
                  dayNightProgress > 0.5
                    ? `rgba(255, 255, 100, ${0.3 + (i % 3) * 0.2})`
                    : `rgba(255, 255, 255, ${0.1 + (i % 3) * 0.1})`,
                boxShadow: dayNightProgress > 0.5 ? `0 0 ${10 + (i % 3) * 5}px rgba(255, 255, 100, 0.4)` : "none",
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
                animationName: "float",
                animationIterationCount: "infinite",
                animationTimingFunction: "ease-in-out",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden z-10">
        <div className="relative z-20 flex items-center justify-center h-full">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1
              className="text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in-up drop-shadow-2xl"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            >
              Wanderlust Wonders
            </h1>
            <div
              className="w-24 h-1 bg-white/80 mx-auto mb-8 rounded-full"
              style={{ animation: "fade-in-up 1s ease-out 0.3s both" }}
            ></div>
            <p
              className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
              style={{ transform: `translateY(${scrollY * 0.15}px)`, animation: "fade-in-up 1s ease-out 0.6s both" }}
            >
              Discover amazing destinations, travel tips, and inspiring stories from fellow adventurers around the globe
            </p>
            <div className="relative max-w-2xl mx-auto" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, stories..."
                className="w-full pl-12 pr-4 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
              />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 max-w-7xl">
          {/* Featured Post */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-12">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Featured Story</h2>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">✨</span>
              </div>
            </div>
            <div className="block group cursor-pointer">
              <article className="bg-white/80 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20">
                <div className="lg:flex">
                  <div className="lg:w-1/2 relative overflow-hidden">
                    <img
                      src={featuredPost.image || "/placeholder.svg?height=400&width=800"}
                      alt={featuredPost.title}
                      className="w-full h-80 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {featuredPost.category}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={featuredPost.author.avatar || "/placeholder.svg?height=150&width=150"}
                          alt={featuredPost.author.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{featuredPost.author.name}</p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(featuredPost.publishedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <div className="flex items-center gap-3 mb-12">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">Latest Adventures</h2>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🌍</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="block group cursor-pointer">
                  <article className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image || "/placeholder.svg?height=250&width=400"}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-6 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={post.author.avatar || "/placeholder.svg?height=150&width=150"}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-700">{post.author.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="bg-white/80 backdrop-blur-md hover:bg-white/90 text-gray-900 px-8 py-4 text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-white/20">
              Load More Adventures
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
