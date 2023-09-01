import startDb from '@/lib/db'
import { NextResponse } from 'next/server'
import User from '@/models/userModel'
//import Link from '@/models/linkModel'
import { getSessionUser } from '@/lib/data.server'
import Click from '@/models/clickModel'
import mongoose from 'mongoose'
import Link from '@/models/linkModel'

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
  const sessionUser = await getSessionUser()

  if (!sessionUser) {
    return NextResponse.json({ error: 'Please login in order to see data.' }, { status: 401 })
  }

  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  const userIdObject = userId ? new mongoose.Types.ObjectId(userId) : ''

  if (sessionUser.id != userIdObject && sessionUser.email != 'shanna@gmail.com') {
    return NextResponse.json({ error: 'Your are not authorized to access this data.' }, { status: 401 })
  }

  try {
    await startDb()
    const linkIds = await Link.find({ user: userIdObject }).then(links =>
      links.map(l => new mongoose.Types.ObjectId(l.id))
    )
    let clicks = await Click.aggregate([
      { $match: { link: { $in: linkIds } } },
      {
        $group: {
          _id: '$link',
          count: {
            $sum: 1,
          },
        },
      },
    ])

    clicks.map(click => {
      click.linkId = click._id
      delete click._id
    })
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
