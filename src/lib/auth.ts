import { NextAuthOptions, Session } from 'next-auth'
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import startDb from './db'
import User from '@/models/userModel'
import { AdapterUser } from 'next-auth/adapters'
import { makeSafe } from './utils'
import { JWT } from 'next-auth/jwt'
import { UserDocument } from './types'

interface SessionUser extends AdapterUser {
  username: string | null | undefined // Add the username property
  id: string
}

export interface CustomSession extends Session {
  user: UserDocument
}

export const options: NextAuthOptions = {
  session: {
    strategy: 'jwt', //I think this is default
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
        if (!passwordMatch) return null

        return makeSafe(user)
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    session: ({ session, token, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      } as CustomSession
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any

        return {
          ...token,
          ...u,
        }
      }
      return token
    },
  },
}
