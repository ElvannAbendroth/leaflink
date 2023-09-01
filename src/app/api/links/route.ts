import startDb from '@/lib/db'
import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import Link from '@/models/linkModel'
import { getSessionUser } from '@/lib/data.server'

export interface PostLinkRequest {
  title: string
  href: string
  isActive?: boolean
}

export interface PostLinkResponse {
  title: string
  href: string
  isActive: boolean
  id: string
}

type NewResponse = NextResponse<{ link?: PostLinkResponse; error?: string }>

export const GET = async (req: Request) => {
  try {
    await startDb()
    const links = await Link.find({}).populate('user', { username: 1 })
    return NextResponse.json(links)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export const POST = async (req: Request): Promise<NewResponse> => {
  try {
    const sessionUser = await getSessionUser()
    // Validates the session user
    if (!sessionUser) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    const body = (await req.json()) as PostLinkRequest
    await startDb()

    const user = await User.findById(sessionUser.id)

    if (!user) {
      throw new Error('User Id is invalid')
    }

    const newLink = await new Link({ ...body, user: user.id })
    return NextResponse.json(await newLink.save())
  } catch (error) {
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}
