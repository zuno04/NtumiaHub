"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export default function AuthGuard({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'admin' | 'editor' | 'viewer' }) {
    const { isAuthenticated, user } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()
    const [isHydrated, setIsHydrated] = useState(false)

    useEffect(() => {
        // Wait for Zustand to hydrate from localStorage
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (!isHydrated) return

        const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password']
        const requiresAuth = !publicRoutes.includes(pathname)

        if (!isAuthenticated && requiresAuth) {
            router.push('/')
            return
        }

        if (isAuthenticated) {
            if (publicRoutes.includes(pathname)) {
                if (user?.role === 'admin') {
                    router.push('/admin')
                } else {
                    router.push('/dashboard')
                }
                return
            }

            // Role check
            if (requiredRole && user?.role !== requiredRole) {
                router.push('/dashboard')
                return
            }
        }
    }, [isAuthenticated, pathname, router, user, isHydrated, requiredRole])

    // Show loading state while hydrating
    if (!isHydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    const publicRoutes = ['/', '/login', '/signup', '/forgot-password', '/reset-password']
    const requiresAuth = !publicRoutes.includes(pathname)

    // Prevent rendering if not authenticated on protected route
    if (!isAuthenticated && requiresAuth) {
        return null
    }

    // Prevent rendering if authenticated on public route (will redirect)
    if (isAuthenticated && publicRoutes.includes(pathname)) {
        return null
    }

    // Prevent rendering if role mismatch
    if (isAuthenticated && requiredRole && user?.role !== requiredRole) {
        return null
    }

    return <>{children}</>
}
