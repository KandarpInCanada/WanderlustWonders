import { useState } from "react"
import { ArrowLeft, Upload, Eye, Save, Send, MapPin, Calendar, Users, Tag, Camera, Globe, Compass } from "lucide-react"
import Navbar from "../components/Navbar"

const categories = [
  { value: "adventure", label: "🏔️ Adventure", color: "bg-orange-100 text-orange-800" },
  { value: "solo-travel", label: "🎒 Solo Travel", color: "bg-purple-100 text-purple-800" },
  { value: "budget-travel", label: "💰 Budget Travel", color: "bg-green-100 text-green-800" },
  { value: "destinations", label: "🌍 Destinations", color: "bg-blue-100 text-blue-800" },
  { value: "digital-nomad", label: "💻 Digital Nomad", color: "bg-indigo-100 text-indigo-800" },
  { value: "sustainable-travel", label: "🌱 Sustainable Travel", color: "bg-emerald-100 text-emerald-800" }
]

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [image, setImage] = useState("")
  const [location, setLocation] = useState("")
  const [duration, setDuration] = useState("")
  const [companions, setCompanions] = useState("")
  const [tags, setTags] = useState("")
  const [isDraft, setIsDraft] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const postData = {
      title,
      excerpt,
      content,
      category,
      image,
      location,
      duration,
      companions,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isDraft,
      createdAt: new Date().toISOString()
    }
    console.log(postData)
    alert(`Travel story ${isDraft ? 'saved as draft' : 'published'} successfully!`)
  }

  const selectedCategory = categories.find(cat => cat.value === category)

  const PreviewCard = () => (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 overflow-hidden">
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img src={image} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          {selectedCategory && (
            <div className="absolute top-3 left-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedCategory.color}`}>
                {selectedCategory.label}
              </span>
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title || "Your Amazing Travel Story Title"}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt || "Write a captivating summary that will make readers want to dive into your story..."}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </div>
          )}
          {duration && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {duration}
            </div>
          )}
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {Math.max(1, Math.ceil((content?.split(' ').length || 0) / 200))} min read
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <div>
              <p className="text-xs font-semibold text-gray-900">You</p>
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-8">
          <div className="flex items-center">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Share Your Adventure
              </h1>
              <p className="text-gray-600 mt-2">Tell the world about your incredible journey</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-lg text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
          >
            <Eye className="w-4 h-4" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {showPreview ? (
          /* Preview Mode */
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Story Preview</h2>
              <p className="text-gray-600">This is how your story will appear to readers</p>
            </div>
            <PreviewCard />
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
              >
                Continue Editing
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Title */}
                  <div className="group">
                    <label htmlFor="title" className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Story Title *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter your travel story title"
                      required
                      className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur group-hover:border-gray-300"
                    />
                  </div>

                  {/* Story Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        Location
                      </label>
                      <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Where did you go?"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        Duration
                      </label>
                      <input
                        id="duration"
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g., 7 days"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all duration-300"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="companions" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        Travel Style
                      </label>
                      <select
                        id="companions"
                        value={companions}
                        onChange={(e) => setCompanions(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-500 transition-all duration-300"
                      >
                        <option value="">Select style</option>
                        <option value="solo">Solo</option>
                        <option value="couple">Couple</option>
                        <option value="family">Family</option>
                        <option value="friends">Friends</option>
                        <option value="group">Group</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="group">
                    <label htmlFor="excerpt" className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Story Summary *
                    </label>
                    <textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Write a captivating summary that will make readers want to dive into your story..."
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all duration-300 resize-none bg-white/50 backdrop-blur group-hover:border-gray-300"
                      rows={4}
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      {excerpt.length}/300 characters
                    </div>
                  </div>

                  {/* Category */}
                  <div className="group">
                    <label htmlFor="category" className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Category *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {categories.map((cat) => (
                        <label
                          key={cat.value}
                          className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                            category === cat.value
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                          }`}
                        >
                          <input
                            type="radio"
                            name="category"
                            value={cat.value}
                            checked={category === cat.value}
                            onChange={(e) => setCategory(e.target.value)}
                            className="sr-only"
                          />
                          <div className="text-center">
                            <span className="block text-sm font-semibold text-gray-900">
                              {cat.label}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Featured Image */}
                  <div className="group">
                    <label htmlFor="image" className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Featured Photo URL
                    </label>
                    <div className="relative">
                      <input
                        id="image"
                        type="url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="https://example.com/your-amazing-travel-photo.jpg"
                        className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-500 transition-all duration-300 bg-white/50 backdrop-blur group-hover:border-gray-300 pr-12"
                      />
                      <Upload className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {image && (
                      <div className="mt-4 rounded-xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt="Preview"
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="group">
                    <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-500" />
                      Tags (comma-separated)
                    </label>
                    <input
                      id="tags"
                      type="text"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="adventure, mountains, hiking, photography"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300"
                    />
                  </div>

                  {/* Story Content */}
                  <div className="group">
                    <label htmlFor="content" className="block text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Your Travel Story *
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your incredible journey... What did you see? Who did you meet? What challenges did you overcome? What would you do differently? Paint a picture with your words that transports readers to that moment."
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 resize-none bg-white/50 backdrop-blur group-hover:border-gray-300 font-mono text-sm leading-relaxed"
                      rows={18}
                    />
                    <div className="text-sm text-gray-500 mt-2">
                      {content.length} characters
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
                    <button
                      type="submit"
                      onClick={() => setIsDraft(false)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Publish Story
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        setIsDraft(true)
                        handleSubmit(e as any)
                      }}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Quick Preview */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    👁️ Quick Preview
                  </h3>
                  <div className="scale-75 origin-top">
                    <PreviewCard />
                  </div>
                </div>

                {/* Writing Tips */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    ✨ Writing Tips
                  </h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      Start with a hook that captures attention
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                      Use vivid descriptions to paint the scene
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      Share personal insights and lessons learned
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                      Include practical tips for fellow travelers
                    </li>
                  </ul>
                </div>

                {/* Quick Stats */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Story Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Title length:</span>
                      <span className="font-semibold">{title.length}/60</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Summary length:</span>
                      <span className="font-semibold">{excerpt.length}/300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Story length:</span>
                      <span className="font-semibold">{content.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Est. read time:</span>
                      <span className="font-semibold">{Math.max(1, Math.ceil((content?.split(' ').length || 0) / 200))} min</span>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">✅ Progress</h3>
                  <div className="space-y-2">
                    {[
                      { field: 'title', label: 'Title', done: title.length > 0 },
                      { field: 'excerpt', label: 'Summary', done: excerpt.length > 0 },
                      { field: 'category', label: 'Category', done: category.length > 0 },
                      { field: 'content', label: 'Story', done: content.length > 100 },
                    ].map((item) => (
                      <div key={item.field} className={`flex items-center gap-2 text-sm ${item.done ? 'text-green-600' : 'text-gray-400'}`}>
                        <div className={`w-2 h-2 rounded-full ${item.done ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}