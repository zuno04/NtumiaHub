"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Download, Upload, Eye, Clock } from 'lucide-react'
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'

const stats = [
    { title: 'Total Téléchargements', value: '1,234', change: '+12%', icon: Download },
    { title: 'Contenus Uploadés', value: '45', change: '+5%', icon: Upload },
    { title: 'Vues Totales', value: '12.5k', change: '+23%', icon: Eye },
    { title: 'Temps Moyen', value: '2m 30s', change: '+4%', icon: Clock }
]

const activityData = [
    { name: 'Jan', uploads: 4, downloads: 24 },
    { name: 'Fév', uploads: 3, downloads: 13 },
    { name: 'Mar', uploads: 2, downloads: 98 },
    { name: 'Avr', uploads: 7, downloads: 39 },
    { name: 'Mai', uploads: 5, downloads: 48 },
    { name: 'Juin', uploads: 8, downloads: 38 },
    { name: 'Juil', uploads: 12, downloads: 43 },
]

const typeData = [
    { name: 'Vidéo', count: 25 },
    { name: 'Audio', count: 15 },
    { name: 'Image', count: 35 },
    { name: 'Article', count: 10 },
]

export default function UserAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Analytique</h1>
                <p className="text-muted-foreground">Performances de vos contenus et engagement</p>
            </div>

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

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Activité Mensuelle</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={activityData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="name" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="uploads" stroke="#8884d8" name="Uploads" strokeWidth={2} />
                                    <Line type="monotone" dataKey="downloads" stroke="#82ca9d" name="Téléchargements" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Contenu par Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={typeData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="name" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} name="Nombre" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
