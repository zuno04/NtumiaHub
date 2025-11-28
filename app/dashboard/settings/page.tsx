"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/lib/store"
import { usePermissions } from "@/hooks/use-permissions"
import { Settings, Bell, Shield, Globe, Clock } from "lucide-react"
import { getTimezonesByRegion, getPopularTimezones, TIMEZONES } from "@/lib/timezones"
import { useState } from "react"
import * as React from "react"

export default function SettingsPage() {
    const { user } = useAuthStore()
    const permissions = usePermissions(user?.role || 'viewer')
    const [selectedTimezone, setSelectedTimezone] = useState('Europe/Paris')
    const [timezoneSearch, setTimezoneSearch] = useState('')
    const [currentTime, setCurrentTime] = useState(new Date())

    const timezonesByRegion = getTimezonesByRegion()
    const popularTimezones = getPopularTimezones()

    const filteredTimezones = timezoneSearch
        ? TIMEZONES.filter(tz => {
            const search = timezoneSearch.toLowerCase()
            return tz.label.toLowerCase().includes(search) ||
                tz.value.toLowerCase().includes(search) ||
                tz.region.toLowerCase().includes(search) ||
                tz.country?.toLowerCase().includes(search) ||
                tz.keywords?.some(k => k.toLowerCase().includes(search))
        })
        : []

    // Update current time every second
    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTimeInTimezone = (timezone: string) => {
        try {
            return new Intl.DateTimeFormat('fr-FR', {
                timeZone: timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).format(currentTime)
        } catch {
            return '--:--:--'
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
                <p className="text-muted-foreground">
                    Gérez vos préférences et paramètres de compte.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">
                        <Settings className="mr-2 h-4 w-4" />
                        Général
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </TabsTrigger>
                    <TabsTrigger value="security">
                        <Shield className="mr-2 h-4 w-4" />
                        Sécurité
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Paramètres Généraux</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="language">Langue</Label>
                                    <Select defaultValue="fr">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fr">Français</SelectItem>
                                            <SelectItem value="en">English</SelectItem>
                                            <SelectItem value="es">Español</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="timezone">
                                        <Clock className="inline mr-2 h-4 w-4" />
                                        Fuseau Horaire
                                    </Label>
                                    <div className="space-y-2">
                                        <Input
                                            placeholder="Rechercher un fuseau horaire..."
                                            value={timezoneSearch}
                                            onChange={(e) => setTimezoneSearch(e.target.value)}
                                            className="mb-2"
                                        />

                                        {/* Show filtered results directly when searching */}
                                        {timezoneSearch && (
                                            <div className="border rounded-md max-h-60 overflow-y-auto">
                                                {filteredTimezones.length > 0 ? (
                                                    <div className="p-1">
                                                        <div className="text-xs text-muted-foreground px-2 py-1">
                                                            {filteredTimezones.length} résultat{filteredTimezones.length > 1 ? 's' : ''} trouvé{filteredTimezones.length > 1 ? 's' : ''}
                                                        </div>
                                                        {filteredTimezones.map((timezone) => (
                                                            <button
                                                                key={timezone.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedTimezone(timezone.value)
                                                                    setTimezoneSearch('')
                                                                }}
                                                                className={`w-full text-left px-2 py-2 rounded hover:bg-accent transition-colors ${selectedTimezone === timezone.value ? 'bg-accent' : ''
                                                                    }`}
                                                            >
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-sm">{timezone.label}</span>
                                                                    <span className="text-xs text-muted-foreground ml-2">
                                                                        {timezone.offset}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                                                        <p>Aucun fuseau horaire trouvé</p>
                                                        <p className="text-xs mt-1">Essayez un autre terme de recherche</p>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Regular select when not searching */}
                                        {!timezoneSearch && (
                                            <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-80">
                                                    <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                        Populaires
                                                    </div>
                                                    {popularTimezones.map((timezone) => (
                                                        <SelectItem key={timezone.value} value={timezone.value}>
                                                            <div className="flex justify-between items-center w-full">
                                                                <span>{timezone.label}</span>
                                                                <span className="text-xs text-muted-foreground ml-2">
                                                                    {timezone.offset}
                                                                </span>
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                    <div className="my-2 border-t" />
                                                    {Object.entries(timezonesByRegion).map(([region, timezones]) => (
                                                        <div key={region}>
                                                            <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                                {region}
                                                            </div>
                                                            {timezones.map((timezone) => (
                                                                <SelectItem key={timezone.value} value={timezone.value}>
                                                                    <div className="flex justify-between items-center w-full">
                                                                        <span>{timezone.label}</span>
                                                                        <span className="text-xs text-muted-foreground ml-2">
                                                                            {timezone.offset}
                                                                        </span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}

                                        <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                                            <span>
                                                Fuseau horaire: {selectedTimezone}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono">
                                                    {formatTimeInTimezone(selectedTimezone)}
                                                </span>
                                                <span>
                                                    {TIMEZONES.find(tz => tz.value === selectedTimezone)?.offset}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Timezone comparison */}
                                        <div className="mt-4 p-4 border rounded-lg bg-muted/20">
                                            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                                <Globe className="h-4 w-4" />
                                                Comparaison des Fuseaux Horaires
                                            </h4>
                                            <div className="space-y-2">
                                                {[
                                                    { tz: selectedTimezone, label: 'Votre fuseau horaire', isSelected: true },
                                                    { tz: 'UTC', label: 'UTC (Temps Universel)' },
                                                    { tz: 'Africa/Douala', label: 'Douala, Cameroun' },
                                                    { tz: 'Africa/Lagos', label: 'Lagos, Nigeria' },
                                                    { tz: 'Africa/Cairo', label: 'Le Caire, Égypte' },
                                                    { tz: 'Africa/Nairobi', label: 'Nairobi, Kenya' }
                                                ].map(({ tz, label, isSelected }) => (
                                                    <div 
                                                        key={tz} 
                                                        className={`flex justify-between items-center p-2 rounded transition-colors ${
                                                            isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {isSelected && <div className="w-2 h-2 bg-primary rounded-full" />}
                                                            <span className={`text-sm ${isSelected ? 'font-medium text-primary' : ''}`}>
                                                                {label}
                                                            </span>
                                                        </div>
                                                        <span className="font-mono text-sm font-medium">
                                                            {formatTimeInTimezone(tz)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Mode Sombre</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Activer le thème sombre
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Auto-upload</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Upload automatique des fichiers
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        {user?.role === 'admin' && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Stockage</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="storage-limit">Limite de Stockage par Fichier</Label>
                                        <Select defaultValue="100mb">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="50mb">50 MB</SelectItem>
                                                <SelectItem value="100mb">100 MB</SelectItem>
                                                <SelectItem value="500mb">500 MB</SelectItem>
                                                <SelectItem value="1gb">1 GB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Compression Automatique</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Compresser les fichiers volumineux
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Préférences de Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Notifications Email</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Recevoir des notifications par email
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Nouveaux Téléchargements</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Notifier lors de nouveaux téléchargements
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Commentaires</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Notifier lors de nouveaux commentaires
                                    </p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Activité Équipe</Label>
                                    <p className="text-sm text-muted-foreground">
                                        Notifier de l'activité de l'équipe
                                    </p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <Label htmlFor="notification-frequency">Fréquence des Notifications</Label>
                                <Select defaultValue="immediate">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="immediate">Immédiate</SelectItem>
                                        <SelectItem value="hourly">Toutes les heures</SelectItem>
                                        <SelectItem value="daily">Quotidienne</SelectItem>
                                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sécurité du Compte</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="current-password">Mot de Passe Actuel</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="new-password">Nouveau Mot de Passe</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirmer le Mot de Passe</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button>Changer le Mot de Passe</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Authentification à Deux Facteurs</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>2FA Activé</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Sécurité renforcée avec 2FA
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Button variant="outline">Configurer 2FA</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Sessions Actives</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-3 border rounded">
                                        <div>
                                            <p className="font-medium">Session Actuelle</p>
                                            <p className="text-sm text-muted-foreground">Chrome sur Windows • Paris, France</p>
                                        </div>
                                        <Badge variant="default">Actuelle</Badge>
                                    </div>
                                </div>
                                <Button variant="destructive" size="sm">
                                    Déconnecter Toutes les Sessions
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="flex justify-end">
                <Button>Sauvegarder les Modifications</Button>
            </div>
        </div>
    )
}
