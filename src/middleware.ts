import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all routes under /dashboard, /play and any other protected routes
     * that should require authentication
     */
    '/dashboard/:path*',
    '/play/:path*',
    
    /*
     * Match auth routes to redirect authenticated users to dashboard
     */
    '/sign-in',
    '/sign-up',
    '/',
    '/verify/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Redirect to dashboard if the user is already authenticated
  // and trying to access sign-in, sign-up, verify or home page
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Check if the user is trying to access a protected route without authentication
  const protectedRoutes = ['/dashboard', '/play'];
  const isProtectedRoute = protectedRoutes.some(route => 
    url.pathname === route || url.pathname.startsWith(`${route}/`));

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}