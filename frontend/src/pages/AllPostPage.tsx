import { useState } from "react"
import { Search, Filter, Heart, MessageCircle, Share2, Calendar, MapPin, Clock, User, Plus, Compass, Globe, Camera } from "lucide-react"
import Navbar from "./../components/Navbar"
const categories = [
  { value: "all", label: "All Stories", color: "bg-gray-100 text-gray-800" },
  { value: "adventure", label: "🏔️ Adventure", color: "bg-orange-100 text-orange-800" },
  { value: "solo-travel", label: "🎒 Solo Travel", color: "bg-purple-100 text-purple-800" },
  { value: "budget-travel", label: "💰 Budget Travel", color: "bg-green-100 text-green-800" },
  { value: "destinations", label: "🌍 Destinations", color: "bg-blue-100 text-blue-800" },
  { value: "digital-nomad", label: "💻 Digital Nomad", color: "bg-indigo-100 text-indigo-800" },
  { value: "sustainable-travel", label: "🌱 Sustainable Travel", color: "bg-emerald-100 text-emerald-800" }
]

const mockPosts = [
  {
    id: 1,
    title: "Conquering the Himalayas: A Solo Trek to Everest Base Camp",
    excerpt: "An incredible 14-day journey through Nepal's stunning mountain landscapes, meeting amazing people and pushing personal limits.",
    content: "The crisp mountain air filled my lungs as I took my first steps on the trail...",
    category: "adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    location: "Nepal, Himalayas",
    duration: "14 days",
    companions: "Solo",
    tags: ["hiking", "mountains", "nepal", "adventure"],
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 324,
      comments: 28,
      readTime: 8
    },
    createdAt: "2024-12-15",
    featured: true
  },
  {
    id: 2,
    title: "Digital Nomad Life in Bali: 3 Months of Remote Work Paradise",
    excerpt: "How I balanced productivity with tropical adventures while working remotely from the Island of Gods.",
    content: "Finding the perfect balance between work and wanderlust in Bali...",
    category: "digital-nomad",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=400&fit=crop",
    location: "Bali, Indonesia",
    duration: "3 months",
    companions: "Solo",
    tags: ["remote-work", "bali", "productivity", "tropical"],
    author: {
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 256,
      comments: 45,
      readTime: 6
    },
    createdAt: "2024-12-10",
    featured: false
  },
  {
    id: 3,
    title: "Backpacking Europe on $30 a Day: The Ultimate Budget Guide",
    excerpt: "Discover how I explored 12 European countries without breaking the bank, including hidden gems and money-saving hacks.",
    content: "Traveling Europe on a shoestring budget seemed impossible until...",
    category: "budget-travel",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=400&fit=crop",
    location: "Europe",
    duration: "2 months",
    companions: "Friends",
    tags: ["budget", "europe", "backpacking", "hostels"],
    author: {
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 189,
      comments: 67,
      readTime: 12
    },
    createdAt: "2024-12-08",
    featured: false
  },
  {
    id: 4,
    title: "Sustainable Travel in Costa Rica: Eco-Adventures That Matter",
    excerpt: "Exploring Costa Rica's biodiversity while supporting local communities and conservation efforts.",
    content: "Costa Rica showed me how travel can be a force for good...",
    category: "sustainable-travel",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    location: "Costa Rica",
    duration: "10 days",
    companions: "Couple",
    tags: ["sustainability", "wildlife", "eco-tourism", "conservation"],
    author: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 142,
      comments: 23,
      readTime: 7
    },
    createdAt: "2024-12-05",
    featured: false
  },
  {
    id: 5,
    title: "Japan's Hidden Temples: A Spiritual Journey Beyond Kyoto",
    excerpt: "Discovering tranquil mountain temples and ancient pilgrimage routes away from the tourist crowds.",
    content: "Beyond Japan's famous sites lies a world of spiritual discovery...",
    category: "destinations",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=400&fit=crop",
    location: "Japan",
    duration: "21 days",
    companions: "Solo",
    tags: ["temples", "spirituality", "culture", "off-the-beaten-path"],
    author: {
      name: "Yuki Tanaka",
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 298,
      comments: 34,
      readTime: 9
    },
    createdAt: "2024-12-01",
    featured: true
  },
  {
    id: 6,
    title: "My First Solo Adventure: Finding Courage in the Scottish Highlands",
    excerpt: "How a nervous first-time solo traveler discovered confidence and independence in Scotland's wild landscapes.",
    content: "I never thought I'd have the courage to travel alone until...",
    category: "solo-travel",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    location: "Scotland, UK",
    duration: "5 days",
    companions: "Solo",
    tags: ["first-time", "courage", "highlands", "self-discovery"],
    author: {
      name: "Rachel O'Connor",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face"
    },
    stats: {
      likes: 167,
      comments: 52,
      readTime: 5
    },
    createdAt: "2024-11-28",
    featured: false
  }
]

export default function TravelBlogListing() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [posts] = useState(mockPosts)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.stats.likes - a.stats.likes
      case "discussed":
        return b.stats.comments - a.stats.comments
      case "recent":
      default:
        return new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()

    }
  })

  const featuredPosts = posts.filter(post => post.featured)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar/>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-green-200 rounded-full opacity-20 animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Search and Filters */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories, destinations, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Liked</option>
                <option value="discussed">Most Discussed</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    selectedCategory === category.value
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Stories */}
        {featuredPosts.length > 0 && selectedCategory === "all" && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              ⭐ Featured Adventures
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <div key={post.id} className="group relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categories.find(c => c.value === post.category)?.color}`}>
                        {categories.find(c => c.value === post.category)?.label}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      FEATURED
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.stats.readTime} min read
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-gray-500">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">{post.stats.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                          <MessageCircle className="w-4 h-4" />
                          <span className="text-sm">{post.stats.comments}</span>
                        </div>
                        <button className="hover:text-green-500 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Stories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              📚 All Adventures
            </h2>
            <div className="text-sm text-gray-500">
              Showing {sortedPosts.length} of {posts.length} stories
            </div>
          </div>

          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <div key={post.id} className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categories.find(c => c.value === post.category)?.color}`}>
                        {categories.find(c => c.value === post.category)?.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {post.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.stats.readTime}m
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div>
                          <p className="text-xs font-semibold text-gray-900">{post.author.name}</p>
                          <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                          <Heart className="w-3 h-3" />
                          <span className="text-xs">{post.stats.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                          <MessageCircle className="w-3 h-3" />
                          <span className="text-xs">{post.stats.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {sortedPosts.length > 0 && (
          <div className="text-center">
            <button className="bg-white/80 backdrop-blur-lg hover:bg-white text-gray-700 px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold border border-white/50">
              Load More Adventures
            </button>
          </div>
        )}
      </div>
    </div>
  )
}