/**
 * Clerk User Sync Utility
 * Handles syncing Clerk user data to Supabase
 */

import { upsertUser, deleteUserByClerkId, getUserByClerkId } from '@/database/interactions';
import type { ClerkUserWebhookData } from '@/types';

/**
 * Sync a user from Clerk to Supabase
 * Called from the Clerk webhook handler
 */
export async function syncClerkUser(data: ClerkUserWebhookData) {
    // Get primary email
    const primaryEmail = data.email_addresses
        .find(e => e.verification.status === 'verified')
        ?.email_address || data.email_addresses[0]?.email_address;

    return upsertUser({
        clerkId: data.id,
        email: primaryEmail || null,
        firstName: data.first_name,
        lastName: data.last_name,
        avatarUrl: data.image_url,
    });
}

/**
 * Just-in-time user synchronization
 * Ensures a user exists in the database by fetching from Clerk if necessary
 * Useful for local development where webhooks might not be reachable
 */
export async function ensureUserExists(clerkId: string) {
    // Check if user already exists
    const existingUser = await getUserByClerkId(clerkId);
    if (existingUser) return existingUser;

    // Use a try-catch for fetching from Clerk in case of network errors
    try {
        // Fetch user from Clerk
        const { createClerkClient } = await import('@clerk/nextjs/server');
        const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const clerkUser = await clerk.users.getUser(clerkId);

        if (!clerkUser) return null;

        // Sync to our DB
        const result = await upsertUser({
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || null,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            avatarUrl: clerkUser.imageUrl,
        });

        if (result.success && result.userId) {
            return getUserByClerkId(clerkId);
        }
    } catch (error) {
        console.error('Error in ensureUserExists:', error);
    }

    return null;
}

/**
 * Delete a user from Supabase when deleted from Clerk
 * Called from the Clerk webhook handler
 */
export async function deleteClerkUser(clerkId: string) {
    return deleteUserByClerkId(clerkId);
}


