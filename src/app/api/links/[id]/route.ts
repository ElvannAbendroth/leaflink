import { NextResponse } from 'next/server'
import Link from '@/models/linkModel'
import startDb from '@/lib/db'
import { getSessionUser } from '@/lib/data.server'

export interface PatchLinkRequest {
  title?: string
  href?: string
  isActive?: boolean
  isArchived?: boolean
}

interface PatchLinkResponse {
  title: string
  href: string
  isActive: boolean
  id: string
}

export interface GetLinkResponse {
  user: { username?: string; id: string; email?: string }
  title: string
  href: string
  isActive: boolean
  isArchived: boolean
  id: string
}

type PatchResponse = NextResponse<{ link?: PatchLinkResponse; error?: string }>

type DeleteResponse = NextResponse<{ message?: string; error?: string }>

export const GET = async (req: Request, { params }: any) => {
  try {
    await startDb()
    const link = await Link.findById(params.id).populate('user', { username: 1 })

    if (!link) throw new Error("This link ID doesn't exist")

    return NextResponse.json(link)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export const PATCH = async (req: Request, { params }: any): Promise<PatchResponse> => {
  try {
    const sessionUser = await getSessionUser()
    // Validates the session user
    if (!sessionUser) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    let body = (await req.json()) as PatchLinkRequest

    await startDb()

    const payload = { ...body }

    let link = await Link.findByIdAndUpdate(params.id, { $set: payload }, { returnDocument: 'after' })

    if (link === null) {
      return NextResponse.json({ error: "This link ID doesn't exist" }, { status: 404 })
    }

    if (link.user != sessionUser.id) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    return NextResponse.json({
      message: 'Link was successfully updated!',
      link: link,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}

export const DELETE = async (req: Request, { params }: any): Promise<DeleteResponse> => {
  try {
    const sessionUser = await getSessionUser()

    // Validates the session user
    if (!sessionUser) {
      return NextResponse.json({ message: 'You are not authorized to perform this action' }, { status: 403 })
    }

    await startDb()
    // Ensures that a the user doesn't change their username to an existing username
    const linkToDelete = await Link.findByIdAndDelete(params.id)

    if (linkToDelete === null) {
      return NextResponse.json({
        message: `Couldn't found this link ID`,
      })
    }

    return NextResponse.json({
      message: `Your link was deleted.`,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
