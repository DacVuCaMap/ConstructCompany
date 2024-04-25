
import { userData } from '@/data/authenticate';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { boolean } from 'yup';

export function middleware(request: NextRequest) {
    const cookie = cookies();
    const loggedIn = cookie.get('jwt')?.value
    if (!loggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/customer/:path*','/product/:path*','/payment/:path*','/statistic/:path*','/invoice/:path*','/admin/:path*','/get-config'],
};