import { Content, MediaOrganization, PlatformStats, User, Download, Notification, UserStats, TeamMember, DownloadHistoryItem, ActivityItem } from '@/types'
import { addDays, subDays } from 'date-fns'

// Mock Data Generators
const generateId = () => Math.random().toString(36).substr(2, 9)

export const MOCK_MEDIA_ORGS: MediaOrganization[] = [
    {
        id: 'org_1',
        name: 'Canal 2 International',
        type: 'TV',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=C2',
        description: 'Leading private TV channel in Cameroon.',
        responsible: {
            name: 'Jean Dupont',
            email: 'jean@canal2.cm',
            phone: '+237 600000000',
            position: 'Content Director'
        },
        status: 'active',
        createdAt: subDays(new Date(), 365),
        updatedAt: new Date(),
        subscription: 'enterprise',
        storageUsed: 1024 * 1024 * 1024 * 50, // 50GB
        storageLimit: 1024 * 1024 * 1024 * 1000, // 1TB
        uploadCount: 150,
        downloadCount: 500,
        teamMembers: ['user_1', 'user_2']
    },
    {
        id: 'org_2',
        name: 'Equinoxe TV',
        type: 'TV',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=EQ',
        description: 'News and entertainment channel.',
        responsible: {
            name: 'Marie Claire',
            email: 'marie@equinoxe.cm',
            phone: '+237 600000001',
            position: 'Manager'
        },
        status: 'active',
        createdAt: subDays(new Date(), 200),
        updatedAt: new Date(),
        subscription: 'premium',
        storageUsed: 1024 * 1024 * 1024 * 20,
        storageLimit: 1024 * 1024 * 1024 * 500,
        uploadCount: 80,
        downloadCount: 200,
        teamMembers: ['user_3']
    },
    {
        id: 'org_3',
        name: 'Cameroon Tribune',
        type: 'Press',
        logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CT',
        description: 'National daily newspaper.',
        responsible: {
            name: 'Pierre Paul',
            email: 'pierre@cameroon-tribune.cm',
            phone: '+237 600000002',
            position: 'Editor in Chief'
        },
        status: 'pending',
        createdAt: subDays(new Date(), 2),
        updatedAt: new Date(),
        subscription: 'free',
        storageUsed: 0,
        storageLimit: 1024 * 1024 * 1024 * 10,
        uploadCount: 0,
        downloadCount: 0,
        teamMembers: ['user_4']
    }
]

export const MOCK_CONTENT: Content[] = [
    {
        id: 'content_1',
        title: 'Journal 20h - Edition Spéciale',
        description: 'Special coverage of the national day celebration.',
        type: 'video',
        format: 'mp4',
        fileSize: 1024 * 1024 * 500, // 500MB
        duration: 3600, // 1 hour
        thumbnail: 'https://images.unsplash.com/photo-1492619879874-3cead6298fbc?w=800&q=80',
        uploadedBy: 'org_1',
        uploadedByUser: 'user_1',
        uploadedAt: subDays(new Date(), 1),
        language: 'fr',
        license: 'public',
        tags: ['news', 'politics', 'national day'],
        categories: ['News'],
        downloads: 45,
        views: 120,
        rating: 4.5,
        reviewCount: 10,
        status: 'published',
        metadata: {
            resolution: '1080p',
            bitrate: '5Mbps'
        }
    },
    {
        id: 'content_2',
        title: 'Interview Ministre de la Communication',
        description: 'Exclusive interview regarding new media laws.',
        type: 'audio',
        format: 'mp3',
        fileSize: 1024 * 1024 * 50, // 50MB
        duration: 1800, // 30 mins
        thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80',
        uploadedBy: 'org_2',
        uploadedByUser: 'user_3',
        uploadedAt: subDays(new Date(), 5),
        language: 'fr',
        license: 'paid',
        tags: ['politics', 'interview'],
        categories: ['Politics'],
        downloads: 12,
        views: 50,
        rating: 4.0,
        reviewCount: 2,
        status: 'published',
        metadata: {
            bitrate: '320kbps'
        }
    },
    {
        id: 'content_3',
        title: 'Rapport Annuel 2024',
        description: 'PDF report of annual activities.',
        type: 'document',
        format: 'pdf',
        fileSize: 1024 * 1024 * 5, // 5MB
        thumbnail: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80',
        uploadedBy: 'org_1',
        uploadedByUser: 'user_2',
        uploadedAt: subDays(new Date(), 10),
        language: 'en',
        license: 'private',
        tags: ['report', 'finance'],
        categories: ['Business'],
        downloads: 5,
        views: 20,
        rating: 5.0,
        reviewCount: 1,
        status: 'published',
        metadata: {
            author: 'Finance Dept'
        }
    },
    {
        id: 'content_4',
        title: 'Reportage: Inondations à Douala',
        description: 'Images exclusives des dégâts causés par la pluie.',
        type: 'video',
        format: 'mp4',
        fileSize: 1024 * 1024 * 200,
        duration: 120,
        thumbnail: 'https://images.unsplash.com/photo-1545193544-312983719e84?w=800&q=80',
        uploadedBy: 'org_3',
        uploadedByUser: 'user_4',
        uploadedAt: new Date(),
        language: 'fr',
        license: 'public',
        tags: ['news', 'disaster'],
        categories: ['News'],
        downloads: 0,
        views: 0,
        rating: 0,
        reviewCount: 0,
        status: 'draft', // Simulating pending/draft
        metadata: {
            resolution: '1080p'
        }
    }
]

export const MockService = {
    login: async (email: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Determine role based on email
        let role: 'admin' | 'editor' | 'viewer' = 'viewer'
        let name = 'User'
        
        if (email === 'admin@ntumiahub.com') {
            role = 'admin'
            name = 'Admin User'
        } else if (email === 'mod@ntumiahub.com') {
            role = 'editor'
            name = 'Moderator User'
        } else if (email === 'creator@ntumiahub.com') {
            role = 'editor'
            name = 'Creator User'
        } else if (email === 'viewer@ntumiahub.com') {
            role = 'viewer'
            name = 'Viewer User'
        }
        
        const org = MOCK_MEDIA_ORGS.find(o => o.responsible.email === email) || MOCK_MEDIA_ORGS[0]
        const user: User = {
            id: 'user_' + generateId(),
            mediaId: org.id,
            name: name,
            email: email,
            role: role,
            status: 'active',
            createdAt: new Date(),
            lastLogin: new Date()
        }
        return { user, org, token: 'mock_jwt_token_' + generateId() }
    },

    getContent: async (filters?: any) => {
        await new Promise(resolve => setTimeout(resolve, 800))
        return MOCK_CONTENT
    },

    getStats: async (): Promise<PlatformStats> => {
        return {
            totalMedia: 25,
            activeMedia: 20,
            pendingMedia: 5,
            totalContent: 1500,
            totalDownloads: 5000,
            totalStorage: 1024 * 1024 * 1024 * 500, // 500GB
            topContributors: [
                { mediaId: 'org_1', mediaName: 'Canal 2', uploadCount: 150 },
                { mediaId: 'org_2', mediaName: 'Equinoxe', uploadCount: 80 }
            ],
            topDownloads: [
                { contentId: 'content_1', title: 'Journal 20h', downloads: 45 }
            ],
            contentByType: {
                video: 800,
                audio: 400,
                document: 200,
                ad: 100
            },
            activityTimeline: [
                { date: '2024-01-01', uploads: 10, downloads: 50 },
                { date: '2024-01-02', uploads: 15, downloads: 60 }
            ]
        }
    },

    getPendingItems: async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
        return {
            media: MOCK_MEDIA_ORGS.filter(m => m.status === 'pending'),
            content: MOCK_CONTENT.filter(c => c.status === 'draft')
        }
    },

    approveItem: async (id: string, type: 'media' | 'content') => {
        await new Promise(resolve => setTimeout(resolve, 500))
        // In a real app, this would update the DB
        return true
    },

    rejectItem: async (id: string, type: 'media' | 'content') => {
        await new Promise(resolve => setTimeout(resolve, 500))
        return true
    },

    getUsers: async () => {
        await new Promise(resolve => setTimeout(resolve, 500))
        // Generate some mock users based on orgs
        const users: User[] = []
        MOCK_MEDIA_ORGS.forEach(org => {
            org.teamMembers.forEach((memberId, index) => {
                users.push({
                    id: memberId,
                    mediaId: org.id,
                    name: `${org.responsible.name.split(' ')[0]} User ${index + 1}`,
                    email: `user${index + 1}@${org.name.toLowerCase().replace(/\s/g, '')}.cm`,
                    role: index === 0 ? 'admin' : 'editor',
                    status: 'active',
                    createdAt: subDays(new Date(), 30),
                    lastLogin: new Date()
                })
            })
        })
        return users
    },

    updateUser: async (userId: string, data: Partial<User>) => {
        await new Promise(resolve => setTimeout(resolve, 500))
        return true
    },

    getUserStats: async (mediaId: string): Promise<UserStats> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const org = MOCK_MEDIA_ORGS.find(o => o.id === mediaId) || MOCK_MEDIA_ORGS[0]
        return {
            uploads: org.uploadCount,
            downloads: org.downloadCount,
            storageUsed: org.storageUsed,
            storageLimit: org.storageLimit,
            teamMembers: org.teamMembers.length,
            uploadTrend: 12.5,
            downloadTrend: -3.2,
            recentActivity: [
                {
                    id: 'act_1',
                    type: 'upload',
                    userId: 'user_1',
                    userName: 'Jean Dupont',
                    contentId: 'content_1',
                    contentTitle: 'Journal 20h',
                    description: 'a uploadé un nouveau contenu',
                    timestamp: subDays(new Date(), 1),
                },
                {
                    id: 'act_2',
                    type: 'download',
                    userId: 'user_2',
                    userName: 'Marie Claire',
                    contentId: 'content_2',
                    contentTitle: 'Interview Ministre',
                    description: 'a téléchargé un contenu',
                    timestamp: subDays(new Date(), 2),
                }
            ]
        }
    },

    getTeamMembers: async (mediaId: string): Promise<TeamMember[]> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        const org = MOCK_MEDIA_ORGS.find(o => o.id === mediaId)
        if (!org) return []

        return org.teamMembers.map((id, index) => ({
            id,
            name: `${org.responsible.name.split(' ')[0]} User ${index + 1}`,
            email: `user${index + 1}@${org.name.toLowerCase().replace(/\s/g, '')}.cm`,
            role: index === 0 ? 'admin' : index === 1 ? 'editor' : 'viewer',
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
            status: 'active',
            lastActive: subDays(new Date(), Math.floor(Math.random() * 7)),
            invitedAt: subDays(new Date(), 30 + index * 10)
        }))
    },

    inviteTeamMember: async (email: string, role: 'admin' | 'editor' | 'viewer') => {
        await new Promise(resolve => setTimeout(resolve, 800))
        return true
    },

    getUserUploads: async (mediaId: string): Promise<Content[]> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        return MOCK_CONTENT.filter(c => c.uploadedBy === mediaId)
    },

    getDownloadHistory: async (mediaId: string): Promise<DownloadHistoryItem[]> => {
        await new Promise(resolve => setTimeout(resolve, 500))
        return [
            {
                id: 'dl_1',
                contentId: 'content_2',
                contentTitle: 'Interview Ministre de la Communication',
                contentType: 'audio',
                contentThumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77ac6d5?w=800&q=80',
                downloadedBy: mediaId,
                downloadedByUser: 'user_1',
                downloadedByUserName: 'Jean Dupont',
                downloadedAt: subDays(new Date(), 1),
                format: 'mp3',
                fileSize: 1024 * 1024 * 50,
                purpose: 'Reportage spécial'
            },
            {
                id: 'dl_2',
                contentId: 'content_1',
                contentTitle: 'Journal 20h - Edition Spéciale',
                contentType: 'video',
                contentThumbnail: 'https://images.unsplash.com/photo-1492619879874-3cead6298fbc?w=800&q=80',
                downloadedBy: mediaId,
                downloadedByUser: 'user_2',
                downloadedByUserName: 'Marie User',
                downloadedAt: subDays(new Date(), 3),
                format: 'mp4',
                fileSize: 1024 * 1024 * 500
            }
        ]
    },

    getRelatedContent: async (contentId: string): Promise<Content[]> => {
        await new Promise(resolve => setTimeout(resolve, 300))
        const content = MOCK_CONTENT.find(c => c.id === contentId)
        if (!content) return []

        // Return content with similar tags or categories
        return MOCK_CONTENT.filter(c =>
            c.id !== contentId &&
            c.status === 'published' &&
            (c.categories.some(cat => content.categories.includes(cat)) ||
                c.tags.some(tag => content.tags.includes(tag)))
        ).slice(0, 3)
    }
}

