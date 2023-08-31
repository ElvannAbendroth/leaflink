import { models, model, Schema } from 'mongoose'
const mongoose = require('mongoose')

export interface LinkDocument extends Document {
  user: string
  title: string
  href: string
  isActive: boolean
  id: string
}

interface Methods {}

const linkSchema = new Schema<LinkDocument, {}, Methods>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
  },
})

linkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Link = models.Link || model('Link', linkSchema)

export default Link
