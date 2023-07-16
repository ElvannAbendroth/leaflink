// import mongoose from "mongoose"

// const url = process.env.MONGO_URI as string

// if (!url) {
//     throw new Error('Please define the MONGO_URI environment variable inside .env.local')
//   }

// let connection: typeof mongoose

// const startDb = async () => {
//  try {
//     if (!connection) connection = await mongoose.connect(url) //prevents multiple connections
//     console.log(`🌿 Connected to Mongo: ${url}`)
//  } catch (error) {
//     throw error

//  }
//  return connection
// }

// export default startDb

import mongoose, { Mongoose } from 'mongoose'

const MONGO_URI = process.env.MONGO_URI as string

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

interface GlobalWithMongoose extends Global {
  mongoose: {
    conn: Mongoose | null
    promise: Promise<any> | null
  }
}

const globalWithMongoose = global as unknown as GlobalWithMongoose

let cached = globalWithMongoose?.mongoose

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null }
}

async function startDb() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
      console.log(`🌿 Connected to Mongo: ${MONGO_URI}`)
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default startDb
