import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  body:      { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const postSchema = new mongoose.Schema({
  channel:   { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  author:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true },
  excerpt:   { type: String, default: '' },
  body:      { type: String, default: '' },
  image:     { type: String, default: '' },
  category:  { type: String, default: 'News' },
  variant:   { type: String, enum: ['banner', 'image-left', 'image-right', 'compact', 'text'], default: 'text' },
  featured:  { type: Boolean, default: false },
  comments:  [commentSchema],
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('Post', postSchema)
