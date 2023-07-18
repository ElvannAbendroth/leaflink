import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import startDb from '@/lib/db'
import { getSessionUser } from '@/lib/data.server'

export async function GET(req: Request, { params }: any) {
  try {
    await startDb()
    const user = await User.findById(params.id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export async function PUT(req: Request, { params }: any) {
  try {
    const sessionUser = await getSessionUser()

    // Validates the session user
    if (!sessionUser || params.id !== sessionUser.id) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    const body = await req.json()
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
