"use client"

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/store'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuthStore()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const publicRoutes = ['/', '/login', '/signup', '/forgot-password']

        if (!isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push('/')
        }

        if (isAuthenticated && publicRoutes.includes(pathname)) {
            if (user?.role === 'admin') {
                router.push('/admin')
            } else {
                router.push('/dashboard')
            }
        }
    }, [isAuthenticated, pathname, router, user])

    // Show loading or nothing while checking?
    // For now just render children, the effect will redirect if needed
    return <>{children}</>
}
