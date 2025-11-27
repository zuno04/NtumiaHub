"use client"

import Image from "next/image"
import { Content } from "@/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, FileText, Music, Video, Download, Clock, Star, Eye } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ContentCardProps {
    content: Content
    viewMode?: 'grid' | 'list'
    onContentClick?: (content: Content) => void
}

export function ContentCard({ content, viewMode = 'grid', onContentClick }: ContentCardProps) {
    const Icon = {
        video: Video,
        audio: Music,
        document: FileText,
        ad: Play
    }[content.type]

    const formatDuration = (seconds?: number) => {
        if (!seconds) return ""
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const formatFileSize = (bytes: number) => {
        const sizes = ['B', 'KB', 'MB', 'GB']
        if (bytes === 0) return '0 B'
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
    }

    const handleCardClick = () => {
        onContentClick?.(content)
    }

    const handleDownloadClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Handle download logic here
    }

    if (viewMode === 'list') {
        return (
            <Card className="overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer" onClick={handleCardClick}>
                <div className="flex">
                    {/* Thumbnail */}
                    <div className="relative w-48 h-32 flex-shrink-0 overflow-hidden bg-muted">
                        {content.thumbnail ? (
                            <Image
                                src={content.thumbnail}
                                alt={content.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <Icon className="h-8 w-8 text-muted-foreground" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2">
                            <Badge variant={content.license === 'free' ? "secondary" : "default"} className="text-xs">
                                {content.license === 'free' ? 'Gratuit' : 'Payant'}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-lg line-clamp-1" title={content.title}>
                                    {content.title}
                                </h3>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    {content.rating}
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {content.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-3">
                                {content.tags.slice(0, 4).map(tag => (
                                    <Badge key={tag} variant="outline" className="text-xs px-2 py-0 h-5">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {formatDistanceToNow(new Date(content.uploadedAt), { addSuffix: true, locale: fr })}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Download className="h-4 w-4" />
                                    {content.downloads}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {content.views || 0}
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {content.type === 'document' ? content.format?.toUpperCase() : formatDuration(content.duration)}
                                </Badge>
                                <span className="text-xs">
                                    {formatFileSize(content.size || 0)}
                                </span>
                            </div>
                            <Button size="sm" onClick={handleDownloadClick}>
                                <Download className="mr-2 h-4 w-4" />
                                Télécharger
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    // Grid view (default)
    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={handleCardClick}>
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
                {content.thumbnail ? (
                    <Image
                        src={content.thumbnail}
                        alt={content.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Icon className="h-12 w-12 text-muted-foreground" />
                    </div>
                )}
                <div className="absolute top-2 right-2">
                    <Badge variant={content.license === 'free' ? "secondary" : "default"}>
                        {content.license === 'free' ? 'Gratuit' : 'Payant'}
                    </Badge>
                </div>
                <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm">
                        {content.type === 'document' ? content.format?.toUpperCase() : formatDuration(content.duration)}
                    </Badge>
                </div>
            </div>

            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none line-clamp-1" title={content.title}>
                            {content.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                            {content.description}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-4 pt-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(content.uploadedAt), { addSuffix: true, locale: fr })}
                    </div>
                    <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {content.downloads}
                    </div>
                    <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {content.rating}
                    </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                    {content.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-1 py-0 h-5">
                            #{tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button className="w-full" size="sm" onClick={handleDownloadClick}>
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                </Button>
            </CardFooter>
        </Card>
    )
}
