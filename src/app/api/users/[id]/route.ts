import { NextResponse } from 'next/server'

import db from '@/lib/db'
import User from '@/models/userModel'
import { UserDocument } from '@/lib/types'
import startDb from '@/lib/db'
import { getServerSession } from 'next-auth'
import { options } from '@/lib/auth'

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
  console.log('🤘🤘🤘🤘')
  try {
    const session = await getServerSession(options)
    const body = await req.json()
    console.log('Session: ' + JSON.stringify(session))
    console.log('Body: ' + JSON.stringify(body))

    // Validates the session user
    const sessionUser = session?.user as UserDocument
    if (!session?.user || params.id !== sessionUser.id) {
      return new Response(null, { status: 403 })
    }

    await startDb()
    const user = await User.findById(params.id)

    if (user === null) {
      return NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })
    }

    // Create a new links array by spreading the existing links and adding the body content
    const updatedLinks = [...user.links, { ...body }]

    // Update the user document with the new links array
    user.links = updatedLinks
    await user.save()

    return NextResponse.json({
      message: `User with username '${user.username}' at id ${user.id} was successfully updated!`,
    })
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}

// export async function PUT(req: Request, { params }: any) {
//   console.log('🤘🤘🤘🤘')
//   try {
//     const session = await getServerSession(options)
//     const body = await req.json()
//     console.log('Session: ' + JSON.stringify(session))
//     console.log('Body: ' + JSON.stringify(body))

//     // Validates the session user
//     const sessionUser = session?.user as UserDocument
//     if (!session?.user || params.id !== sessionUser.id) {
//       return new Response(null, { status: 403 })
//     }

//     //{ links: [{ title: 'hello', href: 'http', isActive: true }] }

//     const payload = {
//       links: { ...body },
//     }

//     await startDb()
//     const user = await User.findByIdAndUpdate(params.id, payload, { new: true })

//     if (user === null) return NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })

//     return NextResponse.json({
//       message: `User with username '${user.username}' at id ${user.id} was successfully updated!`,
//     })
//   } catch (error) {
//     return NextResponse.json({ message: `${error}` })
//   }
// }

// export async function DELETE(req, { params }) {
//   try {
//     await db()

//     const user = await User.findByIdAndDelete(params.id)

//     return user === null
//       ? NextResponse.json({ message: "This user ID doesn't exist" }, { status: 404 })
//       : NextResponse.json({
//           message: `User with username '${user.username}' at id ${user.id} was successfully deleted!`,
//         })
//   } catch (error) {
//     return NextResponse.json({ message: `${error}` })
//   }
// }
