import mongoose from 'mongoose'

const channelSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPrivate:   { type: Boolean, default: false },
  inviteCode:  { type: String, unique: true, sparse: true },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mods:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt:   { type: Date, default: Date.now },
})

export default mongoose.model('Channel', channelSchema)
