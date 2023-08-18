import '@/styles/globals.css'
import { Lato } from 'next/font/google'
import { siteConfig } from '@/lib/config'
import { Navbar } from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth/next'
import { options } from '@/lib/auth'
import { UserProvider } from '@/components/UserProvider'
import { Toaster } from '@/components/ui/Toaster'

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
            <main className="max-w-content mx-auto pt-36 pb-12 px-4 sm:px-8">{children}</main>
            <footer className="p-8 pb-10 ">
              <p className="typo-p text-sm text-center text-muted">
                Webapp created with NextJS 13, Tailwind & MongoDB by Oodri. Checkout the project on{' '}
                <a className="typo-a" href="https://github.com/ElvannAbendroth/leaflink" target="_blank">
                  Github
                </a>
              </p>
            </footer>
            <Toaster />
          </body>
        </html>
      </UserProvider>
    </SessionProvider>
  )
}
