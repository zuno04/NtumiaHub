import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react'

const logs = [
  {
    id: '1',
    level: 'error',
    message: 'Failed to upload file: connection timeout',
    timestamp: '2024-01-15 14:30:25',
    user: 'user@example.com'
  },
  {
    id: '2',
    level: 'info', 
    message: 'User login successful',
    timestamp: '2024-01-15 14:25:10',
    user: 'admin@example.com'
  },
  {
    id: '3',
    level: 'warning',
    message: 'Storage limit approaching 90%',
    timestamp: '2024-01-15 14:20:05',
    user: 'system'
  },
  {
    id: '4',
    level: 'success',
    message: 'Content validation completed',
    timestamp: '2024-01-15 14:15:30',
    user: 'moderator@example.com'
  }
]

const getIcon = (level: string) => {
  switch (level) {
    case 'error': return XCircle
    case 'warning': return AlertCircle
    case 'success': return CheckCircle
    default: return Info
  }
}

const getVariant = (level: string) => {
  switch (level) {
    case 'error': return 'destructive'
    case 'warning': return 'secondary'
    case 'success': return 'default'
    default: return 'outline'
  }
}

export default function LogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Logs Système</h1>
        <p className="text-muted-foreground">Journaux d'activité et événements système</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs Récents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => {
              const Icon = getIcon(log.level)
              return (
                <div key={log.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <Icon className="w-4 h-4" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant={getVariant(log.level) as any}>{log.level}</Badge>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                      <span className="text-sm text-muted-foreground">• {log.user}</span>
                    </div>
                    <p className="text-sm mt-1">{log.message}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
