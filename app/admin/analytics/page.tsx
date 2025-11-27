import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Users, Download, Upload } from 'lucide-react'

const stats = [
  { title: 'Utilisateurs Actifs', value: '2,847', change: '+12%', icon: Users },
  { title: 'Téléchargements', value: '15,234', change: '+8%', icon: Download },
  { title: 'Uploads', value: '1,456', change: '+23%', icon: Upload },
  { title: 'Croissance', value: '18.2%', change: '+4%', icon: TrendingUp }
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytique</h1>
        <p className="text-muted-foreground">Statistiques et métriques de la plateforme</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> depuis le mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            Graphiques d'analytique à venir
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
