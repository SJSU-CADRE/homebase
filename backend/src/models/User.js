import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  oktaId:    { type: String, required: true, unique: true },
  email:     { type: String, required: true },
  name:      { type: String },
  role:      { type: String, enum: ['sjsu', 'cadre', 'admin'], default: 'sjsu' },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.model('User', userSchema)
