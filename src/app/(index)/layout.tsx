import { Navbar } from '@/components/Navbar'

import { Toaster } from '@/components/ui/Toaster'

export default async function IndexLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className={`min-h-screen flex flex-col align-middle items-stretch `}>
      <Navbar />
      <div className="flex-grow">
        <main className={`mx-auto pt-12 pb-12 px-4 sm:px-8`}>{children}</main>
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
  )
}
