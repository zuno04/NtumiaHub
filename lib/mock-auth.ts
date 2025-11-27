// Mock credentials for testing
export const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@ntumiahub.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Admin User'
  },
  moderator: {
    email: 'mod@ntumiahub.com', 
    password: 'mod123',
    role: 'moderator' as const,
    name: 'Moderator User'
  },
  creator: {
    email: 'creator@ntumiahub.com',
    password: 'creator123', 
    role: 'creator' as const,
    name: 'Creator User'
  },
  viewer: {
    email: 'viewer@ntumiahub.com',
    password: 'viewer123',
    role: 'viewer' as const,
    name: 'Viewer User'
  }
}

export function mockLogin(email: string, password: string) {
  const user = Object.values(TEST_CREDENTIALS).find(
    u => u.email === email && u.password === password
  )
  return user || null
}
