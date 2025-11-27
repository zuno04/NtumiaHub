import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, MediaOrganization, Notification } from '@/types'

interface AuthState {
    user: User | null
    organization: MediaOrganization | null
    isAuthenticated: boolean
    token: string | null
    login: (user: User, org: MediaOrganization, token: string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
}

interface ThemeState {
    theme: string
    setTheme: (theme: string) => void
}

interface NotificationState {
    notifications: Notification[]
    unreadCount: number
    addNotification: (notification: Notification) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    clearNotifications: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            organization: null,
            isAuthenticated: false,
            token: null,
            login: (user, org, token) => set({ user, organization: org, isAuthenticated: true, token }),
            logout: () => set({ user: null, organization: null, isAuthenticated: false, token: null }),
            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),
        }),
        {
            name: 'auth-storage',
        }
    )
)

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    addNotification: (notification) => set((state) => ({
        notifications: [notification, ...state.notifications],
        unreadCount: state.unreadCount + 1
    })),
    markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1
    })),
    markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map(n => ({ ...n, read: true })),
        unreadCount: 0
    })),
    clearNotifications: () => set({ notifications: [], unreadCount: 0 }),
}))
