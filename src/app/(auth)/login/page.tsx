import { Icons } from '@/components/Icons'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="">
      <h1 className="typo-h1">Log in to your Leaflink</h1>
      <p className="typo-p text-muted">
        Login with your username and password, or use google to manage your page settings.
      </p>

      <div className="mt-14 flex flex-col text-center justify-center">
        <button className="flex gap-3 bg-google rounded-full py-4 px-8 items-center justify-center self-stretch text-google-foreground w-full hover:bg-google-hover">
          <Icons.google size={20} />
          Log in with Google
        </button>
        <p className="typo-p text-muted">or</p>
        <form action="" className="flex flex-col gap-6">
          <input
            className="bg-input flex gap-3 rounded-full p-4 py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary "
            type="text"
            placeholder="leaf.link/ Username"
          />
          <input
            className="bg-input flex gap-3 rounded-full py-4 px-8 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
            type="password"
            placeholder="Password"
          />
          <button className="flex gap-2 bg-primary rounded-full py-4 px-8 justify-center self-stretch text-primary-foreground w-full hover:bg-primary-hover ">
            Log in
          </button>
        </form>
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
