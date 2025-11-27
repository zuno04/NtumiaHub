"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Eye, Download, Edit, Trash2, Share } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function MyUploadsPage() {
    const uploads = [
        {
            id: 1,
            title: "Video Promo Entreprise",
            type: "Vidéo",
            size: "45.2 MB",
            views: 234,
            downloads: 12,
            status: "Publié",
            date: "2024-11-25"
        },
        {
            id: 2,
            title: "Audio Podcast Episode 1",
            type: "Audio",
            size: "23.1 MB",
            views: 156,
            downloads: 8,
            status: "En attente",
            date: "2024-11-24"
        },
        {
            id: 3,
            title: "Document Présentation",
            type: "Document",
            size: "2.8 MB",
            views: 89,
            downloads: 15,
            status: "Publié",
            date: "2024-11-23"
        }
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Publié":
                return <Badge variant="default">Publié</Badge>
            case "En attente":
                return <Badge variant="secondary">En attente</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Mes Uploads</h1>
                    <p className="text-muted-foreground">
                        Gérez vos contenus uploadés et suivez leurs performances.
                    </p>
                </div>
                <Button>Nouveau Upload</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Uploads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+3 ce mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Vues Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,234</div>
                        <p className="text-xs text-muted-foreground">+12% ce mois</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Téléchargements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">156</div>
                        <p className="text-xs text-muted-foreground">+8% ce mois</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Vos Contenus</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Titre</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Taille</TableHead>
                                <TableHead>Vues</TableHead>
                                <TableHead>Téléchargements</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uploads.map((upload) => (
                                <TableRow key={upload.id}>
                                    <TableCell className="font-medium">{upload.title}</TableCell>
                                    <TableCell>{upload.type}</TableCell>
                                    <TableCell>{upload.size}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                            {upload.views}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Download className="h-4 w-4 text-muted-foreground" />
                                            {upload.downloads}
                                        </div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(upload.status)}</TableCell>
                                    <TableCell>{upload.date}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Modifier
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Share className="mr-2 h-4 w-4" />
                                                    Partager
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
