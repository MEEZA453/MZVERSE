'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface ThemeContextType {
  isLightMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isLightMode, setIsLightMode] = useState(true) // default dark

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('isLightMode')
    if (saved) setIsLightMode(saved === 'true')
  }, [])

  // Apply theme to html
  useEffect(() => {
    const html = document.documentElement
    if (isLightMode) {
      html.classList.remove('dark')
      html.style.colorScheme = 'light'
    } else {
      html.classList.add('dark')
      html.style.colorScheme = 'dark'
    }

    localStorage.setItem('isLightMode', isLightMode.toString())
  }, [isLightMode])

  const toggleTheme = () => setIsLightMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeProvider')
  return context
}
