import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle naked /admin -> /ko/admin (or default)
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/ko/admin', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // '/', '/(ko|en|zh|vi)/:path*', AND '/admin' (for redirect)
  matcher: ['/', '/(ko|en|zh|vi)/:path*', '/admin'],
};
