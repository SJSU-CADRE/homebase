import { Router } from 'express'
import User from '../models/User.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// POST /api/users/sync — upsert user on first login
router.post('/sync', requireAuth, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { oktaId: req.user.id },
      { email: req.user.email, ...req.body },
      { upsert: true, new: true }
    )
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/users/me
router.get('/me', requireAuth, async (req, res) => {
  const user = await User.findOne({ oktaId: req.user.id })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

export default router
