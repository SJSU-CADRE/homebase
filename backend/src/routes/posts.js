import { Router } from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/posts?channel=:channelId
router.get('/', async (req, res) => {
  const filter = req.query.channel ? { channel: req.query.channel } : {}
  const posts = await Post.find(filter)
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
  res.json(posts)
})

// POST /api/posts — create a post (auth required)
router.post('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ oktaId: req.user.id })
    const post = await Post.create({ ...req.body, author: user._id })
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name email')
    .populate('comments.author', 'name email')
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.json(post)
})

// POST /api/posts/:id/comments — add a comment (auth required)
router.post('/:id/comments', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ oktaId: req.user.id })
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    post.comments.push({ author: user._id, body: req.body.body })
    await post.save()
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
