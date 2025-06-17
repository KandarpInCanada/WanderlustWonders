import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CreatePostPage from "./pages/CreatePostPage"
import "./index.css"
import AllPostPage from "./pages/AllPostPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all-blogs" element={<AllPostPage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
