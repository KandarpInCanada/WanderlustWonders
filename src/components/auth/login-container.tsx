"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Users, Globe, Camera, Heart } from "lucide-react"

export default function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const { signInWithGoogle } = useAuth()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error("Error signing in:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Branding */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <MapPin className="h-16 w-16 text-blue-500 mx-auto lg:mx-0" />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-blue-500">Photo</span>
                <span className="text-gray-900">Sense</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Share your adventures, discover amazing stories, and connect with travelers from around the world.
              </p>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
                <div className="flex items-center text-blue-500">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Global Community</span>
                </div>
                <div className="flex items-center text-blue-500">
                  <Camera className="h-5 w-5 mr-2" />
                  <span>Share Photos</span>
                </div>
                <div className="flex items-center text-blue-500">
                  <Heart className="h-5 w-5 mr-2" />
                  <span>Inspire Others</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login */}
            <div className="flex justify-center lg:justify-end">
              <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-8 w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Join the Adventure</h2>
                  <p className="text-gray-600">Sign in to start sharing your travel stories</p>
                </div>

                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium py-3 rounded-lg flex items-center justify-center space-x-3 transition-all duration-200"
                  variant="outline"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                  ) : (
                    <>
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Travelers Love Travel Stories</h2>
            <p className="text-gray-600 text-lg">Join thousands of adventurers sharing their stories</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center card-hover">
              <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600">
                Connect with travelers from every corner of the world and discover hidden gems
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center card-hover">
              <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Stories</h3>
              <p className="text-gray-600">Read authentic, inspiring travel stories that will fuel your wanderlust</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8 text-center card-hover">
              <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">Build meaningful connections with like-minded travel enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Sarah"
                  className="h-10 w-10 rounded-full border-2 border-blue-500 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">Sarah M.</div>
                  <div className="text-sm text-gray-500">Digital Nomad</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Travel Stories helped me discover amazing destinations I never knew existed. The community is so
                inspiring!"
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Mike"
                  className="h-10 w-10 rounded-full border-2 border-blue-500 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">Mike R.</div>
                  <div className="text-sm text-gray-500">Adventure Seeker</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I love sharing my hiking adventures here. The feedback and connections I've made are incredible."
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <img
                  src="/placeholder.svg?height=40&width=40"
                  alt="Emma"
                  className="h-10 w-10 rounded-full border-2 border-blue-500 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">Emma L.</div>
                  <div className="text-sm text-gray-500">Travel Photographer</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The perfect platform to showcase my travel photography and stories. Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
