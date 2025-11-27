'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Eye } from 'lucide-react'
import { formatDate, formatFileSize } from '@/lib/utils'

interface ContentVersion {
  id: string
  version: string
  size: number
  createdAt: string
  changes: string
  isCurrent: boolean
}

interface VersionHistoryProps {
  contentId: string
  versions?: ContentVersion[]
}

export function VersionHistory({ contentId, versions = [] }: VersionHistoryProps) {
  const mockVersions: ContentVersion[] = [
    {
      id: '1',
      version: '2.1',
      size: 15728640,
      createdAt: '2024-01-15T10:30:00Z',
      changes: 'Updated audio quality and fixed sync issues',
      isCurrent: true
    },
    {
      id: '2',
      version: '2.0',
      size: 14680064,
      createdAt: '2024-01-10T14:20:00Z',
      changes: 'Major update with new content sections',
      isCurrent: false
    },
    {
      id: '3',
      version: '1.5',
      size: 12582912,
      createdAt: '2024-01-05T09:15:00Z',
      changes: 'Minor bug fixes and improvements',
      isCurrent: false
    }
  ]

  const displayVersions = versions.length > 0 ? versions : mockVersions

  return (
    <Card>
      <CardHeader>
        <CardTitle>Version History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayVersions.map((version) => (
          <div key={version.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium">v{version.version}</span>
                {version.isCurrent && <Badge variant="default">Current</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{version.changes}</p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span>{formatDate(version.createdAt)}</span>
                <span>{formatFileSize(version.size)}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
