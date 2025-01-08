import { COOKIE_GITHUB_TOKEN } from '@/features/auth/definitions';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes
const protectedRoutes = ['/search', '/history'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_GITHUB_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  // Check if the route is protected and there's no token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const signInUrl = new URL('/signin', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If there's a token and the user is trying to access signin, redirect to search
  if (token && (pathname === '/signin' || pathname === '/')) {
    const searchUrl = new URL('/search', request.url);
    return NextResponse.redirect(searchUrl);
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: ['/', '/signin', '/search', '/visualization/:path*'],
};
