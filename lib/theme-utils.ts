export const CUSTOM_THEMES = ['brand', 'ocean', 'sunset', 'high-contrast'] as const
export const BASE_THEMES = ['light', 'dark', 'system'] as const
export const ALL_THEMES = [...BASE_THEMES, ...CUSTOM_THEMES] as const

export type CustomTheme = typeof CUSTOM_THEMES[number]
export type BaseTheme = typeof BASE_THEMES[number]
export type Theme = typeof ALL_THEMES[number]

export function isCustomTheme(theme: string): theme is CustomTheme {
  return CUSTOM_THEMES.includes(theme as CustomTheme)
}

export function applyTheme(theme: string) {
  if (typeof window === 'undefined') return
  
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  let resolvedTheme = theme
  
  if (theme === 'system') {
    resolvedTheme = systemTheme
  }
  
  // Handle custom themes
  if (isCustomTheme(theme)) {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }
}

export function getThemeDisplayName(theme: string): string {
  const names: Record<string, string> = {
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
    brand: 'NtumiaHub (Défaut)',
    ocean: 'Océan',
    sunset: 'Coucher de soleil',
    'high-contrast': 'Contraste Élevé'
  }
  
  return names[theme] || theme
}