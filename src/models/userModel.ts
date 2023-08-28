import { models, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { UserDocument } from '@/lib/types'

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
  description: { type: String },
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
  links: [
    {
      title: {
        type: String,
      },
      href: {
        type: String,
      },
      isActive: {
        type: Boolean,
      },
      clicks: [Date],
    },
  ],
  visits: { type: [Date] },
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

userSchema.set('toJSON', {
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
