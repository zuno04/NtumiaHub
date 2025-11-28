"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Content } from "@/types"
import { MockService } from "@/lib/mock-service"
import { ContentDetailView } from "@/components/content-detail-view"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminContentPage() {
    const params = useParams()
    const router = useRouter()
    const [content, setContent] = useState<Content | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadContent = async () => {
            try {
                // In a real app, we would fetch by ID directly
                // For mock service, we get all and find
                const allContent = await MockService.getContent()
                const found = allContent.find(c => c.id === params.id)
                setContent(found || null)
            } catch (error) {
                console.error("Failed to load content", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadContent()
    }, [params.id])

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Skeleton className="aspect-video w-full rounded-lg" />
                    <div className="space-y-4">
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
            </div>
        )
    }

    if (!content) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold">Contenu non trouvé</h2>
                <p className="text-muted-foreground">Le contenu que vous recherchez n'existe pas ou a été supprimé.</p>
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold tracking-tight">Détails du contenu</h1>
            </div>

            <div className="bg-card rounded-lg border p-6 shadow-sm">
                <ContentDetailView content={content} />
            </div>
        </div>
    )
}
