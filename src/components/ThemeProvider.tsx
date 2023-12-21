'use client'
import { ThemeValue } from '@/lib/types'
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type ThemeContext = {
  theme: ThemeValue
  // toggleTheme: (themeValue: ThemeValue) => void
  setTheme: Dispatch<SetStateAction<ThemeValue>>
}

export const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  // toggleTheme: () => {},
  setTheme: () => {},
})

interface ThemeProviderProps {
  children: ReactNode
  initialThemeValue?: ThemeValue
}

export const ThemeProvider = ({ children, initialThemeValue }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeValue>('light')

  const toggleTheme = (themeValue: ThemeValue) => {
    setTheme(themeValue)
    //window.localStorage.setItem('theme', newTheme)
  }

  const restoreTheme = () => {
    const userTheme = (window.localStorage.getItem('theme') as ThemeValue) || 'light'
    setTheme(userTheme)
  }

  useEffect(() => {
    //restoreTheme()
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
