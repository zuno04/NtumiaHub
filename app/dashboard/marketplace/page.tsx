"use client"

import { useEffect, useState } from "react"
import { Content } from "@/types"
import { MockService } from "@/lib/mock-service"
import { ContentCard } from "@/components/content-card"
import { ContentDetailModal } from "@/components/content-detail-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Filter, SlidersHorizontal, Grid3X3, List, Search, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function MarketplacePage() {
    const [contents, setContents] = useState<Content[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('recent')
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [selectedContent, setSelectedContent] = useState<Content | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('all')

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await MockService.getContent()
                setContents(data)
            } catch (error) {
                console.error("Failed to load content", error)
            } finally {
                setIsLoading(false)
            }
        }
        loadContent()
    }, [])

    const filteredContents = contents.filter(content => {
        const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            content.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(content.type)
        const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.some(cat => content.categories?.includes(cat))
        return matchesSearch && matchesType && matchesCategory
    })

    const sortedContents = [...filteredContents].sort((a, b) => {
        switch (sortBy) {
            case 'recent':
                return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
            case 'popular':
                return b.downloads - a.downloads
            case 'name':
                return a.title.localeCompare(b.title)
            case 'size':
                return (b.fileSize || 0) - (a.fileSize || 0)
            default:
                return 0
        }
    })

    const contentTypes = ['video', 'audio', 'document', 'ad']
    const categories = ['Marketing', 'Education', 'Entertainment', 'Business', 'Technology']

    const handleTypeFilter = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes([...selectedTypes, type])
        } else {
            setSelectedTypes(selectedTypes.filter(t => t !== type))
        }
    }

    const handleCategoryFilter = (category: string, checked: boolean) => {
        if (checked) {
            setSelectedCategories([...selectedCategories, category])
        } else {
            setSelectedCategories(selectedCategories.filter(c => c !== category))
        }
    }

    const clearFilters = () => {
        setSelectedTypes([])
        setSelectedCategories([])
        setSearchQuery('')
    }

    const handleContentClick = (content: Content) => {
        setSelectedContent(content)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedContent(null)
    }

    return (
        <>
            <div className="flex gap-6">
                {/* Filters Sidebar */}
                {showFilters && (
                    <div className="w-80 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Filtres</CardTitle>
                                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                                        <X className="h-4 w-4" />
                                        Effacer
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Type Filter */}
                                <div>
                                    <h4 className="font-medium mb-3">Type de Contenu</h4>
                                    <div className="space-y-2">
                                        {contentTypes.map((type) => (
                                            <div key={type} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={type}
                                                    checked={selectedTypes.includes(type)}
                                                    onCheckedChange={(checked) => handleTypeFilter(type, checked as boolean)}
                                                />
                                                <label htmlFor={type} className="text-sm capitalize">
                                                    {type === 'video' ? 'Vidéos' : 
                                                     type === 'audio' ? 'Audio' :
                                                     type === 'document' ? 'Documents' : 'Publicités'}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Category Filter */}
                                <div>
                                    <h4 className="font-medium mb-3">Catégories</h4>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <div key={category} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={category}
                                                    checked={selectedCategories.includes(category)}
                                                    onCheckedChange={(checked) => handleCategoryFilter(category, checked as boolean)}
                                                />
                                                <label htmlFor={category} className="text-sm">
                                                    {category}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Active Filters */}
                                {(selectedTypes.length > 0 || selectedCategories.length > 0) && (
                                    <div>
                                        <h4 className="font-medium mb-3">Filtres Actifs</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTypes.map((type) => (
                                                <Badge key={type} variant="secondary" className="text-xs">
                                                    {type}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0 ml-1"
                                                        onClick={() => handleTypeFilter(type, false)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </Badge>
                                            ))}
                                            {selectedCategories.map((category) => (
                                                <Badge key={category} variant="secondary" className="text-xs">
                                                    {category}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-auto p-0 ml-1"
                                                        onClick={() => handleCategoryFilter(category, false)}
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
                            <p className="text-muted-foreground">
                                Découvrez et échangez des contenus médias exclusifs.
                            </p>
                        </div>
                        
                        {/* Search and Controls */}
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Rechercher des contenus..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            
                            <Button 
                                variant="outline" 
                                onClick={() => setShowFilters(!showFilters)}
                                className={showFilters ? "bg-secondary" : ""}
                            >
                                <Filter className="mr-2 h-4 w-4" />
                                Filtres
                            </Button>
                            
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-40">
                                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Plus Récent</SelectItem>
                                    <SelectItem value="popular">Plus Populaire</SelectItem>
                                    <SelectItem value="name">Nom A-Z</SelectItem>
                                    <SelectItem value="size">Taille</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <div className="flex border rounded-md">
                                <Button
                                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('grid')}
                                    className="rounded-r-none"
                                >
                                    <Grid3X3 className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="rounded-l-none"
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {(() => {
                                const filteredByTab = sortedContents.filter(content => activeTab === 'all' || content.type === activeTab)
                                return `${filteredByTab.length} résultat${filteredByTab.length !== 1 ? 's' : ''} trouvé${filteredByTab.length !== 1 ? 's' : ''}`
                            })()} 
                            {activeTab !== 'all' && (
                                <span className="ml-2 text-xs bg-secondary px-2 py-1 rounded">
                                    {activeTab === 'video' ? 'Vidéos' : 
                                     activeTab === 'audio' ? 'Audio' :
                                     activeTab === 'document' ? 'Documents' : 'Publicités'}
                                </span>
                            )}
                        </p>
                    </div>

                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="all">Tout</TabsTrigger>
                            <TabsTrigger value="video">Vidéos</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                            <TabsTrigger value="document">Documents</TabsTrigger>
                            <TabsTrigger value="ad">Publicités</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="space-y-4">
                            {isLoading ? (
                                <div className={viewMode === 'grid' 
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "space-y-4"
                                }>
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="space-y-3">
                                            <Skeleton className="h-[200px] w-full rounded-xl" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-[250px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={viewMode === 'grid' 
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                    : "space-y-4"
                                }>
                                    {sortedContents
                                        .filter(content => activeTab === 'all' || content.type === activeTab)
                                        .map((content) => (
                                        <ContentCard 
                                            key={content.id} 
                                            content={content} 
                                            viewMode={viewMode}
                                            onContentClick={handleContentClick}
                                        />
                                    ))}
                                </div>
                            )}
                            
                            {!isLoading && sortedContents.filter(content => activeTab === 'all' || content.type === activeTab).length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">Aucun contenu trouvé avec ces critères.</p>
                                    <Button variant="outline" onClick={clearFilters} className="mt-4">
                                        Effacer les filtres
                                    </Button>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Content Detail Modal */}
            <ContentDetailModal
                content={selectedContent}
                isOpen={isModalOpen}
                onClose={handleModalClose}
            />
        </>
    )
}
