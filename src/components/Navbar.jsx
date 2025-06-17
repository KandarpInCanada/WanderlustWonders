"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { PenTool, Menu, X, MapPin } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-2xl font-black text-gray-900 tracking-tight">TravelStories</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/create">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                <PenTool className="w-5 h-5 mr-2" />
                Share Story
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-3 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/create">
                <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-2xl transition-colors duration-300 flex items-center justify-center">
                  <PenTool className="w-5 h-5 mr-2" />
                  Share Your Story
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
