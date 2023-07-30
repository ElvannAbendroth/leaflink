import startDb from '@/lib/db'
import { Link, Social } from '@/lib/types'
import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcrypt'
import { userRegisterSchema } from '@/lib/validation'
import { z } from 'zod'

interface NewUserRequest {
  username: string
  email: string
  password: string
}

interface NewUserResponse {
  id: string
  username: string
  email: string
  imageUrl?: string
  links: Link[]
  socials: Social
}

type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>

export async function GET(req: Request) {
  try {
    await startDb()
    const users = await User.find({})
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

// Creating or registering a new user
export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const body = (await req.json()) as NewUserRequest
    const { username, email, password } = body
    userRegisterSchema.parse({ username, email, password })

    await startDb()

    // Check if username or email are already associated to an account
    const existingUser = await User.findOne({
      $or: [{ username: new RegExp(username, 'i') }, { email: email }],
    })

    if (existingUser)
      return NextResponse.json({ error: 'There already is a user with that username or email!' }, { status: 422 })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await new User({ ...body, password: hashedPassword })

    return NextResponse.json(await newUser.save())
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(error.issues[0].message)
      return NextResponse.json({ error: `${errorMessage}` }, { status: 422 })
    }
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}
