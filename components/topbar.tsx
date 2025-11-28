"use client"

import { User as UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { NotificationsDropdown } from "@/components/notifications-dropdown"
import { MobileSidebar } from "@/components/sidebar"
import { GlobalSearch } from "@/components/global-search"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthStore, useLanguageStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { getTranslation } from "@/lib/i18n"

export function Topbar() {
    const { user, logout } = useAuthStore()
    const router = useRouter()
    const { locale } = useLanguageStore()
    const t = getTranslation(locale)

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <MobileSidebar />

                <div className="ml-auto flex items-center space-x-4">
                    <GlobalSearch />
                    <LanguageSwitcher />
                    <ThemeSwitcher />

                    <NotificationsDropdown />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.avatar} alt={user?.name} />
                                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user?.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/dashboard/profile')}>
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>{t.nav.profile}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                                {locale === 'fr' ? 'Déconnexion' : 'Logout'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}
