/* eslint-disable react/no-unescaped-entities */
'use client'
import { Button } from '@/components/ui/Button'
import { motion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'

export default function StylePage() {
  return (
    <div className="flex flex-col w-full gap-12">
      <div>
        <h1 className="typo-h1">Style Guide</h1>
        <p className="typo-p text-muted">Here's the Style guides for Leaflink's Brand</p>

        <h2 className="typo-h2 mt-6">Typography</h2>

        <div className="flex flex-col gap-12">
          <div>
            <p className="typo-h1 mb-2 text-muted/60">Title</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-title mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>
          <div>
            <p className="typo-h1 mb-2 text-muted/60">H1</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-h1 mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>

          <div>
            <p className="typo-h1 mb-2 text-muted/60">H2</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-h2 mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>
          <div>
            <p className="typo-h1 mb-2 text-muted/60">H3</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-h3 mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>
          <div>
            <p className="typo-h1 mb-2 text-muted/60">H4</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-h4 mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>

          <div>
            <p className="typo-h1 mb-2 text-muted/60">P</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-p mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
            <hr />
          </div>
          <div>
            <p className="typo-h1 mb-2 text-muted/60">SMALL</p>
            <p className="typo-p text-muted">Regular | Light | Semibold | Bold | Extrabold</p>
            <p className="typo-small mb-3">The Quick Brown Fox Jumps Over The Lazy Dog</p>
            <p className="typo-p text-muted">Lato | 16px</p>
          </div>
        </div>
        <h2 className="typo-h2 mt-6">Button Elements</h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-6 flex-wrap">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-row gap-6 flex-wrap">
            <Button variant="default" size="sm">
              Default
            </Button>
            <Button variant="primary" size="sm">
              Primary
            </Button>
            <Button variant="danger" size="sm">
              Danger
            </Button>
            <Button variant="outline" size="sm">
              Outline
            </Button>
            <Button variant="subtle" size="sm">
              Subtle
            </Button>
            <Button variant="ghost" size="sm">
              Ghost
            </Button>
            <Button variant="link" size="sm">
              Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
