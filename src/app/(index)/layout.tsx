import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

import { Toaster } from '@/components/ui/Toaster'

export default async function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`min-h-screen flex flex-col align-middle items-stretch `}>
      <Navbar />
      <div className="flex-grow">
        <main className={`mx-auto pt-12 pb-12 px-4 sm:px-8`}>{children}</main>
      </div>
      <Footer />
      <Toaster />
    </body>
  )
}
