"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Link } from "react-router-dom"

// Smooth color interpolation function
const interpolateColor = (color1: number[], color2: number[], factor: number): string => {
  const result = color1.map((c, i) => Math.round(c + factor * (color2[i] - c)))
  return `rgb(${result.join(",")})`
}

// Easing functions for smoother animations
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Throttle function for scroll events
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(
    throttle(() => setScrollY(window.scrollY), 16), // ~60fps
    []
  )

  // Scroll tracking effect with throttling
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Memoized calculations to prevent recalculation on every render
  const scrollCalculations = useMemo(() => {
    const maxScroll = 3000
    const rawProgress = Math.min(scrollY / maxScroll, 1)
    const dayNightProgress = easeInOutCubic(rawProgress)

    // Define color stops for smooth transitions
    const skyColors = {
      dawn: [135, 206, 250],
      morning: [87, 160, 211],
      noon: [70, 130, 180],
      afternoon: [255, 165, 0],
      sunset: [255, 69, 0],
      dusk: [75, 0, 130],
      night: [25, 25, 112],
      deepNight: [0, 0, 0],
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

    // Sun positioning
    const sunProgress = Math.min(dayNightProgress * 1.4, 1)
    const sunAngle = sunProgress * Math.PI
    const sunPosition = {
      x: 15 + (Math.cos(Math.PI - sunAngle) + 1) * 35,
      y: 25 + Math.sin(sunAngle) * -15,
      opacity: Math.max(0, Math.cos(sunAngle * 0.7)),
      size: 120 + Math.sin(sunAngle) * 40,
    }

    // Moon positioning
    const moonStartProgress = 0.6
    const moonProgress = Math.max(0, (dayNightProgress - moonStartProgress) / (1 - moonStartProgress))
    const moonAngle = moonProgress * Math.PI * 0.8
    const moonPosition = {
      x: 85 - (Math.cos(Math.PI - moonAngle) + 1) * 35,
      y: 20 + Math.sin(moonAngle) * -12,
      opacity: Math.min(0.9, moonProgress * 2),
      size: 100 + Math.sin(moonAngle) * 20,
    }

    // Cloud positioning
    const now = Date.now()
    const cloud1 = {
      x: ((scrollY * 0.015 + now * 0.0005) % 130) - 30,
      opacity: Math.max(0.1, 0.4 - dayNightProgress * 0.3),
      scale: 1 + Math.sin(scrollY * 0.002) * 0.1,
    }

    const cloud2 = {
      x: ((scrollY * 0.012 + now * 0.0004) % 140) - 40,
      opacity: Math.max(0.05, 0.3 - dayNightProgress * 0.25),
      scale: 1 + Math.sin(scrollY * 0.0015 + 1) * 0.08,
    }

    return {
      dayNightProgress,
      skyColor: getSkyColor(),
      sunPosition,
      moonPosition,
      cloud1,
      cloud2,
      scrollY
    }
  }, [scrollY])

  // Memoized window generation with more windows
  const cityWindows = useMemo(() => {
    const windows: Array<{
      x: number
      y: number
      width: number
      height: number
      isLit: boolean
      color: string
      layer: string
    }> = []

    // Stylized buildings with increased window count
    const buildings = [
      // Background buildings
      { x: 50, y: 100, width: 40, height: 500, layer: 'back', windowCount: 20 },
      { x: 100, y: 80, width: 50, height: 520, layer: 'back', windowCount: 24 },
      { x: 160, y: 120, width: 30, height: 480, layer: 'back', windowCount: 16 },
      { x: 200, y: 60, width: 60, height: 540, layer: 'back', windowCount: 28 },
      { x: 270, y: 90, width: 45, height: 510, layer: 'back', windowCount: 22 },
      { x: 325, y: 75, width: 55, height: 525, layer: 'back', windowCount: 26 },
      
      // Mid buildings
      { x: 80, y: 220, width: 40, height: 380, layer: 'mid', windowCount: 14 },
      { x: 130, y: 200, width: 45, height: 400, layer: 'mid', windowCount: 16 },
      { x: 185, y: 210, width: 50, height: 390, layer: 'mid', windowCount: 18 },
      { x: 245, y: 220, width: 55, height: 380, layer: 'mid', windowCount: 20 },
      { x: 310, y: 230, width: 45, height: 370, layer: 'mid', windowCount: 16 },
      { x: 365, y: 240, width: 50, height: 360, layer: 'mid', windowCount: 18 },
      
      // Front buildings
      { x: 90, y: 380, width: 40, height: 220, layer: 'front', windowCount: 10 },
      { x: 140, y: 390, width: 60, height: 210, layer: 'front', windowCount: 14 },
      { x: 210, y: 370, width: 55, height: 230, layer: 'front', windowCount: 12 },
      { x: 275, y: 380, width: 50, height: 220, layer: 'front', windowCount: 12 },
      { x: 335, y: 390, width: 45, height: 210, layer: 'front', windowCount: 10 },
      { x: 390, y: 370, width: 60, height: 230, layer: 'front', windowCount: 14 },
    ]

    buildings.forEach(building => {
      const windowsPerRow = Math.max(2, Math.floor(building.width / 20))
      const rows = Math.max(2, Math.floor(building.windowCount / windowsPerRow))
      
      for (let i = 0; i < building.windowCount; i++) {
        const row = Math.floor(i / windowsPerRow)
        const col = i % windowsPerRow
        
        windows.push({
          x: building.x + 5 + col * (building.width - 10) / (windowsPerRow - 1 || 1),
          y: building.y + 15 + row * (building.height - 30) / (rows - 1 || 1),
          width: building.layer === 'front' ? 6 : building.layer === 'mid' ? 5 : 4,
          height: building.layer === 'front' ? 8 : building.layer === 'mid' ? 7 : 6,
          isLit: Math.random() > (building.layer === 'front' ? 0.3 : building.layer === 'mid' ? 0.4 : 0.5),
          color: `rgba(255, 255, 255, ${0.8 + Math.random() * 0.2})`,
          layer: building.layer
        })
      }
    })

    return windows
  }, [])

  const { dayNightProgress, skyColor, sunPosition, moonPosition, cloud1, cloud2 } = scrollCalculations

  return (
    <div className="relative overflow-x-hidden">
      {/* Scrollable Container */}
      <div className="min-h-[4000px]">
        {/* Parallax Background */}
        <div className="fixed inset-0 z-0">
          {/* Dynamic Sky with Smooth Gradient */}
          <div
            className="absolute inset-0 will-change-transform"
            style={{
              background: `linear-gradient(to bottom, ${skyColor}, ${interpolateColor(
                [135, 206, 250],
                [25, 25, 112],
                dayNightProgress,
              )})`,
            }}
          />

          {/* Enhanced Clouds with Better Movement */}
          <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
            <div
              className="absolute top-16 will-change-transform"
              style={{
                left: `${cloud1.x}%`,
                opacity: cloud1.opacity,
                transform: `scale(${cloud1.scale}) translateZ(0)`,
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
              className="absolute top-28 will-change-transform"
              style={{
                left: `${cloud2.x}%`,
                opacity: cloud2.opacity,
                transform: `scale(${cloud2.scale}) translateZ(0)`,
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

          {/* Enhanced Stars */}
          <div
            className="absolute inset-0"
            style={{ opacity: Math.max(0, (dayNightProgress - 0.4) * 1.5) }}
          >
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + ((i * 37) % 80)}%`,
                  top: `${15 + ((i * 23) % 40)}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + (i % 3)}s`,
                  opacity: 0.6 + (i % 3) * 0.2,
                }}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  className="fill-current text-white animate-pulse"
                >
                  <path d="M4,0 L5,3 L8,4 L5,5 L4,8 L3,5 L0,4 L3,3 Z" />
                </svg>
              </div>
            ))}
          </div>

          {/* Enhanced Sun with Realistic Lighting */}
          <div
            className="absolute will-change-transform"
            style={{
              left: `${sunPosition.x}%`,
              top: `${sunPosition.y}%`,
              opacity: sunPosition.opacity,
              transform: "translate(-50%, -50%) translateZ(0)",
              zIndex: 3,
            }}
          >
            <div
              className="relative bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-lg"
              style={{
                width: `${sunPosition.size}px`,
                height: `${sunPosition.size}px`,
                boxShadow: `0 0 ${sunPosition.size * 0.3}px rgba(255, 255, 0, ${sunPosition.opacity * 0.8})`,
              }}
            >
              <div className="absolute top-4 left-6 w-4 h-4 bg-yellow-200 rounded-full opacity-60" />
              <div className="absolute top-8 right-4 w-3 h-3 bg-orange-300 rounded-full opacity-40" />
              <div className="absolute bottom-6 left-8 w-2 h-2 bg-yellow-100 rounded-full opacity-80" />
            </div>
          </div>

          {/* Enhanced Moon */}
          <div
            className="absolute will-change-transform"
            style={{
              left: `${moonPosition.x}%`,
              top: `${moonPosition.y}%`,
              opacity: moonPosition.opacity,
              transform: "translate(-50%, -50%) translateZ(0)",
              zIndex: 3,
            }}
          >
            <div
              className="relative bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-lg"
              style={{
                width: `${moonPosition.size}px`,
                height: `${moonPosition.size}px`,
                boxShadow: `0 0 ${moonPosition.size * 0.25}px rgba(200, 200, 255, ${moonPosition.opacity * 0.6})`,
              }}
            >
              <div className="absolute top-4 left-4 w-3 h-3 bg-gray-400 rounded-full opacity-60" />
              <div className="absolute top-8 right-4 w-4 h-4 bg-gray-400 rounded-full opacity-40" />
              <div className="absolute bottom-6 left-6 w-2 h-2 bg-gray-400 rounded-full opacity-50" />
            </div>
          </div>

          {/* Parallax Mountain Layers */}
          <div className="absolute inset-0">
            {/* Back Mountains */}
            <div
              className="absolute bottom-0 w-full h-full opacity-40 will-change-transform"
              style={{ transform: `translateY(${scrollY * 0.6}px) translateZ(0)` }}
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
              className="absolute bottom-0 w-full h-full opacity-60 will-change-transform"
              style={{ transform: `translateY(${scrollY * 0.4}px) translateZ(0)` }}
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
              className="absolute bottom-0 w-full h-full opacity-80 will-change-transform"
              style={{ transform: `translateY(${scrollY * 0.2}px) translateZ(0)` }}
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

          {/* Stylized City Skyline */}
          <div
            className="absolute bottom-0 w-full h-full will-change-transform"
            style={{
              opacity: Math.max(0, (dayNightProgress - 0.4) * 1.5),
              transform: `translateY(${scrollY * 0.1}px) translateZ(0)`,
              zIndex: 4,
            }}
          >
            <div className="absolute bottom-0 w-full h-full">
              <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cityBuilding" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1E1E2F" />
                    <stop offset="100%" stopColor="#0F0F1C" />
                  </linearGradient>
                </defs>

                {/* Background Buildings */}
                <rect x="50" y="100" width="40" height="500" fill="url(#cityBuilding)" />
                <rect x="100" y="80" width="50" height="520" fill="url(#cityBuilding)" />
                <rect x="160" y="120" width="30" height="480" fill="url(#cityBuilding)" />
                <rect x="200" y="60" width="60" height="540" fill="url(#cityBuilding)" />
                <rect x="270" y="90" width="45" height="510" fill="url(#cityBuilding)" />
                <rect x="325" y="75" width="55" height="525" fill="url(#cityBuilding)" />

                {/* Mid Buildings */}
                <rect x="80" y="220" width="40" height="380" fill="url(#cityBuilding)" />
                <rect x="130" y="200" width="45" height="400" fill="url(#cityBuilding)" />
                <rect x="185" y="210" width="50" height="390" fill="url(#cityBuilding)" />
                <rect x="245" y="220" width="55" height="380" fill="url(#cityBuilding)" />
                <rect x="310" y="230" width="45" height="370" fill="url(#cityBuilding)" />
                <rect x="365" y="240" width="50" height="360" fill="url(#cityBuilding)" />

                {/* Front Buildings */}
                <rect x="90" y="380" width="40" height="220" fill="url(#cityBuilding)" />
                <rect x="140" y="390" width="60" height="210" fill="url(#cityBuilding)" />
                <rect x="210" y="370" width="55" height="230" fill="url(#cityBuilding)" />
                <rect x="275" y="380" width= "50" height="220" fill="url(#cityBuilding)" />
                <rect x="335" y="390" width="45" height="210" fill="url(#cityBuilding)" />
                <rect x="390" y="370" width="60" height="230" fill="url(#cityBuilding)" />
              </svg>

              {/* Optimized Windows */}
              <div className="absolute bottom-0 w-full h-full">
                {cityWindows.map((window, index) => (
                  window.isLit ? (
                    <div
                      key={`window-${index}`}
                      className="absolute will-change-transform"
                      style={{
                        left: `${(window.x / 1200) * 100}%`,
                        bottom: `${((600 - window.y) / 600) * 100}%`,
                        width: `${window.width}px`,
                        height: `${window.height}px`,
                        backgroundColor: window.color,
                        borderRadius: "1px",
                        opacity: dayNightProgress > 0.5 ? (window.layer === 'front' ? 1 : window.layer === 'mid' ? 0.8 : 0.6) : 0,
                        boxShadow: `0 0 ${window.width}px ${window.color.replace(')', ', 0.3)')}`,
                      }}
                    />
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1
              className="text-6xl lg:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in-up drop-shadow-2xl"
            >
              Wanderlust Wonders
            </h1>
            <div
              className="w-24 h-1 bg-white/80 mx-auto mb-8 rounded-full"
              style={{ animation: "fade-in-up 1s ease-out 0.3s both" }}
            ></div>
            <p
              className="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-lg"
              style={{ animation: "fade-in-up 1s ease-out 0.6s both" }}
            >
              Discover amazing destinations, travel tips, and inspiring stories from fellow adventurers around the globe
            </p>
            <div className="relative max-w-2xl mx-auto">
              <Link to="/all-blogs">
                <button
                  className="w-full px-6 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-xl hover:bg-white/80 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}