import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /dashboard)
    const path = request.nextUrl.pathname

    // Define paths that are protected
    const isDashboardPath = path.startsWith('/dashboard')
    const isAdminPath = path.startsWith('/admin')

    // Get the token from the cookies
    // In a real app, you would verify the token here
    // For this mock implementation, we check for the presence of a token cookie
    // or a specific localStorage item (though middleware can't access localStorage directly, 
    // we usually rely on cookies for server-side checks)

    // NOTE: Since we are using client-side Zustand persistence which saves to localStorage,
    // middleware cannot access that. For a production app, we would sync auth state to cookies.
    // For this demo/mock, we will skip strict server-side validation in middleware 
    // or assume a cookie 'auth-token' is set upon login.

    // However, to make this functional for the demo without a real backend/cookie sync:
    // We will check for a simulated cookie or just allow access if we can't verify.
    // BUT, the requirement is to implement protected routes.
    // Let's assume the client sets a cookie 'auth_token' when logging in.

    const token = request.cookies.get('auth_token')?.value

    // If trying to access protected routes without a token
    if ((isDashboardPath || isAdminPath) && !token) {
        // Redirect to login page
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If we have a token, we could decode it to check roles (if it was a JWT)
    // For now, we'll assume if they have a token, they are logged in.
    // Role-based protection would ideally happen here too.

    return NextResponse.next()
}

// Ensure the middleware is only called for relevant paths
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
    ],
}
