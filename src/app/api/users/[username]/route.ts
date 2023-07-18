import { NextResponse } from 'next/server'
import User from '@/models/userModel'
import startDb from '@/lib/db'

export async function GET(req: Request, { params }: any) {
  console.log('🌈username: ', params.username)
  try {
    await startDb()
    const user = await User.findOne({ username: params.username }).exec()
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: `${error}` })
  }
}
