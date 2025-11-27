import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, Download, Users, Settings } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Activity {
  id: string
  type: 'upload' | 'download' | 'team' | 'settings'
  title: string
  description: string
  timestamp: string
  user: string
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'upload',
    title: 'New Content Uploaded',
    description: 'Tutorial Video - Advanced React Patterns',
    timestamp: '2024-01-15T10:30:00Z',
    user: 'John Doe'
  },
  {
    id: '2',
    type: 'download',
    title: 'Content Downloaded',
    description: 'Project Assets.zip downloaded by Jane Smith',
    timestamp: '2024-01-15T09:15:00Z',
    user: 'System'
  },
  {
    id: '3',
    type: 'team',
    title: 'Team Member Added',
    description: 'Mike Johnson joined as Creator',
    timestamp: '2024-01-14T16:45:00Z',
    user: 'Admin'
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'upload': return Upload
    case 'download': return Download
    case 'team': return Users
    case 'settings': return Settings
    default: return Upload
  }
}

const getColor = (type: string) => {
  switch (type) {
    case 'upload': return 'bg-green-500'
    case 'download': return 'bg-blue-500'
    case 'team': return 'bg-purple-500'
    case 'settings': return 'bg-orange-500'
    default: return 'bg-gray-500'
  }
}

export function ActivityTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const Icon = getIcon(activity.type)
              return (
                <div key={activity.id} className="relative flex items-start space-x-4">
                  <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getColor(activity.type)}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {activity.user}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
