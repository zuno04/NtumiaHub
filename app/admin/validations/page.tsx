"use client"

import { useEffect, useState } from "react"
import { MockService } from "@/lib/mock-service"
import { MediaOrganization, Content } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, FileText, Play } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ValidationsPage() {
    const [pendingMedia, setPendingMedia] = useState<MediaOrganization[]>([])
    const [pendingContent, setPendingContent] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadData = async () => {
        try {
            const data = await MockService.getPendingItems()
            setPendingMedia(data.media)
            setPendingContent(data.content)
        } catch (error) {
            console.error("Failed to load pending items", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleAction = async (id: string, type: 'media' | 'content', action: 'approve' | 'reject') => {
        try {
            if (action === 'approve') {
                await MockService.approveItem(id, type)
                toast.success(`${type === 'media' ? 'Média' : 'Contenu'} approuvé avec succès`)
            } else {
                await MockService.rejectItem(id, type)
                toast.info(`${type === 'media' ? 'Média' : 'Contenu'} rejeté`)
            }
            loadData() // Reload to remove item from list
        } catch (error) {
            toast.error("Une erreur est survenue")
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Validations</h2>
                <p className="text-muted-foreground">
                    Gérez les demandes d'inscription et les contenus en attente de validation.
                </p>
            </div>

            <Tabs defaultValue="media" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="media">
                        Médias ({pendingMedia.length})
                    </TabsTrigger>
                    <TabsTrigger value="content">
                        Contenus ({pendingContent.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="media" className="space-y-4">
                    {pendingMedia.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            Aucune demande d'inscription en attente.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {pendingMedia.map((media) => (
                                <Card key={media.id}>
                                    <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={media.logo} />
                                            <AvatarFallback>{media.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <CardTitle>{media.name}</CardTitle>
                                            <CardDescription>{media.type}</CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="text-sm">
                                            <span className="font-medium">Responsable:</span> {media.responsible.name}
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium">Email:</span> {media.responsible.email}
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            {media.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="justify-end gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleAction(media.id, 'media', 'reject')}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Rejeter
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleAction(media.id, 'media', 'approve')}
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Valider
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                    {pendingContent.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            Aucun contenu en attente de validation.
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {pendingContent.map((content) => (
                                <Card key={content.id}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline">{content.type}</Badge>
                                            <Badge variant="secondary">{content.license}</Badge>
                                        </div>
                                        <CardTitle className="mt-2 line-clamp-1">{content.title}</CardTitle>
                                        <CardDescription className="line-clamp-2">{content.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
                                            {content.thumbnail ? (
                                                <img src={content.thumbnail} alt={content.title} className="object-cover w-full h-full" />
                                            ) : (
                                                <Play className="h-10 w-10 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            Uploadé par: {content.uploadedBy}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="justify-end gap-2">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            Voir
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-destructive hover:text-destructive"
                                            onClick={() => handleAction(content.id, 'content', 'reject')}
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Rejeter
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => handleAction(content.id, 'content', 'approve')}
                                        >
                                            <Check className="mr-2 h-4 w-4" />
                                            Approuver
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
