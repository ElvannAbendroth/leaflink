import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import startDb from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request, { params }: any) {
  try {
    await startDb()
    const user = await User.findById(params.id)
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

export async function PATCH(req: Request, { params }: any) {
  try {
    let body = await req.json()

    await startDb()

    const payload = { ...body }

    let user = await User.findByIdAndUpdate(params.id, { $set: payload }, { returnDocument: 'after' })

    if (user === null) {
      return NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })
    }

    return NextResponse.json({
      message: `Your information was successfully updated!`,
      user: user,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(error.issues[0].message)
      return NextResponse.json({ message: `${errorMessage}` }, { status: 422 })
    }
    return NextResponse.json({ message: `${error}` })
  }
}
