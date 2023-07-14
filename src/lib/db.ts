import mongoose from "mongoose"

const url = process.env.MONGO_URI as string

if (!url) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local')
  }

let connection: typeof mongoose

const startDb = async () => {
 try {
    if (!connection) connection = await mongoose.connect(url) //prevents multiple connections
    console.log(`🌿 Connected to Mongo: ${url}`)
 } catch (error) {
    throw error

 }
 return connection
}

export default startDb

