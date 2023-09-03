'use client'
import { ReactNode, useContext } from 'react'
import { ThemeContext, useTheme } from './ThemeProvider'

interface ThemedHtmlProps {
  children: ReactNode
}

export default function ThemedHtml({ children }: ThemedHtmlProps) {
  const { theme } = useTheme()

  return (
    <html lang="en" className={`scroll-smooth`} data-theme={theme}>
      {children}
    </html>
  )
}
