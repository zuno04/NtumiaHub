"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react"
import { applyTheme } from "@/lib/theme-utils"

function ThemeSync() {
  useEffect(() => {
    const updateDataTheme = () => {
      const theme = localStorage.getItem('theme') || 'brand'
      applyTheme(theme)
    }

    // Initial update
    updateDataTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', updateDataTheme)

    // Listen for storage changes (theme changes in other tabs)
    window.addEventListener('storage', updateDataTheme)

    return () => {
      mediaQuery.removeEventListener('change', updateDataTheme)
      window.removeEventListener('storage', updateDataTheme)
    }
  }, [])

  return null
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  )
}
