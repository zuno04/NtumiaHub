"use client"

import { useState, useEffect } from "react"
import { Search, FileText, Video, Music, Play, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MockService } from "@/lib/mock-service"
import { Content } from "@/types"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<Content[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    // Keyboard shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault()
                setOpen(true)
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const searchContent = async () => {
            setLoading(true)
            try {
                const content = await MockService.getContent()
                const filtered = content.filter(item =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase()) ||
                    item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
                ).slice(0, 8)
                setResults(filtered)
            } catch (error) {
                console.error("Search error:", error)
            } finally {
                setLoading(false)
            }
        }

        const debounce = setTimeout(searchContent, 300)
        return () => clearTimeout(debounce)
    }, [query])

    const [pathname, setPathname] = useState("")

    useEffect(() => {
        setPathname(window.location.pathname)
    }, [])

    const handleResultClick = (content: Content) => {
        setOpen(false)
        if (window.location.pathname.startsWith('/admin')) {
            router.push(`/admin/content/${content.id}`)
        } else {
            router.push(`/dashboard/marketplace?content=${content.id}`)
        }
    }

    const getIcon = (type: string) => {
        const icons = {
            video: Video,
            audio: Music,
            document: FileText,
            ad: Play
        }
        const Icon = icons[type as keyof typeof icons] || FileText
        return <Icon className="h-4 w-4" />
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="relative w-96 hidden md:block">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher du contenu... (Ctrl+K)"
                        className="pl-8 cursor-pointer"
                        readOnly
                    />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl p-0">
                <DialogTitle className="sr-only">Recherche globale</DialogTitle>
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher du contenu..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                    {loading && (
                        <div className="p-4 text-center text-muted-foreground">
                            Recherche en cours...
                        </div>
                    )}

                    {!loading && query.length >= 2 && results.length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                            Aucun résultat trouvé
                        </div>
                    )}

                    {results.map((content) => (
                        <div
                            key={content.id}
                            className="p-4 hover:bg-muted cursor-pointer border-b last:border-b-0"
                            onClick={() => handleResultClick(content)}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {getIcon(content.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-medium truncate">{content.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                        {content.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge variant="secondary" className="text-xs">
                                            {content.type}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {new Date(content.uploadedAt).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {query.length < 2 && (
                    <div className="p-4 text-center text-muted-foreground">
                        Tapez au moins 2 caractères pour rechercher
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}