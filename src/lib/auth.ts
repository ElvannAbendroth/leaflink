import { NextAuthOptions, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import startDb from './db'
import User from '@/models/userModel'
import { makeSafe } from './utils'
import { User as UserType, UserDocument } from './types'

export interface CustomSession extends Session {
  user: UserDocument | UserType
  token: {}
}

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string }

        await startDb()
        const user = await User.findOne({ email: email })
        if (!user) return null

        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) throw new Error('Invalid password')

        return makeSafe(user)
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    //TODO: Return only necessary user information, or maybe user data should be handled directly from the session??
    session: ({ session, token, user }) => {
      return {
        user: { ...session.user, id: token.id, username: token.username },
        token: token,
      } as CustomSession
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as UserType

        return {
          ...token,
          id: u.id,
          picture: u.imageUrl,
        }
      }
      return token
    },
  },
}
