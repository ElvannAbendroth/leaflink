'use client'
import { Link as LinkType } from '@/lib/types'
import { useContext } from 'react'
import { UserContext } from '@/components/UserProvider'

export default function TestPage() {
  const { user } = useContext(UserContext)

  if (!user) return null
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <h1 className="typo-h2">Welcome to the test page!</h1>
        <p>Data returned from Mongo</p>
        <code className="typo-pre w-full">{JSON.stringify(user, null, 2)}</code>
        <p>Logged In user: {user.username}</p>
        <ul className="typo-ul">
          {user.links.map((link: LinkType) => {
            return (
              <li key={link.title} className="typo-li">
                <p>Title: {link.title}</p>
                <p>URL: {link.href}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
