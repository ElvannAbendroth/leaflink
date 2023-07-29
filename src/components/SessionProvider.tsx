'use client'
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface SessionProvider {
  children: ReactNode
  session: any
}

export default function SessionProvider({ children, session }: SessionProvider) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>
}
