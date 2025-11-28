"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    LayoutDashboard,
    ShoppingBag,
    Upload,
    Users,
    History,
    Settings,
    Menu,
    Globe,
    LogOut
} from "lucide-react"
import { useAuthStore, useLanguageStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { UploadModal } from "@/components/upload-modal"
import { usePermissions } from "@/hooks/use-permissions"
import { getTranslation } from "@/lib/i18n"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { logout, user } = useAuthStore()
    const router = useRouter()
    const permissions = usePermissions(user?.role || 'viewer')
    const { locale } = useLanguageStore()
    const t = getTranslation(locale)

    const routes = [
        {
            label: t.nav.dashboard,
            icon: LayoutDashboard,
            href: "/dashboard",
            active: pathname === "/dashboard",
        },
        {
            label: t.nav.marketplace,
            icon: ShoppingBag,
            href: "/dashboard/marketplace",
            active: pathname === "/dashboard/marketplace",
        },
        ...(permissions.canUpload ? [{
            label: t.nav.uploads,
            icon: Upload,
            href: "/dashboard/uploads",
            active: pathname === "/dashboard/uploads",
        }] : []),
        ...(permissions.canManageUsers ? [{
            label: t.nav.team,
            icon: Users,
            href: "/dashboard/team",
            active: pathname === "/dashboard/team",
        }] : []),
        {
            label: t.nav.history,
            icon: History,
            href: "/dashboard/history",
            active: pathname === "/dashboard/history",
        },
        {
            label: t.nav.settings,
            icon: Settings,
            href: "/dashboard/settings",
            active: pathname === "/dashboard/settings",
        },
    ]

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <div className={cn("pb-12", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 px-4 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                            <Globe className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            NtumiaHub
                        </h2>
                    </div>

                    {permissions.canUpload && (
                        <div className="px-4 mb-4">
                            <UploadModal>
                                <Button className="w-full shadow-lg hover:shadow-xl transition-all">
                                    <Upload className="mr-2 h-4 w-4" />
                                    {locale === 'fr' ? 'Nouveau Upload' : 'New Upload'}
                                </Button>
                            </UploadModal>
                        </div>
                    )}

                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className="w-full justify-start"
                                asChild
                            >
                                <Link href={route.href}>
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="px-3 py-2 mt-auto">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        {locale === 'fr' ? 'Déconnexion' : 'Logout'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export function MobileSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <Sidebar className="h-full" />
            </SheetContent>
        </Sheet>
    )
}
