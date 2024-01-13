import '@/styles/globals.css'
import { Lato } from 'next/font/google'
import { siteConfig } from '@/lib/config'
import { Navbar } from '@/components/Navbar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth/next'
import { options } from '@/lib/auth'
import { UserProvider } from '@/components/UserProvider'
import { Toaster } from '@/components/ui/Toaster'
import { ThemeProvider } from '@/components/ThemeProvider'
import ThemedHtml from '@/components/ThemedHtml'
import { headers } from 'next/headers'

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
  const headersList = headers()
  const path = headersList.get('next-url') || ''
  const isHome = path === '/' || path === ''
  console.log(isHome)

  return (
    <SessionProvider session={session}>
      <UserProvider>
        <ThemeProvider>
          <ThemedHtml>
            <body className={`min-h-screen flex flex-col align-middle items-stretch `}>
              <Navbar />
              <div className="flex-grow">
                <main className={`${isHome ? null : 'max-w-content w-content'} mx-auto pt-12 pb-12 px-4 sm:px-8`}>
                  {children}
                </main>
              </div>
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
          </ThemedHtml>
        </ThemeProvider>
      </UserProvider>
    </SessionProvider>
  )
}
