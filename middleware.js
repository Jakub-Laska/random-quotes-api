import { NextResponse } from 'next/server';

const requests = new Map();

export async function middleware(req) {
    if (req.nextUrl.pathname !== '/api/quote') {
        return NextResponse.next();
    }

    const ip = req.ip ?? req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'anonymous';
    const now = Date.now();

    const isBustingCache = req.nextUrl.searchParams.has('t') ||
        req.nextUrl.searchParams.has('nocache') ||
        req.nextUrl.searchParams.has('_');

    if (!isBustingCache) {
        return NextResponse.next();
    }

    let userRequests = requests.get(ip) || [];
    userRequests = userRequests.filter(time => now - time < 60_000);

    if (userRequests.length >= 30) {
        return new NextResponse('429 – Rate limit exceeded. Please wait 60 seconds.', {
            status: 429,
            headers: { 'Content-Type': 'text/plain' },
        });
    }

    userRequests.push(now);
    requests.set(ip, userRequests);

    return NextResponse.next();
}

export const config = {
    matcher: '/api/quote',
};