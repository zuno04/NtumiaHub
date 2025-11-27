"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, HardDrive, Activity, TrendingUp, Users, FileText, Eye } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { usePermissions } from "@/hooks/use-permissions"

export default function DashboardOverview() {
    const { user } = useAuthStore()
    const permissions = usePermissions(user?.role || 'viewer')
    
    // Viewer gets a different dashboard focused on browsing content
    if (user?.role === 'viewer') {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Bienvenue sur NtumiaHub</h1>
                    <p className="text-muted-foreground">
                        Explorez et découvrez du contenu partagé par la communauté
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Contenu Disponible</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">fichiers à explorer</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Mes Téléchargements</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">42</div>
                            <p className="text-xs text-muted-foreground">fichiers téléchargés</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Favoris</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">contenus favoris</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Nouveautés</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">15</div>
                            <p className="text-xs text-muted-foreground">cette semaine</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Actions Recommandées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            <Button variant="outline" className="h-20 flex-col">
                                <FileText className="h-6 w-6 mb-2" />
                                Explorer le Marketplace
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                                <Eye className="h-6 w-6 mb-2" />
                                Voir mes Favoris
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    
    // Original dashboard for editors and admins
    const stats = [
        { title: "Total Uploads", value: "24", icon: Upload, change: "+12%" },
        { title: "Total Downloads", value: "156", icon: Download, change: "+8%" },
        { title: "Storage Used", value: "2.4 GB", icon: HardDrive, change: "+15%" },
        { title: "Active Users", value: "12", icon: Activity, change: "+3%" }
    ]

    const recentActivity = [
        { action: "Upload", file: "video-promo.mp4", user: "John Doe", time: "Il y a 2h" },
        { action: "Download", file: "audio-track.mp3", user: "Jane Smith", time: "Il y a 3h" },
        { action: "Share", file: "document.pdf", user: "Mike Johnson", time: "Il y a 5h" }
    ]

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
                <p className="text-muted-foreground">
                    Tableau de bord de votre activité NtumiaHub
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{stat.change}</span> depuis le mois dernier
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activité Récente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <div className="w-2 h-2 bg-primary rounded-full" />
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">
                                        {activity.action}: {activity.file}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        par {activity.user} • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Storage Quota */}
                <Card>
                    <CardHeader>
                        <CardTitle>Quota de Stockage</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Utilisé</span>
                                <span>2.4 GB / 10 GB</span>
                            </div>
                            <Progress value={24} />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                            Augmenter le stockage
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions - Only for users with upload/management permissions */}
            {(permissions.canUpload || permissions.canManageUsers) && (
                <Card>
                    <CardHeader>
                        <CardTitle>Actions Rapides</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            {permissions.canUpload && (
                                <Button variant="outline" className="h-20 flex-col">
                                    <Upload className="h-6 w-6 mb-2" />
                                    Nouveau Upload
                                </Button>
                            )}
                            {permissions.canManageUsers && (
                                <Button variant="outline" className="h-20 flex-col">
                                    <Users className="h-6 w-6 mb-2" />
                                    Inviter Équipe
                                </Button>
                            )}
                            <Button variant="outline" className="h-20 flex-col">
                                <TrendingUp className="h-6 w-6 mb-2" />
                                Voir Analytics
                            </Button>
                    </div>
                </CardContent>
            </Card>
            )}
        </div>
    )
}
