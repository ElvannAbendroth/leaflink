import { Icons } from '@/components/Icons'
import { LoginForm } from '@/components/LoginForm'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="">
      <h1 className="typo-h1">Log in to your Leaflink</h1>
      <p className="typo-p text-muted">
        Login with your username and password, or use google to manage your page settings.
      </p>

      <div className="mt-14 flex flex-col text-center justify-center">
        <Button className="bg-google hover:bg-google-hover">
          <Icons.google size={20} />
          Log in with Google
        </Button>

        <p className="typo-p text-muted">or</p>
        <LoginForm />
        <p className="typo-p text-muted">
          {`Don't have an account yet? `}
          <Link className="typo-a" href="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
