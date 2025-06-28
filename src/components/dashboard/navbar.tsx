"use client"

import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { PlusCircle, MapPin, User, LogOut, Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const { user, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">Travel Stories</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Discover
            </Link>
            {user && (
              <Link href="/create-story" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Share Story
              </Link>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/create-story" className="hidden sm:block">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create Story
                  </Button>
                </Link>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.user_metadata?.avatar_url || "/placeholder.svg?height=32&width=32&query=user+avatar"}
                      alt={user.user_metadata?.full_name || "User"}
                      className="h-8 w-8 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-sm text-gray-900 hidden sm:block">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </div>

                  <Button onClick={signOut} variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Discover
              </Link>
              {user && (
                <Link
                  href="/create-story"
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-200 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Share Story
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
