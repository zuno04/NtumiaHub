'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, Play } from 'lucide-react'
import { Content } from '@/types'
import { formatFileSize, formatDate } from '@/lib/utils'

interface ContentDetailModalProps {
  content: Content | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContentDetailModal({ content, open, onOpenChange }: ContentDetailModalProps) {
  if (!content) return null

  const isVideo = content.type === 'video'
  const isAudio = content.type === 'audio'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {(isVideo || isAudio) && (
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <Button variant="outline" size="lg">
                  <Play className="w-6 h-6 mr-2" />
                  Play {isVideo ? 'Video' : 'Audio'}
                </Button>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{content.description}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span>
                <Badge variant="secondary" className="ml-2">{content.type}</Badge>
              </div>
              <div>
                <span className="font-medium">Size:</span>
                <span className="ml-2">{formatFileSize(content.fileSize)}</span>
              </div>
              <div>
                <span className="font-medium">Created:</span>
                <span className="ml-2">{formatDate(content.uploadedAt)}</span>
              </div>
              <div>
                <span className="font-medium">Downloads:</span>
                <span className="ml-2">{content.downloads}</span>
              </div>
            </div>
            
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
