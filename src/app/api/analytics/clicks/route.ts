import startDb from '@/lib/db'
import { NextResponse } from 'next/server'
import User from '@/models/userModel'
//import Link from '@/models/linkModel'
import { getSessionUser } from '@/lib/data.server'
import Click from '@/models/clickModel'

export interface PostClickRequest {
  linkId: string
  loggedUser?: string
}

export interface PostClickResponse {
  timestamp: Date
  linkId: string
  loggedUserId?: string
  id: string
}

export interface GetClickResponse {
  timestamp: Date
  linkId: string
  loggedUserId?: string
  id: string
  link: { user: string }
}

type NewResponse = NextResponse<{ click?: PostClickResponse; error?: string }>

export const GET = async (req: Request) => {
  try {
    await startDb()
    const clicks = await Click.find({}).populate('link', { user: 1 }).populate('loggedUser', { id: 1, email: 1 })
    return NextResponse.json(clicks)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const sessionUser = await getSessionUser()
    const body = (await req.json()) as PostClickRequest
    if (sessionUser) {
      body.loggedUser = sessionUser.id
    }
    await startDb()

    const newLink = await new Click({ ...body, timestamp: new Date() })
    return NextResponse.json(await newLink.save())
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}
