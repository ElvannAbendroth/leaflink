import { loggedUser } from '@/lib/data'
import { redirect } from 'next/navigation'

export default function Home() {
  if (loggedUser) {
    redirect('/dashboard')
  } else return redirect('/login')
}
