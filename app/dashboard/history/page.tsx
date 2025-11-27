"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Upload, Calendar, FileText } from "lucide-react"

export default function HistoryPage() {
    const uploadHistory = [
        {
            id: 1,
            title: "Video Promo Entreprise",
            type: "Vidéo",
            size: "45.2 MB",
            date: "2024-11-25 14:30",
            status: "Succès"
        },
        {
            id: 2,
            title: "Audio Podcast Episode 1",
            type: "Audio", 
            size: "23.1 MB",
            date: "2024-11-24 09:15",
            status: "Succès"
        }
    ]

    const downloadHistory = [
        {
            id: 1,
            title: "Document Marketing Q4",
            type: "Document",
            size: "5.2 MB",
            date: "2024-11-26 16:45",
            source: "Marketplace"
        },
        {
            id: 2,
            title: "Audio Background Music",
            type: "Audio",
            size: "12.8 MB", 
            date: "2024-11-25 11:20",
            source: "Équipe"
        }
    ]

    const getStatusBadge = (status: string) => {
        return status === "Succès" 
            ? <Badge variant="default" className="bg-green-500">Succès</Badge>
            : <Badge variant="destructive">Échec</Badge>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Historique</h1>
                    <p className="text-muted-foreground">
                        Consultez l'historique de vos uploads et téléchargements.
                    </p>
                </div>
                <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Uploads Totaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">Ce mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-xs text-muted-foreground">Ce mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Données Uploadées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2.4 GB</div>
                        <p className="text-xs text-muted-foreground">Ce mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Données Téléchargées</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1.8 GB</div>
                        <p className="text-xs text-muted-foreground">Ce mois</p>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="uploads" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="uploads">
                        <Upload className="mr-2 h-4 w-4" />
                        Historique Uploads
                    </TabsTrigger>
                    <TabsTrigger value="downloads">
                        <Download className="mr-2 h-4 w-4" />
                        Historique Téléchargements
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="uploads">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des Uploads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fichier</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Taille</TableHead>
                                        <TableHead>Date & Heure</TableHead>
                                        <TableHead>Statut</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {uploadHistory.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.size}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {item.date}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="downloads">
                    <Card>
                        <CardHeader>
                            <CardTitle>Historique des Téléchargements</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fichier</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Taille</TableHead>
                                        <TableHead>Date & Heure</TableHead>
                                        <TableHead>Source</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {downloadHistory.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{item.type}</TableCell>
                                            <TableCell>{item.size}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                                    {item.date}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{item.source}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
