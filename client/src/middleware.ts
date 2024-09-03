import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(req: any) {
    const cookie = cookies();
    const token = cookie.get("token");
    const url = req.nextUrl.clone();

    // If no token is found and user is trying to access auth routes, allow access
    if (!token && (url.pathname === '/auth/login' || url.pathname === '/auth/signup')) {
        return NextResponse.next();
    }

    // If token is found and user is trying to access auth routes, redirect to home
    if (token && (url.pathname === '/auth/login' || url.pathname === '/auth/signup')) {
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // If no token is found and user is trying to access protected routes, redirect to login
    if (!token) {
        url.pathname = '/auth/login'; // Redirect to login page if no token found
        return NextResponse.redirect(url);
    }

    // Allow request to proceed if token exists and not accessing auth routes
    return NextResponse.next();
}

// Apply middleware to specific routes or all routes
export const config = {
    matcher: ['/employees', '/profile', '/auth/login', '/auth/signup'], // Adjust matcher as needed
};
