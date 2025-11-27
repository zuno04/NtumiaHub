"use client"

import { useEffect, useState } from "react"
import { MockService } from "@/lib/mock-service"
import { PlatformStats } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, FileText, HardDrive, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<PlatformStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadStats = async () => {
            try {
                const data = await MockService.getStats()
                setStats(data)
            } catch (error) {
                console.error("Failed to load stats", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadStats()
    }, [])

    if (isLoading) {
        return <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-[400px] rounded-xl" />
        </div>
    }

    if (!stats) return null

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
                <p className="text-muted-foreground">
                    Vue d'ensemble de l'activité de la plateforme NtumiaHub.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Médias
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMedia}</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.activeMedia} actifs, {stats.pendingMedia} en attente
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Contenus Uploadés
                        </CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalContent}</div>
                        <p className="text-xs text-muted-foreground flex items-center text-green-500">
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                            +12% ce mois
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Téléchargements
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                        <p className="text-xs text-muted-foreground flex items-center text-green-500">
                            <ArrowUpRight className="mr-1 h-4 w-4" />
                            +24% ce mois
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Stockage Utilisé
                        </CardTitle>
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {(stats.totalStorage / (1024 * 1024 * 1024)).toFixed(1)} GB
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Sur 2 TB disponibles
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Activité Récente</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={stats.activityTimeline}>
                                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                <XAxis
                                    dataKey="date"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px' }}
                                    cursor={{ fill: 'var(--muted)' }}
                                />
                                <Bar
                                    dataKey="uploads"
                                    name="Uploads"
                                    fill="hsl(210, 100%, 50%)"
                                    radius={[4, 4, 0, 0]}
                                />
                                <Bar
                                    dataKey="downloads"
                                    name="Téléchargements"
                                    fill="hsl(25, 95%, 53%)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Top Contributeurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {stats.topContributors.map((contributor, index) => (
                                <div key={contributor.mediaId} className="flex items-center">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted font-bold">
                                        {index + 1}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{contributor.mediaName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            Média Partenaire
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        {contributor.uploadCount} uploads
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
