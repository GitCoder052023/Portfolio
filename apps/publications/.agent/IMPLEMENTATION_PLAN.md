# Publications Platform - Implementation Plan

## 📋 Project Overview

A professional, formal publication platform for academic and formal writings (research papers, theses, ideas, proposals). This is NOT a casual blog—it's a polished, serious publication app.

### Core Features
- **Public Access**: All content readable/shareable/downloadable without auth
- **Authenticated Actions**: Like/comment requires login (ClerkJS)
- **Content Source**: PDF files stored in Supabase Storage
- **Analytics**: Track downloads per publication
- **UI/UX**: Clean, professional, modern, humanistic design

### Tech Stack
| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Styling | TailwindCSS 4 |
| Animations | Motion (Framer Motion) |
| Toasts | Sonner |
| Backend | Supabase (Storage + PostgreSQL) |
| Auth | ClerkJS + Supabase User Sync |

---

## 🏗️ Architecture: Modular Monolith

```
apps/publications/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth required)
│   │   ├── page.tsx              # Home - Publication listings
│   │   ├── publications/
│   │   │   ├── page.tsx          # All publications list
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Single publication view
│   │   ├── about/
│   │   │   └── page.tsx          # About the author/platform
│   │   └── categories/
│   │       └── [category]/
│   │           └── page.tsx      # Publications by category
│   ├── (auth)/                   # Auth routes
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx
│   │   └── sign-up/[[...sign-up]]/
│   │       └── page.tsx
│   ├── api/                      # API Routes
│   │   ├── publications/
│   │   │   ├── route.ts          # GET all publications
│   │   │   └── [id]/
│   │   │       ├── route.ts      # GET single publication
│   │   │       ├── download/
│   │   │       │   └── route.ts  # Track & serve download
│   │   │       ├── like/
│   │   │       │   └── route.ts  # POST like (auth required)
│   │   │       └── comments/
│   │   │           └── route.ts  # GET/POST comments
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts      # Clerk webhook for user sync
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   └── error.tsx                 # Global error boundary
│
├── components/                   # React Components
│   ├── ui/                       # Primitive UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown.tsx
│   │   └── ... (shadcn/ui components)
│   ├── layout/                   # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── navigation.tsx
│   │   └── container.tsx
│   ├── publications/             # Publication-specific components
│   │   ├── publication-card.tsx
│   │   ├── publication-grid.tsx
│   │   ├── publication-hero.tsx
│   │   ├── publication-meta.tsx
│   │   ├── download-button.tsx
│   │   ├── share-button.tsx
│   │   ├── like-button.tsx
│   │   └── comment-section.tsx
│   ├── auth/                     # Auth-related components
│   │   ├── sign-in-button.tsx
│   │   └── user-button.tsx
│   └── motion/                   # Motion animation wrappers
│       ├── motion-client.tsx     # Client-side motion export
│       ├── fade-in.tsx
│       ├── slide-in.tsx
│       └── stagger-children.tsx
│
├── lib/                          # Core utilities & business logic
│   ├── utils.ts                  # General utilities (cn, etc.)
│   ├── constants.ts              # App constants
│   ├── config.ts                 # Environment configuration
│   ├── supabase/                 # Supabase client & queries
│   │   ├── client.ts             # Browser client (anon key)
│   │   ├── server.ts             # Server client (service role - READ ONLY)
│   │   ├── types.ts              # Database types (generated)
│   │   └── queries/              # Database queries
│   │       ├── publications.ts
│   │       ├── comments.ts
│   │       ├── likes.ts
│   │       ├── downloads.ts
│   │       └── users.ts
│   └── clerk/                    # Clerk utilities
│       └── sync-user.ts          # User sync logic
│
├── types/                        # TypeScript types
│   ├── publication.ts
│   ├── comment.ts
│   ├── user.ts
│   └── database.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-publications.ts
│   ├── use-publication.ts
│   ├── use-comments.ts
│   ├── use-likes.ts
│   └── use-download.ts
│
├── middleware.ts                 # Clerk middleware for auth
│
└── public/                       # Static assets
    ├── fonts/
    └── images/
```

---

## 🗄️ Database Schema (Supabase PostgreSQL)

```sql
-- Publications table (metadata for PDFs)
CREATE TABLE publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  abstract TEXT,
  category VARCHAR(100) NOT NULL,
  -- Categories: 'research-paper' | 'thesis' | 'idea' | 'proposal'
  tags TEXT[], -- Array of tags
  pdf_path VARCHAR(500) NOT NULL, -- Path in Supabase Storage
  pdf_size_bytes BIGINT,
  page_count INTEGER,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE
);

-- Users table (synced from Clerk)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Downloads tracking
CREATE TABLE downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_hash VARCHAR(64), -- Hashed IP for privacy
  country VARCHAR(100),
  referrer VARCHAR(500)
);

-- Likes (requires authentication)
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(publication_id, user_id)
);

-- Comments (requires authentication)
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID REFERENCES publications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- For replies
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE, -- For moderation if needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_publications_slug ON publications(slug);
CREATE INDEX idx_publications_category ON publications(category);
CREATE INDEX idx_publications_published ON publications(is_published, published_at DESC);
CREATE INDEX idx_downloads_publication ON downloads(publication_id);
CREATE INDEX idx_downloads_date ON downloads(downloaded_at);
CREATE INDEX idx_likes_publication ON likes(publication_id);
CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_comments_publication ON comments(publication_id);

-- Views for aggregated data
CREATE VIEW publication_stats AS
SELECT 
  p.id,
  p.slug,
  p.title,
  COUNT(DISTINCT d.id) as download_count,
  COUNT(DISTINCT l.id) as like_count,
  COUNT(DISTINCT c.id) as comment_count
FROM publications p
LEFT JOIN downloads d ON d.publication_id = p.id
LEFT JOIN likes l ON l.publication_id = p.id
LEFT JOIN comments c ON c.publication_id = p.id AND c.is_approved = true
GROUP BY p.id, p.slug, p.title;
```

---

## 🔐 Security Architecture

### Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Publications: Everyone can read published ones
CREATE POLICY "Public can read published publications"
  ON publications FOR SELECT
  USING (is_published = true);

-- Downloads: Anyone can insert (tracking), no one can read/update/delete
CREATE POLICY "Anyone can track downloads"
  ON downloads FOR INSERT
  WITH CHECK (true);

-- Likes: Read all, insert/delete own (via server functions only)
CREATE POLICY "Public can read likes count"
  ON likes FOR SELECT
  USING (true);

-- Comments: Read approved, insert/update/delete via server
CREATE POLICY "Public can read approved comments"
  ON comments FOR SELECT
  USING (is_approved = true);

-- Users: Read public profile info
CREATE POLICY "Public can read user profiles"
  ON users FOR SELECT
  USING (true);
```

### Server Access Strategy
- **Anon Key**: Used for read-only public queries (publications, stats, comments)
- **Service Role Key**: NEVER exposed to client; used ONLY in API routes for:
  - Inserting downloads (tracking)
  - Syncing users from Clerk webhooks
  - Managing likes/comments for authenticated users

---

## 📁 Supabase Storage Structure

```
publications-bucket/
├── research-papers/
│   ├── ai-ethics-study-2024.pdf
│   └── ...
├── theses/
│   ├── distributed-systems-thesis.pdf
│   └── ...
├── ideas/
│   └── ...
└── proposals/
    └── ...
```

### Storage Policies
- **Public Read**: Anyone can download files
- **No Write/Delete**: Only bucket owner (you) via dashboard

---

## 📝 Implementation Phases

### Phase 1: Foundation Setup
1. Install dependencies (Supabase, Clerk, required packages)
2. Configure environment variables
3. Set up Supabase client (read-only)
4. Set up Clerk authentication
5. Create base layout with providers
6. Design system setup (CSS variables, typography, colors)

### Phase 2: Database & Backend
1. Create Supabase tables and policies
2. Implement database queries (read-only)
3. Create API routes for publications
4. Implement download tracking endpoint
5. Set up Clerk webhook for user sync

### Phase 3: Core UI Components
1. Create primitive UI components (Button, Card, Badge, etc.)
2. Build layout components (Header, Footer, Navigation)
3. Create motion wrapper components
4. Build publication card and grid components

### Phase 4: Public Pages
1. Home page with featured publications
2. Publications listing page with filters
3. Single publication view page
4. Category pages
5. About page

### Phase 5: Authentication & Interactions
1. Sign-in/Sign-up pages with Clerk
2. Like functionality (auth required)
3. Comment section (auth required)
4. Share functionality

### Phase 6: Polish & Optimization
1. Loading states and skeletons
2. Error boundaries
3. SEO metadata
4. Performance optimization
5. Accessibility review

---

## 🎨 Design System

### Color Palette (Professional Academic)
```css
:root {
  /* Primary - Deep Scholarly Blue */
  --color-primary-50: #f0f5ff;
  --color-primary-100: #e0ebff;
  --color-primary-500: #3b6cb7;
  --color-primary-600: #2d5398;
  --color-primary-700: #1f3a6a;
  --color-primary-900: #0f1d35;
  
  /* Neutral - Warm Paper Tones */
  --color-neutral-50: #fafaf9;
  --color-neutral-100: #f5f5f4;
  --color-neutral-200: #e7e5e4;
  --color-neutral-800: #292524;
  --color-neutral-900: #1c1917;
  
  /* Accent - Elegant Gold */
  --color-accent-400: #d4a73a;
  --color-accent-500: #b8942d;
}
```

### Typography
- **Headings**: Playfair Display (Serif) - Classic, academic feel
- **Body**: Inter (Sans-serif) - Clean, readable
- **Monospace**: JetBrains Mono - For any code/technical content

### Spacing & Layout
- Content max-width: 1280px
- Consistent padding scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- Card border-radius: 12px
- Subtle shadows for depth

---

## 📦 Dependencies to Install

```bash
# Core
pnpm add @supabase/supabase-js @clerk/nextjs

# Already installed (verify versions)
# motion, sonner, lucide-react, tailwindcss, clsx, tailwind-merge

# UI Components (shadcn)
pnpm dlx shadcn@latest add button card badge skeleton dialog dropdown-menu separator avatar tooltip
```

---

## 🔑 Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server only!

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## ✅ Quality Checklist

- [ ] All API routes verify auth where needed
- [ ] Service role key never exposed to client
- [ ] RLS policies properly configured
- [ ] Error boundaries on all pages
- [ ] Loading states for all async operations
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] SEO meta tags on all pages
- [ ] Mobile responsive
- [ ] No console errors/warnings
- [ ] TypeScript strict mode passes

---

## 🚀 Next Steps

**Ready to begin implementation?** Confirm this plan and I'll start with Phase 1: Foundation Setup.
