export type UserRole = 'admin' | 'editor' | 'viewer';

export interface MediaOrganization {
    id: string;
    name: string;
    type: 'TV' | 'Radio' | 'Press' | 'WebMedia' | 'WebTV';
    logo: string;
    description: string;
    responsible: {
        name: string;
        email: string;
        phone: string;
        position: string;
    };
    status: 'pending' | 'active' | 'inactive' | 'suspended';
    createdAt: Date;
    updatedAt: Date;
    subscription: 'free' | 'premium' | 'enterprise';
    storageUsed: number; // bytes
    storageLimit: number; // bytes
    uploadCount: number;
    downloadCount: number;
    teamMembers: string[]; // user IDs
}

export interface User {
    id: string;
    mediaId: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    avatar?: string;
    status: 'active' | 'inactive';
    lastLogin?: Date;
    createdAt: Date;
}

export interface Content {
    id: string;
    title: string;
    description: string;
    type: 'video' | 'audio' | 'document' | 'ad';
    format: string; // mp4, mp3, pdf, etc.
    fileSize: number; // bytes
    duration?: number; // seconds for video/audio
    thumbnail: string;
    uploadedBy: string; // mediaId
    uploadedByUser: string; // userId
    uploadedAt: Date;
    language: string;
    license: 'free' | 'paid' | 'private' | 'public';
    tags: string[];
    categories: string[];
    downloads: number;
    views: number;
    rating: number; // 0-5
    reviewCount: number;
    status: 'draft' | 'published' | 'archived' | 'flagged';
    metadata: {
        resolution?: string; // for video
        bitrate?: string; // for audio/video
        author?: string;
        copyright?: string;
    };
}

export interface Download {
    id: string;
    contentId: string;
    downloadedBy: string; // mediaId
    downloadedByUser: string; // userId
    downloadedAt: Date;
    format: string;
    ipAddress?: string;
}

export interface Notification {
    id: string;
    userId: string;
    type: 'download' | 'approval' | 'comment' | 'mention' | 'system';
    title: string;
    message: string;
    read: boolean;
    createdAt: Date;
    actionUrl?: string;
    metadata?: Record<string, any>;
}

export interface Comment {
    id: string;
    contentId: string;
    userId: string;
    text: string;
    createdAt: Date;
    updatedAt?: Date;
    mentions: string[]; // user IDs
    likes: number;
}

export interface Review {
    id: string;
    contentId: string;
    userId: string;
    rating: number; // 1-5
    comment?: string;
    createdAt: Date;
}

export interface PlatformStats {
    totalMedia: number;
    activeMedia: number;
    pendingMedia: number;
    totalContent: number;
    totalDownloads: number;
    totalStorage: number;
    topContributors: Array<{
        mediaId: string;
        mediaName: string;
        uploadCount: number;
    }>;
    topDownloads: Array<{
        contentId: string;
        title: string;
        downloads: number;
    }>;
    contentByType: Record<string, number>;
    activityTimeline: Array<{
        date: string;
        uploads: number;
        downloads: number;
    }>;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    avatar?: string;
    status: 'active' | 'pending' | 'inactive';
    lastActive?: Date;
    invitedBy?: string;
    invitedAt: Date;
}

export interface ActivityItem {
    id: string;
    type: 'upload' | 'download' | 'comment' | 'approval' | 'team_invite' | 'edit';
    userId: string;
    userName: string;
    userAvatar?: string;
    contentId?: string;
    contentTitle?: string;
    description: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}

export interface UserStats {
    uploads: number;
    downloads: number;
    storageUsed: number;
    storageLimit: number;
    teamMembers: number;
    recentActivity: ActivityItem[];
    uploadTrend: number; // percentage change
    downloadTrend: number;
}

export interface DownloadHistoryItem {
    id: string;
    contentId: string;
    contentTitle: string;
    contentType: 'video' | 'audio' | 'document' | 'ad';
    contentThumbnail: string;
    downloadedBy: string;
    downloadedByUser: string;
    downloadedByUserName: string;
    downloadedAt: Date;
    format: string;
    fileSize: number;
    purpose?: string;
}
