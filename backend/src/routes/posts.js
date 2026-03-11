import { Router } from 'express'
import Post from '../models/Post.js'
import Channel from '../models/Channel.js'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/posts?channel=:channelId&channelName=:name&featured=true
router.get('/', async (req, res) => {
  const filter = {}
  if (req.query.channel) filter.channel = req.query.channel
  if (req.query.featured === 'true') filter.featured = true
  if (req.query.channelName) {
    const channel = await Channel.findOne({ name: req.query.channelName })
    if (!channel) return res.json([])
    filter.channel = channel._id
  }
  const posts = await Post.find(filter)
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
  res.json(posts)
})

// POST /api/posts — create a post (auth required)
// Accepts channelName in body to resolve channel automatically
router.post('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ oktaId: req.user.id })
    const { channelName, ...rest } = req.body
    if (channelName && !rest.channel) {
      const channel = await Channel.findOne({ name: channelName })
      if (!channel) return res.status(404).json({ error: 'Channel not found' })
      rest.channel = channel._id
    }
    const post = await Post.create({ ...rest, author: user._id })
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/posts/:id — update a post (auth required)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/posts/:id — delete a post (auth required)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })
    res.json({ success: true })
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
