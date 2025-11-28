"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
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

        if (isAuthenticated && publicRoutes.includes(pathname)) {
            if (user?.role === 'admin') {
                router.push('/admin')
            } else {
                router.push('/dashboard')
            }
            return
        }
    }, [isAuthenticated, pathname, router, user, isHydrated])

    // Show loading state while hydrating
    if (!isHydrated) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return <>{children}</>
}
