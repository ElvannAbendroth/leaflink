import { FC } from 'react'
import { Icons } from './Icons'
import { siteConfig } from '@/lib/config'

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className=" flex justify-between max-w-layout mx-auto py-8 px-8 gap-4">
      {/* <div className="text-sm text-center text-muted/80 font-semibold">
        Copyright 2023{' '}
        <a
          className="underline underline-offset-4 decoration-2 decoration-muted/30 hover:text-muted/60"
          target="blank"
          href={siteConfig.author.href}
        >
          {siteConfig.author.name}
        </a>
      </div>
      <div className="flex gap-4 ">
        {siteConfig.links.github && (
          <a target="blank" href={siteConfig.links.github}>
            <Icons.gitHub className="text-muted/80 hover:text-muted" size={20} />
          </a>
        )}
        {siteConfig.links.twitter && (
          <a target="blank" href={siteConfig.links.twitter}>
            <Icons.twitter className="text-muted/80 hover:text-muted" size={20} />
          </a>
        )}
        {siteConfig.links.behance && (
          <a target="blank" href={siteConfig.links.behance}>
            <Icons.behance className="text-muted/80 hover:text-muted" size={20} />
          </a>
        )}
      </div>
      <div className="text-sm text-center text-muted/80 font-semibold">Built with NextJS</div> */}
    </footer>
  )
}
