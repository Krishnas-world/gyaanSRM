import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || '';

    // Auth pages (login, register, verify email)
    const isAuthPage = path === '/login' || path === '/register' || path === '/verifyemail';

    // If the user is logged in and tries to access auth pages, redirect them to /profile
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

    // Protected routes (excluding "/")
    const isProtectedRoute = path.startsWith('/profile') || path.startsWith('/edit');

    // If a protected route is accessed without a token, redirect to /login
    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Allow access to everything else (including "/")
    return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/edit/:path*', '/login', '/register', '/verifyemail', '/']
};
