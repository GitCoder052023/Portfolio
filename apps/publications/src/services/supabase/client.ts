/**
 * Supabase Browser Client
 * Read-only client for use in browser/client components
 * Uses the anon key which respects Row Level Security
 */

import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '@/configs/app.config';

let browserClient: ReturnType<typeof createClient> | null = null;

/**
 * Get the Supabase browser client (singleton)
 * This client uses the anon key and is safe to use on the client side
 */
export function getSupabaseBrowserClient() {
    if (!browserClient) {
        browserClient = createClient(
            supabaseConfig.url,
            supabaseConfig.anonKey,
            {
                auth: {
                    persistSession: false, // We use Clerk for auth, not Supabase Auth
                    autoRefreshToken: false,
                },
            }
        );
    }
    return browserClient;
}

export type SupabaseBrowserClient = ReturnType<typeof getSupabaseBrowserClient>;

