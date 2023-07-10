import { Icons } from '@/components/Icons'
import { RegisterForm } from '@/components/RegisterForm'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="">
      <h1 className="typo-h1">Create your account</h1>
      <p className="typo-p text-muted">Choose your Leaflink username. You can always change it later.</p>

      <div className="mt-14 flex flex-col text-center justify-center">
        <Button className="bg-google hover:bg-google-hover">
          <Icons.google size={20} />
          Create Account with Google
        </Button>
        <p className="typo-p text-muted">or</p>
        <RegisterForm />
        <p className="typo-p text-muted">
          Already have an account?{' '}
          <Link className="typo-a" href="/login">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
