"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ImageIcon } from "lucide-react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fallbackSrc?: string
  priority?: boolean
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  fallbackSrc = "/placeholder.svg",
  priority = false,
  quality = 75,
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (imageError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-100 text-gray-400", className)}
        style={{ width, height }}
      >
        <ImageIcon className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse"
          style={{ width, height }}
        >
          <ImageIcon className="h-8 w-8 text-gray-400" />
        </div>
      )}
      <Image
        src={imageError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
      />
    </div>
  )
}
