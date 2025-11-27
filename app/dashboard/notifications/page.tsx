import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Download, Upload, Users } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const notifications = [
  {
    id: '1',
    type: 'download',
    title: 'Content Downloaded',
    message: 'Your video "Tutorial 1" was downloaded by John Doe',
    createdAt: '2024-01-15T10:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'upload',
    title: 'Upload Complete',
    message: 'Your file "Project Assets.zip" has been successfully uploaded',
    createdAt: '2024-01-14T15:45:00Z',
    read: true
  },
  {
    id: '3',
    type: 'team',
    title: 'New Team Member',
    message: 'Jane Smith has joined your organization',
    createdAt: '2024-01-13T09:15:00Z',
    read: true
  }
]

const getIcon = (type: string) => {
  switch (type) {
    case 'download': return Download
    case 'upload': return Upload
    case 'team': return Users
    default: return Bell
  }
}

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your latest activities</p>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => {
          const Icon = getIcon(notification.type)
          return (
            <Card key={notification.id} className={!notification.read ? 'border-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{notification.title}</h3>
                      <div className="flex items-center space-x-2">
                        {!notification.read && <Badge variant="default" className="text-xs">New</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {formatDate(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
