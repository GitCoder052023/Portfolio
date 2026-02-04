/**
 * Application Configuration
 * Centralized configuration with runtime validation
 */

// =============================================================================
// Environment Variables
// =============================================================================

function getEnvVar(key: string, required: boolean = true): string {
  const value = process.env[key];
  return value || '';
}

// =============================================================================
// Supabase Configuration
// =============================================================================

export const supabaseConfig = {
  url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  // Service role key is only available server-side
  get serviceRoleKey() {
    if (typeof window !== 'undefined') {
      throw new Error('Service role key cannot be accessed on the client');
    }
    return getEnvVar('SUPABASE_SERVICE_ROLE_KEY');
  },
} as const;

// =============================================================================
// Clerk Configuration
// =============================================================================

export const clerkConfig = {
  publishableKey: getEnvVar('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  signInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in',
  signUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up',
} as const;

// =============================================================================
// Application Configuration
// =============================================================================

export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Publications',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  authorName: process.env.NEXT_PUBLIC_AUTHOR_NAME || 'Author',
  
  // Publication categories
  categories: [
    { id: 'research-paper', label: 'Research Papers', description: 'Academic research and studies' },
    { id: 'thesis', label: 'Theses', description: 'Doctoral and masters theses' },
    { id: 'idea', label: 'Ideas', description: 'Conceptual explorations and ideations' },
    { id: 'proposal', label: 'Proposals', description: 'Project proposals and plans' },
  ] as const,
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 12,
    maxPageSize: 50,
  },
} as const;

// =============================================================================
// Type Exports
// =============================================================================

export type CategoryId = typeof appConfig.categories[number]['id'];
