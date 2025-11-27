import { Button } from '@/components/ui/button'
import { FileX, Upload, Search, Users } from 'lucide-react'

interface EmptyStateProps {
  type: 'no-content' | 'no-uploads' | 'no-search' | 'no-team'
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

const emptyStateConfig = {
  'no-content': {
    icon: FileX,
    title: 'No content found',
    description: 'There are no files in your library yet. Start by uploading your first file.',
    actionLabel: 'Upload Content'
  },
  'no-uploads': {
    icon: Upload,
    title: 'No uploads yet',
    description: 'You haven\'t uploaded any content. Share your media files with your team.',
    actionLabel: 'Upload Now'
  },
  'no-search': {
    icon: Search,
    title: 'No results found',
    description: 'We couldn\'t find any content matching your search. Try different keywords.',
    actionLabel: 'Clear Search'
  },
  'no-team': {
    icon: Users,
    title: 'No team members',
    description: 'Your team is empty. Invite colleagues to collaborate on your projects.',
    actionLabel: 'Invite Members'
  }
}

export function EmptyState({ 
  type, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  const config = emptyStateConfig[type]
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
        <Icon className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">
        {title || config.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {description || config.description}
      </p>
      
      {onAction && (
        <Button onClick={onAction}>
          {actionLabel || config.actionLabel}
        </Button>
      )}
    </div>
  )
}
