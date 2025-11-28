"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    ShieldCheck,
    Users,
    BarChart3,
    Settings,
    LogOut,
    FileText,
    AlertTriangle,
    ShoppingBag
} from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { useRouter } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function AdminSidebar({ className }: SidebarProps) {
    const pathname = usePathname()
    const { logout } = useAuthStore()
    const router = useRouter()

    const routes = [
        {
            label: "Vue d'ensemble",
            icon: LayoutDashboard,
            href: "/admin",
            active: pathname === "/admin",
        },
        {
            label: "Validations",
            icon: ShieldCheck,
            href: "/admin/validations",
            active: pathname === "/admin/validations",
        },
        {
            label: "Utilisateurs",
            icon: Users,
            href: "/admin/users",
            active: pathname === "/admin/users",
        },
        {
            label: "Modération",
            icon: AlertTriangle,
            href: "/admin/moderation",
            active: pathname === "/admin/moderation",
        },
        {
            label: "Marketplace",
            icon: ShoppingBag,
            href: "/dashboard/marketplace",
            active: pathname === "/dashboard/marketplace",
        },
        {
            label: "Analytique",
            icon: BarChart3,
            href: "/admin/analytics",
            active: pathname === "/admin/analytics",
        },
        {
            label: "Logs Système",
            icon: FileText,
            href: "/admin/logs",
            active: pathname === "/admin/logs",
        },
        {
            label: "Paramètres",
            icon: Settings,
            href: "/admin/settings",
            active: pathname === "/admin/settings",
        },
    ]

    const handleLogout = () => {
        logout()
        router.push("/")
    }

    return (
        <div className={cn("pb-12 bg-muted/20 h-full", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <div className="flex items-center gap-2 px-4 mb-6">
                        <div className="h-8 w-8 rounded-lg bg-destructive text-destructive-foreground flex items-center justify-center">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-semibold tracking-tight">
                            Admin Panel
                        </h2>
                    </div>
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
                        Déconnexion
                    </Button>
                </div>
            </div>
        </div>
    )
}
