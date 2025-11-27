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
import { Settings, Bell, Shield, Globe } from "lucide-react"

export default function SettingsPage() {
    const { user } = useAuthStore()
    const permissions = usePermissions(user?.role || 'viewer')
    
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
                                    <Label htmlFor="timezone">Fuseau Horaire</Label>
                                    <Select defaultValue="europe/paris">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="europe/paris">Europe/Paris</SelectItem>
                                            <SelectItem value="america/new_york">America/New_York</SelectItem>
                                            <SelectItem value="asia/tokyo">Asia/Tokyo</SelectItem>
                                        </SelectContent>
                                    </Select>
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
