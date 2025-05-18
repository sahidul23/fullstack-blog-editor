const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Save or update draft
router.post('/save-draft', async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blog = await Blog.findOneAndUpdate(
      { title },
      { content, tags, status: 'draft', updated_at: new Date() },
      { upsert: true, new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Publish blog
router.post('/publish', async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const blog = await Blog.findOneAndUpdate(
      { title },
      { content, tags, status: 'published', updated_at: new Date() },
      { upsert: true, new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs
router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

// Get blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ error: 'Blog not found' });
  }
});

module.exports = router;
