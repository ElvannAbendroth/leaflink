import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar showNav={true} />
      <main className="max-w-content mx-auto pt-36 pb-12 px-8">{children}</main>
      <Footer />
    </>
  )
}
