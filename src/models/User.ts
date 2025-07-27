// /models/User.ts
import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  emailVerified: Date,
  sessions: Array,
  accounts: Array,
})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)
