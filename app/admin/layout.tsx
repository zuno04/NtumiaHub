"use client"

import { AdminSidebar } from "@/components/admin-sidebar"
import { Topbar } from "@/components/topbar"
import AuthGuard from "@/lib/auth-guard"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard requiredRole="admin">
            <div className="flex min-h-screen flex-col">
                <div className="grid flex-1 md:grid-cols-[240px_1fr]">
                    <aside className="hidden border-r bg-background md:flex flex-col">
                        <AdminSidebar className="flex-1" />
                    </aside>
                    <main className="flex flex-col">
                        <Topbar />
                        <div className="flex-1 p-8 pt-6 bg-muted/10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    )
}
