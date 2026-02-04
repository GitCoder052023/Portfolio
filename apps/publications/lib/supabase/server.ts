/**
 * Supabase Server Client
 * Used in API routes and Server Components
 * 
 * ⚠️ SECURITY: This file contains functions that use the service role key.
 * NEVER import this file in client components or expose its functions to the client.
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/lib/config';

/**
 * Get a read-only Supabase server client using the anon key
 * Use this for server-side rendering where you want to respect RLS
 */
export function getSupabaseServerClient() {
    return createClient(
        supabaseConfig.url,
        supabaseConfig.anonKey,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );
}

/**
 * Get a privileged Supabase admin client using the service role key
 * 
 * ⚠️ SECURITY WARNING: This client bypasses Row Level Security!
 * Only use in trusted server-side contexts:
 * - API routes for writes (downloads tracking, likes, comments)
 * - Clerk webhooks for user sync
 * 
 * NEVER expose this client or its results directly to the client.
 */
export function getSupabaseAdminClient() {
    return createClient(
        supabaseConfig.url,
        supabaseConfig.serviceRoleKey,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
            },
        }
    );
}

export type SupabaseServerClient = ReturnType<typeof getSupabaseServerClient>;
export type SupabaseAdminClient = ReturnType<typeof getSupabaseAdminClient>;
