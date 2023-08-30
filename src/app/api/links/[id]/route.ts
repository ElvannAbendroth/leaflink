import { NextResponse } from 'next/server'
import Link from '@/models/linkModel'
import startDb from '@/lib/db'
import { getSessionUser } from '@/lib/data.server'

interface PatchLinkRequest {
  title?: string
  href?: string
  isActive?: boolean
}

interface PatchLinkResponse {
  title: string
  href: string
  isActive: boolean
  id: string
}

type PatchResponse = NextResponse<{ link?: PatchLinkResponse; error?: string; success?: string }>

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

    if (link.id != sessionUser.id) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    return NextResponse.json({
      success: 'Link was successfully updated!',
      link: link,
    })
  } catch (error) {
    return NextResponse.json({ error: `${error}` })
  }
}
