import { Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PendingApprovalProps {
  type?: 'user' | 'content' | 'organization'
  className?: string
}

export function PendingApproval({ type = 'content', className }: PendingApprovalProps) {
  return (
    <Badge variant="secondary" className={className}>
      <Clock className="w-3 h-3 mr-1" />
      Pending Approval
    </Badge>
  )
}
