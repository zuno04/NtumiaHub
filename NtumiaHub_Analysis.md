# Advanced Next.js Frontend Development Prompt for Inter-Media Collaborative Platform

You are an expert full-stack developer specializing in building production-ready Next.js applications with exceptional UI/UX. Build a complete, polished frontend for an inter-media content sharing platform based on the specifications provided.

## Project Overview
Create a secure, collaborative web platform where media organizations (TV, radio, press, web media) can share and exchange content (videos, audio, text, ads) with full traceability, access management, and administrative validation.

## Core Technical Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Components**: shadcn/ui (all relevant components)
- **Styling**: Tailwind CSS with custom theming via Tweakcn
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: JWT-based (mock for now, backend-ready)

## Critical Requirements

### 1. Authentication & Authorization
Build a complete auth system with:
- **Login page**: Clean, modern design with email/password, remember me, forgot password
- **Registration page**: Multi-step form for media organizations with:
  - Organization details (name, type, logo upload)
  - Contact information (responsible person, email, phone)
  - Supporting documents upload (.pdf, .jpg)
  - Terms acceptance checkbox
  - Form validation using Zod schemas
- **Password reset flow**: Email link → reset form
- **Protected routes**: Implement route guards using Next.js middleware
- **Role-based access**: Support roles (Admin, Media, User)
- **Session management**: JWT token handling with automatic refresh
- **Pending approval state**: Special UI for accounts awaiting admin validation

### 2. Theme System (Tweakcn Integration)
Implement a sophisticated theming system:
- Create **3-5 custom themes** using Tweakcn (avoid typical shadcn appearance)
- Themes should include: Default, Dark Mode, High Contrast, Custom Brand themes
- **Theme switcher** in user settings with live preview
- Persist theme preference in localStorage and user profile
- Smooth theme transitions with CSS variables
- Support for system preference detection

### 3. User Dashboard (Media Organizations)
Create a comprehensive dashboard with:
- **Overview cards**: Total uploads, downloads, storage used, activity stats
- **Recent activity feed**: Latest uploads, downloads, notifications
- **Quick actions**: Upload content, browse library, view analytics
- **Content library**: Grid/list view toggle with infinite scroll
- **Upload statistics chart**: Weekly/monthly trends using recharts
- **Storage quota indicator**: Visual progress bar with percentage

### 4. Admin Dashboard
Leverage shadcn-admin structure with:
- **Pending approvals**: Queue of media registration requests with approve/reject actions
- **Media management table**: Searchable, sortable DataTable with actions (activate, deactivate, edit, delete)
- **Content moderation**: Review uploaded content, flag inappropriate items
- **Analytics dashboard**: 
  - Top contributors chart
  - Most downloaded content
  - Platform usage metrics
  - User growth trends
- **System logs viewer**: Filterable activity logs with export functionality
- **Settings panel**: Platform configuration (upload limits, allowed formats, notification settings)
- **User management**: Create/edit admin users, assign permissions

### 5. Content Upload System
Build a sophisticated upload interface:
- **Drag & drop zone** with multiple file support
- **File type validation**: Videos (.mp4, .mov), Audio (.mp3, .wav), Documents (.pdf, .txt), Ads
- **Upload progress indicators**: Individual file progress bars
- **Metadata form** (appears after upload):
  - Title (required)
  - Description (rich text editor)
  - Content type selector
  - Date picker
  - Duration (auto-detect for media, manual input option)
  - Language selector (multi-language support)
  - License/rights dropdown (Free, Paid, Private, Public)
  - Tags/categories (multi-select)
- **Thumbnail generation**: Auto-generate for videos, upload option for custom
- **Bulk upload support**: Upload multiple files with shared metadata
- **Draft saving**: Save incomplete uploads as drafts

### 6. Content Discovery & Download
Create an intuitive browsing experience:
- **Search bar** with autocomplete suggestions
- **Advanced filters** sidebar:
  - Content type (checkboxes)
  - Media source (multi-select)
  - Date range picker
  - Format filter
  - Language filter
  - License type
- **Sort options**: Recent, Popular, Most downloaded, Alphabetical
- **Content cards**: Thumbnail, title, media source, duration, download count, rating
- **Detail modal/page**: 
  - Full metadata display
  - Preview player (video/audio)
  - Download button with format options
  - Related content suggestions
  - Comments/feedback section
  - Share functionality
- **Download tracking**: Log who downloaded what and when
- **Favorites/Bookmarks**: Save content for later

### 7. Interaction Tracking & Analytics
Implement comprehensive tracking:
- **Upload history table**: Your uploads with views, downloads, feedback
- **Download history table**: Content you've downloaded with timestamps
- **Statistics visualizations**:
  - Line charts for activity over time
  - Bar charts for content type distribution
  - Pie charts for license breakdown
- **Leaderboards**: Top contributors, most active media organizations
- **Rating system**: 5-star ratings with reviews
- **Feedback mechanism**: Text feedback on downloaded content

### 8. Notifications System
Create a robust notification center:
- **Bell icon** with unread count badge
- **Notification dropdown**: Recent notifications with mark as read
- **Notification types**:
  - Your content was downloaded (with details)
  - Admin approved your account
  - New content from followed media
  - Comment on your content
  - System announcements
- **Email preferences**: Toggle email notifications per type
- **In-app toast notifications**: For real-time events
- **Notification history page**: All notifications with filters

### 9. User Settings & Profile
Comprehensive settings interface:
- **Profile tab**: 
  - Organization logo upload
  - Organization details form
  - Contact information
  - Social media links
- **Account tab**: 
  - Change password form
  - Email preferences
  - Two-factor authentication toggle (UI only)
- **Appearance tab**: 
  - Theme selector with previews
  - Font size adjustment
  - Compact/comfortable view toggle
- **Notifications tab**: Granular notification preferences
- **Privacy tab**: Data visibility settings, download history privacy
- **Team management tab**: 
  - Add/remove users under same organization
  - Assign roles (Admin, Editor, Viewer)
  - User activity logs

### 10. Multi-User Management (Sub-accounts)
- **Team members table**: List users under the organization
- **Invite modal**: Send invitation emails
- **Role assignment**: Dropdown with permissions preview
- **User detail view**: Activity history, permissions management
- **Bulk actions**: Activate/deactivate multiple users

## Data Structure (Mock Data)

Create TypeScript interfaces and generate realistic mock data for:

```typescript
// User/Media Organization
interface MediaOrganization {
  id: string;
  name: string;
  type: 'TV' | 'Radio' | 'Press' | 'WebMedia' | 'WebTV';
  logo: string;
  responsible: {
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'active' | 'inactive';
  createdAt: Date;
  subscription: 'free' | 'premium';
  storageUsed: number;
  storageLimit: number;
}

// Content
interface Content {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'audio' | 'document' | 'ad';
  format: string;
  fileSize: number;
  duration?: number; // seconds
  thumbnail: string;
  uploadedBy: string; // mediaId
  uploadedAt: Date;
  language: string;
  license: 'free' | 'paid' | 'private' | 'public';
  tags: string[];
  downloads: number;
  views: number;
  rating: number;
  reviewCount: number;
}

// Download History
interface Download {
  id: string;
  contentId: string;
  downloadedBy: string;
  downloadedAt: Date;
  format: string;
}

// Notification
interface Notification {
  id: string;
  userId: string;
  type: 'download' | 'approval' | 'comment' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
```

Generate 50+ mock content items, 20+ media organizations, 100+ download records, and 30+ notifications.

## UI/UX Excellence

### Design Principles
- **Modern & Clean**: Minimize clutter, maximize whitespace
- **Intuitive Navigation**: Breadcrumbs, clear hierarchy, contextual actions
- **Responsive**: Perfect on mobile, tablet, desktop (mobile-first approach)
- **Accessible**: WCAG 2.1 AA compliance, keyboard navigation, screen reader friendly
- **Fast**: Optimistic UI updates, skeleton loaders, instant feedback
- **Delightful**: Micro-interactions, smooth animations, thoughtful empty states

### Animation Strategy
Use Framer Motion for:
- **Page transitions**: Subtle fade/slide between routes
- **Modal animations**: Scale up from trigger element
- **List animations**: Stagger children on mount
- **Hover effects**: Scale, shadow, color transitions
- **Loading states**: Skeleton screens, shimmer effects
- **Success/error feedback**: Checkmark/error icon animations
- **Drag & drop**: Visual feedback during drag operations

### Component Usage (shadcn/ui)
Utilize these components throughout:
- Dialog, Sheet, Drawer for overlays
- Form, Input, Textarea, Select, Checkbox, Radio Group for forms
- Button, Badge, Avatar for UI elements
- Card for content containers
- Table, DataTable for listings
- Tabs for organization
- Dropdown Menu for actions
- Toast for notifications
- Progress for upload/loading states
- Calendar, Date Picker for date inputs
- Combobox for searchable selects
- Separator for visual division
- Tooltip for helpful hints
- ScrollArea for constrained content
- Accordion for FAQ/collapsible sections

## Code Quality Standards

- **TypeScript**: Strict mode, proper typing, no `any`
- **File Structure**: Feature-based organization (`/features/auth`, `/features/content`, etc.)
- **Component Patterns**: Server Components by default, Client Components only when needed
- **API Integration**: Create `/lib/api` with typed fetch wrappers ready for backend connection
- **Error Handling**: Comprehensive error boundaries, user-friendly error messages
- **Loading States**: Suspense boundaries, loading skeletons for all async operations
- **Form Validation**: Zod schemas with detailed error messages
- **State Management**: Zustand stores for global state (auth, theme, notifications)
- **Code Reusability**: Custom hooks for common patterns (`useAuth`, `useUpload`, `useNotifications`)
- **Comments**: JSDoc for complex functions, inline comments for clarity
- **Performance**: Image optimization, lazy loading, code splitting, memoization where needed

## Security Considerations (Frontend)

- **Input sanitization**: Prevent XSS in user-generated content
- **CSRF protection**: Ready for backend token implementation
- **Secure storage**: Store tokens in httpOnly cookies (simulation)
- **Route protection**: Middleware checks for auth + role
- **File upload validation**: Client-side type/size checks before upload
- **Content Security Policy**: Configure headers appropriately

## Deployment Readiness

- **Environment variables**: `.env.local` template with all required vars
- **API endpoints**: Centralized in `/lib/config` for easy backend integration
- **Docker**: Include Dockerfile for containerization
- **Documentation**: README with setup instructions, architecture overview, component catalog

## Deliverables

1. **Complete Next.js application** with all features implemented
2. **Mock data generators** in `/lib/mock-data`
3. **API service layer** in `/lib/api` (using fetch, ready for real endpoints)
4. **Zustand stores** for auth, theme, notifications, content
5. **Custom hooks library** in `/hooks`
6. **Comprehensive README** with:
   - Setup instructions
   - Project structure explanation
   - Feature checklist
   - Backend integration guide
   - Deployment notes
7. **TypeScript interfaces** in `/types`
8. **Utility functions** in `/lib/utils`

## Additional Features (Enhancements)

- **Progressive Web App (PWA)**: Service worker for offline access to cached content
- **Keyboard shortcuts**: Quick actions (Ctrl+K for search, etc.)
- **Export functionality**: Download analytics as CSV/PDF
- **Collaborative features**: Comments, mentions, shared collections
- **Content versioning**: Upload new versions of existing content
- **Advanced search**: Boolean operators, saved searches
- **API rate limiting UI**: Show rate limit status to users
- **Batch operations**: Bulk download, bulk delete, bulk metadata edit
- **Activity timeline**: Visual timeline of platform activity
- **Onboarding tour**: Interactive guide for new users (using Intro.js or custom)
- **Language switching**: i18n setup with French/English support
- **Breadcrumb navigation**: Always show current location in hierarchy
- **Contextual help**: Info tooltips throughout the interface

## Success Criteria

The application should:
✅ Load in under 2 seconds on average connection
✅ Be fully responsive (320px to 4K displays)
✅ Have zero console errors or warnings
✅ Pass Lighthouse audit (90+ in all categories)
✅ Be production-ready with clean, maintainable code
✅ Look unique and polished (not like typical shadcn apps)
✅ Have smooth, purposeful animations throughout
✅ Be ready to connect to backend with minimal changes
✅ Provide excellent UX with clear feedback for all user actions
✅ Handle edge cases gracefully (empty states, errors, loading)

Build this as if it's launching to thousands of media professionals tomorrow. Every detail matters. Every interaction should feel polished. Make it remarkable.
