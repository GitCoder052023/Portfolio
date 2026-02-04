/**
 * Clerk User Sync Utility
 * Handles syncing Clerk user data to Supabase
 */

import { upsertUser, deleteUserByClerkId } from '@/lib/supabase/queries';
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
 * Delete a user from Supabase when deleted from Clerk
 * Called from the Clerk webhook handler
 */
export async function deleteClerkUser(clerkId: string) {
    return deleteUserByClerkId(clerkId);
}
