const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for posts
let posts = [];

// Create a new post
app.post('/api/posts', (req, res) => {
  const postData = req.body;
  
  const newPost = {
    id: uuidv4(),
    title: postData.title,
    excerpt: postData.excerpt,
    content: postData.content,
    category: postData.category,
    image: postData.image,
    location: postData.location,
    duration: postData.duration,
    companions: postData.companions,
    tags: postData.tags || [],
    isDraft: postData.isDraft || false,
    createdAt: postData.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json({
    message: `Post ${newPost.isDraft ? 'saved as draft' : 'published'} successfully`,
    post: newPost
  });
});

// Get all posts
app.get('/api/posts', (req, res) => {
  const { isDraft, category } = req.query;
  let filteredPosts = posts;

  if (isDraft !== undefined) {
    filteredPosts = filteredPosts.filter(post => post.isDraft === (isDraft === 'true'));
  }

  if (category) {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }

  res.json(filteredPosts);
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const updatedPost = {
    ...posts[postIndex],
    ...req.body,
    id: posts[postIndex].id, // Prevent ID change
    updatedAt: new Date().toISOString()
  };

  posts[postIndex] = updatedPost;
  res.json({
    message: `Post ${updatedPost.isDraft ? 'saved as draft' : 'published'} successfully`,
    post: updatedPost
  });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === req.params.id);
  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts.splice(postIndex, 1);
  res.json({ message: 'Post deleted successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});