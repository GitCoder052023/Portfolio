/**
 * Users Queries
 * Database operations for user management (synced from Clerk)
 */

import { getSupabaseServerClient, getSupabaseAdminClient } from '../server';
import type { User, UserRow } from '@/types';

// =============================================================================
// Row to Entity Transformers
// =============================================================================

function transformUserRow(row: UserRow): User {
    return {
        id: row.id,
        clerkId: row.clerk_id,
        email: row.email,
        firstName: row.first_name,
        lastName: row.last_name,
        avatarUrl: row.avatar_url,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

// =============================================================================
// Read Operations (using anon key)
// =============================================================================

/**
 * Get user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string): Promise<User | null> {
    const supabase = getSupabaseServerClient();

    const { data: row, error } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', clerkId)
        .maybeSingle();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return row ? transformUserRow(row as UserRow) : null;
}

/**
 * Get user by database ID
 */
export async function getUserById(id: string): Promise<User | null> {
    const supabase = getSupabaseServerClient();

    const { data: row, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }

    return row ? transformUserRow(row as UserRow) : null;
}

// =============================================================================
// Write Operations (using service role key - server only!)
// These are used by Clerk webhooks to sync user data
// =============================================================================

interface UpsertUserParams {
    clerkId: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
}

/**
 * Create or update a user from Clerk data
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function upsertUser(
    params: UpsertUserParams
): Promise<{ success: boolean; userId?: string; error?: string }> {
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
        .from('users')
        .upsert(
            {
                clerk_id: params.clerkId,
                email: params.email || null,
                first_name: params.firstName || null,
                last_name: params.lastName || null,
                avatar_url: params.avatarUrl || null,
                updated_at: new Date().toISOString(),
            },
            {
                onConflict: 'clerk_id',
            }
        )
        .select('id')
        .single();

    if (error) {
        console.error('Error upserting user:', error);
        return { success: false, error: 'Failed to sync user' };
    }

    return { success: true, userId: data.id };
}

/**
 * Delete a user by Clerk ID
 * 
 * ⚠️ SERVER ONLY: Uses admin client with service role key
 */
export async function deleteUserByClerkId(
    clerkId: string
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseAdminClient();

    const { error } = await supabase
        .from('users')
        .delete()
        .eq('clerk_id', clerkId);

    if (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }

    return { success: true };
}
