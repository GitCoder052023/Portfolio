/**
 * Application Constants
 * Static values used throughout the application
 */

// =============================================================================
// API Routes
// =============================================================================

export const API_ROUTES = {
    publications: '/api/publications',
    publication: (id: string) => `/api/publications/${id}`,
    download: (id: string) => `/api/publications/${id}/download`,
    like: (id: string) => `/api/publications/${id}/like`,
    comments: (id: string) => `/api/publications/${id}/comments`,
    clerkWebhook: '/api/webhooks/clerk',
} as const;

// =============================================================================
// Page Routes
// =============================================================================

export const PAGE_ROUTES = {
    home: '/',
    publications: '/publications',
    publication: (slug: string) => `/publications/${slug}`,
    category: (category: string) => `/categories/${category}`,
    about: '/about',
    signIn: '/sign-in',
    signUp: '/sign-up',
} as const;

// =============================================================================
// Supabase Storage
// =============================================================================

export const STORAGE = {
    bucket: 'publications',
    folders: {
        'research-paper': 'research-papers',
        'thesis': 'theses',
        'idea': 'ideas',
        'proposal': 'proposals',
    },
} as const;

// =============================================================================
// UI Constants
// =============================================================================

export const UI = {
    // Animation durations (in seconds)
    animation: {
        fast: 0.15,
        normal: 0.3,
        slow: 0.5,
    },

    // Breakpoints (matching Tailwind)
    breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    },

    // Max content widths
    maxWidth: {
        content: 1280,
        prose: 768,
    },

    // Toast durations (in ms)
    toast: {
        success: 3000,
        error: 5000,
        info: 4000,
    },
} as const;

// =============================================================================
// SEO Constants
// =============================================================================

export const SEO = {
    titleTemplate: '%s | Hamdan Khubaib',
    defaultTitle: 'Writings — Hamdan Khubaib',
    defaultDescription: 'A public journal of philosophical and scientific inquiry. Research papers, theories, and formal writings on epistemology, consciousness, physics, ethics, and the questions that resist easy answers.',
    keywords: [
        'philosophy',
        'epistemology',
        'consciousness',
        'metaphysics',
        'physics',
        'ethics',
        'logic',
        'computer science',
        'artificial intelligence',
        'formal writings',
        'research',
        'Hamdan Khubaib',
    ],
} as const;

