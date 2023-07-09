import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <h1 className="typo-h1">Welcome to Leaflink!</h1>
      <p className="typo-p text-muted">
        A Linktree clone to help you display all your social media links in one single convenient page.
      </p>
      <h2 className="typo-h2">Pages</h2>
      <ul className="typo-ul">
        <li className="typo-li">
          <Link className="typo-a" href="/register">
            Register
          </Link>
        </li>
        <li className="typo-li">
          <Link className="typo-a" href="/login">
            Login
          </Link>
        </li>
        <li className="typo-li">
          <Link className="typo-a" href="/dashboard">
            Page Manager
          </Link>
        </li>
        <li className="typo-li">
          <Link className="typo-a" href="/dashboard">
            Profile Settings
          </Link>
        </li>
        <li className="typo-li">
          <Link className="typo-a" href="/user">
            Public Page
          </Link>
        </li>
      </ul>
    </main>
  )
}
