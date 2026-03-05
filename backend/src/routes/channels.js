import { Router } from 'express'
import Channel from '../models/Channel.js'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/channels — list all channels
router.get('/', async (req, res) => {
  const channels = await Channel.find().populate('createdBy', 'name email').sort({ createdAt: -1 })
  res.json(channels)
})

// POST /api/channels — create a channel (auth required)
router.post('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findOne({ oktaId: req.user.id })
    const channel = await Channel.create({ ...req.body, createdBy: user._id })
    res.status(201).json(channel)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/channels/:id
router.get('/:id', async (req, res) => {
  const channel = await Channel.findById(req.params.id).populate('createdBy', 'name email')
  if (!channel) return res.status(404).json({ error: 'Channel not found' })
  res.json(channel)
})

export default router
