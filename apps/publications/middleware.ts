/**
 * Clerk Middleware
 * Handles authentication for protected routes
 */

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
    // API routes that require auth
    '/api/publications/(.*)/like(.*)',
    '/api/publications/(.*)/comments(.*)',
]);

// Routes that are always public (no auth check)
const isPublicRoute = createRouteMatcher([
    '/',
    '/publications(.*)',
    '/categories(.*)',
    '/about',
    '/sign-in(.*)',
    '/sign-up(.*)',
    // Public API routes
    '/api/publications',
    '/api/publications/(.*)/download',
    '/api/webhooks/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // For protected routes, verify authentication
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
