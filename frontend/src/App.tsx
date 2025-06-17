import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import CreatePostPage from "./pages/CreatePostPage"
import BlogPostPage from "./pages/BlogPostPage"
import "./index.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
