import './globals.css'
import { Lato } from 'next/font/google'
import { siteConfig } from '@/lib/config'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

const lato = Lato({ weight: '400', subsets: ['latin'] })

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.href }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${lato.className}`}>{children}</body>
    </html>
  )
}
