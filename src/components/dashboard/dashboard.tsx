"use client"

import { useAuth } from "@/context/auth-context"
import TravelStoriesOverview from "./travel-stories-overview"
import { MapPin, Compass, Camera, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <div className="mb-8">
                <MapPin className="h-16 w-16 text-blue-500 mx-auto" />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Share Your Travel Stories</h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Connect with fellow travelers, share your adventures, and discover amazing stories from around the
                world.
              </p>

              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-8 py-4 rounded-lg">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Travel Stories?</h2>
              <p className="text-gray-600 text-lg">The perfect platform for travel enthusiasts</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-200">
                <Compass className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Discover Stories</h3>
                <p className="text-gray-600">Explore amazing travel stories from adventurers around the globe</p>
              </div>

              <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-200">
                <Camera className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Share Adventures</h3>
                <p className="text-gray-600">Tell your travel stories and inspire others with your experiences</p>
              </div>

              <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-gray-200">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect</h3>
                <p className="text-gray-600">Build connections with like-minded travelers and adventurers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TravelStoriesOverview />
    </div>
  )
}
