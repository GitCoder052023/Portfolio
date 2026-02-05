/**
 * User Types
 * Types for user entities synced from Clerk
 */

// =============================================================================
// Core User Types
// =============================================================================

export interface User {
    id: string;
    clerkId: string;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    avatarUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

// =============================================================================
// User Display Types
// =============================================================================

export interface UserProfile {
    id: string;
    displayName: string;
    avatarUrl: string | null;
}

// =============================================================================
// Database Row Types (raw from Supabase)
// =============================================================================

export interface UserRow {
    id: string;
    clerk_id: string;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

// =============================================================================
// Clerk Webhook Types
// =============================================================================

export interface ClerkUserWebhookData {
    id: string;
    email_addresses: Array<{
        id: string;
        email_address: string;
        verification: { status: string };
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    created_at: number;
    updated_at: number;
}

