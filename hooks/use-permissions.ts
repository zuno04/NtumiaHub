import { UserRole } from '@/types'

const rolePermissions = {
  admin: ['read', 'write', 'delete', 'manage_users', 'manage_content', 'upload'],
  editor: ['read', 'write', 'upload', 'manage_content'],
  viewer: ['read']
} as const

export function usePermissions(userRole: 'admin' | 'editor' | 'viewer') {
  const permissions = rolePermissions[userRole] || []
  
  return {
    canRead: permissions.includes('read'),
    canWrite: permissions.includes('write'),
    canDelete: permissions.includes('delete'),
    canManageUsers: permissions.includes('manage_users'),
    canManageContent: permissions.includes('manage_content'),
    canUpload: permissions.includes('upload'),
    hasPermission: (permission: string) => permissions.includes(permission as any)
  }
}
