import { Icons } from '@/components/Icons'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="">
      <h1 className="typo-h1">Create your account</h1>
      <p className="typo-p text-muted">Choose your Leaflink username. You can always change it later.</p>

      <div className="mt-14 flex flex-col text-center justify-center">
        <button className="flex gap-3 bg-google rounded-full p-4 items-center justify-center self-stretch text-google-foreground w-full hover:bg-google-hover">
          <Icons.google size={20} />
          Create Account with Google
        </button>
        <p className="typo-p text-muted">or</p>
        <form action="" className="flex flex-col gap-6">
          <input
            className="bg-input flex gap-3 rounded-full p-4 items-center justify-center self-stretch placeholder:text-muted w-full "
            type="text"
            placeholder="leaf.link/ Username"
          />
          <input
            className="bg-input flex gap-3 rounded-full p-4 items-center justify-center self-stretch placeholder:text-muted w-full "
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-input flex gap-3 rounded-full p-4 items-center justify-center self-stretch placeholder:text-muted w-full "
            type="password"
            placeholder="Password"
          />
          <button className="flex gap-2 bg-primary rounded-full p-4 justify-center self-stretch text-primary-foreground w-full hover:bg-primary-hover">
            Create account
          </button>
        </form>
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
