import { lazy } from 'react'

// Lazy load components for better performance
export const LazyContentModal = lazy(() => 
  import('@/components/content/content-detail-modal').then(module => ({
    default: module.ContentDetailModal
  }))
)

export const LazyVersionHistory = lazy(() =>
  import('@/components/content/version-history').then(module => ({
    default: module.VersionHistory
  }))
)

// Image optimization utility
export function optimizeImageUrl(url: string, width?: number, height?: number): string {
  if (!url) return ''
  
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', '80') // Quality
  
  return `${url}?${params.toString()}`
}

// Memoization helper
export function createMemoizedSelector<T, R>(
  selector: (state: T) => R
): (state: T) => R {
  let lastState: T
  let lastResult: R
  
  return (state: T): R => {
    if (state !== lastState) {
      lastState = state
      lastResult = selector(state)
    }
    return lastResult
  }
}
