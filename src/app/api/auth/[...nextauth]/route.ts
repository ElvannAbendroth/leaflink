import NextAuth from "next-auth"
import {NextAuthOptions} from "next-auth"
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import { userCredentials } from "@/lib/data"

export const options : NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "your-cool-username"

        },
        password: {
          label: "password",
          type: "password",
          placeholder: "salainen"

        }
      },
      async authorize(credentials) {
       // This is whe you need to retrieve user data
       // to verify with credentials  
       // Docs: http://next-auth.js.org/configureation/providers/credentials
      const user = userCredentials

      return credentials?.username === user.username && credentials?.password === user.password ? user : null

    }}
    ),
  ],
}

const handler = NextAuth(options)

export {handler as GET, handler as POST}