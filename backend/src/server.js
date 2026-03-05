import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import channelRoutes from './routes/channels.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 4000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/homebase'

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())

// Routes
app.use('/api/channels', channelRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
