import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Image from 'next/image'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className=" min-h-full">
        <Navbar showNav={false} />
        <main className="max-w-content mx-auto pt-36 pb-12 px-8">{children}</main>
      </div>
      <Footer />
    </>
  )
}
