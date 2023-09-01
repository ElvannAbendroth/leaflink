import { models, model, Schema } from 'mongoose'
const mongoose = require('mongoose')

export interface ClickDocument extends Document {
  timestamp: Date
  link: string
  id: string
  loggedUser?: string
  user: string
}

interface Methods {}

const clickSchema = new Schema<ClickDocument, {}, Methods>({
  timestamp: {
    type: Date,
    required: true,
  },
  link: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Link',
    required: true,
  },
  loggedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

clickSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Click = models.Click || model('Click', clickSchema)

export default Click
