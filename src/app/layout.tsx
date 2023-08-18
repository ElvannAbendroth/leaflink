import '@/styles/globals.css'
import { Lato } from 'next/font/google'
import { siteConfig } from '@/lib/config'
import { Navbar } from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth/next'
import { options } from '@/lib/auth'
import { UserProvider } from '@/components/UserProvider'
import { Toaster } from '@/components/ui/Toaster'
import { RemoveScroll } from 'react-remove-scroll'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.href }],
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options)
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <html lang="en" className={`scroll-smooth`}>
          <body className={`${lato.className}`}>
            <Navbar />
            <main className="max-w-content mx-auto pt-36 pb-12 px-8">{children}</main>
            <Toaster />
          </body>
        </html>
      </UserProvider>
    </SessionProvider>
  )
}
