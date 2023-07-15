import '@/styles/globals.css'
import { Lato } from 'next/font/google'
import { siteConfig } from '@/lib/config'
import { Navbar } from '@/components/Navbar'
import AuthProvider from '@/components/AuthProvider'
import { getServerSession } from 'next-auth/next'
import { options } from '@/lib/auth'

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
    <AuthProvider session={session}>
      <html lang="en" className="scroll-smooth">
        <body className={`${lato.className}`}>
          <Navbar />
          <main className="max-w-content mx-auto pt-36 pb-12 px-8">{children}</main>
        </body>
      </html>
    </AuthProvider>
  )
}
