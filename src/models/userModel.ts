import { models, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { UserDocument } from '@/lib/types'
const mongoose = require('mongoose')

require('@/models/linkModel')

interface Methods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  username: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
    trim: true,
  },
  description: { type: String, maxLength: 280 },
  name: {
    type: String,
  },
  email: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  website: { type: String },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  theme: { type: String },
  socials: {
    type: Object,
    default: {
      instagram: '',
      facebook: '',
      youtube: '',
      twitter: '',
      github: '',
      website: '',
    },
  },
})

//Compare Password Method
userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

userSchema.virtual('links', {
  ref: 'Link',
  localField: '_id',
  foreignField: 'user',
})

userSchema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the password should not be revealed
    delete returnedObject.password
  },
})

const User = models.User || model('User', userSchema)

export default User
