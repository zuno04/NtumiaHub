'use client'

import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('ntumia-favorites')
    if (stored) {
      setFavorites(JSON.parse(stored))
    }
  }, [])

  const toggleFavorite = (contentId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(contentId)
        ? prev.filter(id => id !== contentId)
        : [...prev, contentId]
      
      localStorage.setItem('ntumia-favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (contentId: string) => favorites.includes(contentId)

  return { favorites, toggleFavorite, isFavorite }
}
