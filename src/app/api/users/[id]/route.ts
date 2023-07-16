import { NextResponse } from 'next/server'

import db from '@/lib/db'
import User from '@/models/userModel'
import { UserDocument } from '@/lib/types'
import startDb from '@/lib/db'
import { getServerSession } from 'next-auth'
import { CustomSession, options } from '@/lib/auth'

export async function GET(req: Request, { params }: any) {
  try {
    await db()
    const user = await User.findById(params.id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const session = (await getServerSession(options)) as CustomSession
    const body = await req.json()
    // console.log('Session: ' + JSON.stringify(session))
    // console.log('Body: ' + JSON.stringify(body))

    // Validates the session user
    const sessionUser = session?.user
    if (!session?.user || params.id !== session?.user.id) {
      return new Response(null, { status: 403 })
    }

    const payload = { ...body }

    await startDb()
    let user = await User.findByIdAndUpdate(params.id, { $set: payload }, { returnDocument: 'after' })

    if (user === null) {
      return NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })
    }

    return NextResponse.json({
      message: `User with username '${user.username}' at id ${user.id} was successfully updated!`,
      user: user,
    })
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}
