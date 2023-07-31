import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import startDb from '@/lib/db'
import { getSessionUser } from '@/lib/data.server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

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

    let body = await req.json()

    //If a new password is in the body, encrypt it.
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassword
    }
    await startDb()
    // Ensures that a the user doesn't change their username to an existing username
    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${body.username}$`, 'i') } })

    if (existingUser && existingUser.id != sessionUser.id) {
      return NextResponse.json(
        { message: 'This username is already in use.  Please choose a different username!' },
        { status: 422 }
      )
    }

    const payload = { ...body }

    let user = await User.findByIdAndUpdate(params.id, { $set: payload }, { returnDocument: 'after' })

    if (user === null) {
      return NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })
    }

    return NextResponse.json({
      message: `User with username '${user.username}' at id ${user.id} was successfully updated!`,
      user: user,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(error.issues[0].message)
      return NextResponse.json({ error: `${errorMessage}` }, { status: 422 })
    }
    return NextResponse.json({ message: `${error}` })
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const sessionUser = await getSessionUser()

    // Validates the session user
    if (!sessionUser || params.id !== sessionUser.id) {
      return NextResponse.json({ error: 'You are not authorized to perform this action' }, { status: 403 })
    }

    await startDb()
    // Ensures that a the user doesn't change their username to an existing username
    const userToDelete = await User.findByIdAndDelete(params.id)
    console.log(userToDelete)

    return NextResponse.json({
      message: `Your account was deleted.`,
    })
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}
