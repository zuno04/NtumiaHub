import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const reports = [
  {
    id: '1',
    type: 'inappropriate',
    content: 'Video Tutorial - React Basics',
    reporter: 'user@example.com',
    reason: 'Inappropriate content',
    status: 'pending'
  },
  {
    id: '2', 
    type: 'copyright',
    content: 'Audio Track - Background Music',
    reporter: 'creator@example.com',
    reason: 'Copyright violation',
    status: 'pending'
  }
]

export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Modération</h1>
        <p className="text-muted-foreground">Gérer les signalements et contenus</p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">{report.content}</span>
                    <Badge variant="outline">{report.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Signalé par {report.reporter}: {report.reason}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approuver
                  </Button>
                  <Button size="sm" variant="destructive">
                    <XCircle className="w-4 h-4 mr-1" />
                    Rejeter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
