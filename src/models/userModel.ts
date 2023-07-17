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
    },
  ],
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

// Hash the password before saving
userSchema.pre('save', async function (this: UserDocument, next) {
  let password = this.password
  if (!password) throw new Error('The password is not defined')
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    password = hashedPassword
  } catch (error) {
    throw error
  }
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
