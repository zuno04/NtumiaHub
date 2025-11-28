"use client"

import { useState } from "react"
import Image from "next/image"
import { Content } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Download,
    Star,
    Clock,
    Eye,
    Share2,
    Heart,
    MessageCircle,
    Play,
    FileText,
    Music,
    Video,
    User,
    Calendar,
    HardDrive
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface ContentDetailViewProps {
    content: Content
}

export function ContentDetailView({ content }: ContentDetailViewProps) {
    const [selectedFormat, setSelectedFormat] = useState('original')
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isFavorite, setIsFavorite] = useState(false)

    const Icon = {
        video: Video,
        audio: Music,
        document: FileText,
        ad: Play
    }[content.type]

    const formatFileSize = (bytes: number) => {
        const sizes = ['B', 'KB', 'MB', 'GB']
        if (bytes === 0) return '0 B'
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
    }

    const formatDuration = (seconds?: number) => {
        if (!seconds) return ""
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const downloadFormats = [
        { value: 'original', label: 'Format Original', size: content.fileSize || 0 },
        { value: 'compressed', label: 'Compressé', size: (content.fileSize || 0) * 0.7 },
        { value: 'web', label: 'Optimisé Web', size: (content.fileSize || 0) * 0.5 }
    ]

    const comments = [
        {
            id: 1,
            user: "Marie Dubois",
            avatar: "/avatars/marie.jpg",
            comment: "Excellent contenu, très utile pour notre campagne marketing !",
            rating: 5,
            date: "2024-11-25"
        },
        {
            id: 2,
            user: "Pierre Martin",
            avatar: "/avatars/pierre.jpg",
            comment: "Bonne qualité, je recommande.",
            rating: 4,
            date: "2024-11-24"
        }
    ]

    const relatedContent = [
        {
            id: 101,
            title: "Contenu Similaire 1",
            thumbnail: "/thumbnails/related1.jpg",
            type: content.type,
            rating: 4.2
        },
        {
            id: 102,
            title: "Contenu Similaire 2",
            thumbnail: "/thumbnails/related2.jpg",
            type: content.type,
            rating: 4.5
        }
    ]

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Preview */}
            <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden bg-muted rounded-lg">
                    {content.thumbnail ? (
                        <Image
                            src={content.thumbnail}
                            alt={content.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Icon className="h-16 w-16 text-muted-foreground" />
                        </div>
                    )}
                    {content.type === 'video' && (
                        <Button
                            size="lg"
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16"
                        >
                            <Play className="h-6 w-6" />
                        </Button>
                    )}
                </div>

                {/* Download Section */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Télécharger</h3>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {downloadFormats.map((format) => (
                                <SelectItem key={format.value} value={format.value}>
                                    {format.label} ({formatFileSize(format.size)})
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <Button className="flex-1">
                            <Download className="mr-2 h-4 w-4" />
                            Télécharger
                        </Button>
                        <Button variant="outline" onClick={() => setIsFavorite(!isFavorite)}>
                            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button variant="outline">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
                {/* Metadata */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Détails</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>Créateur: {content.metadata?.author || 'Inconnu'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDistanceToNow(new Date(content.uploadedAt), { addSuffix: true, locale: fr })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground" />
                            <span>{formatFileSize(content.fileSize || 0)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDuration(content.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-muted-foreground" />
                            <span>{content.views || 0} vues</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Download className="h-4 w-4 text-muted-foreground" />
                            <span>{content.downloads} téléchargements</span>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Description</h3>
                    <p className="text-sm text-muted-foreground">{content.description}</p>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                    <h3 className="font-semibold">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {content.tags.map(tag => (
                            <Badge key={tag} variant="outline">#{tag}</Badge>
                        ))}
                    </div>
                </div>

                <Separator />

                {/* Rating */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Évaluation</h3>
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-5 w-5 cursor-pointer ${star <= (rating || content.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setRating(star)}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {content.rating}/5 ({content.reviewCount || 0} avis)
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
                <Separator className="my-6" />

                {/* Comments Section */}
                <div className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Commentaires ({comments.length})
                    </h3>

                    {/* Add Comment */}
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Ajouter un commentaire..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button size="sm">Publier</Button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback>
                                        {comment.user.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-sm">{comment.user}</span>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`h-3 w-3 ${star <= comment.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-muted-foreground'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                                    </div>
                                    <p className="text-sm">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="my-6" />

                {/* Related Content */}
                <div className="space-y-4">
                    <h3 className="font-semibold">Contenu Similaire</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedContent.map((item) => (
                            <div key={item.id} className="flex gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                                <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                                    <div className="flex items-center gap-1 mt-1">
                                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-muted-foreground">{item.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
