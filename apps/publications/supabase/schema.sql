-- =============================================================================
-- PUBLICATIONS PLATFORM - DATABASE SCHEMA
-- =============================================================================
-- Run this in your Supabase SQL Editor to set up the database
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABLES
-- =============================================================================

-- Publications table (metadata for PDFs)
CREATE TABLE IF NOT EXISTS publications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  abstract TEXT,
  category VARCHAR(100) NOT NULL CHECK (category IN ('research-paper', 'thesis', 'idea', 'proposal')),
  tags TEXT[] DEFAULT '{}',
  pdf_path VARCHAR(500) NOT NULL,
  pdf_size_bytes BIGINT,
  page_count INTEGER,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE
);

-- Users table (synced from Clerk)
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_hash VARCHAR(64),
  country VARCHAR(100),
  referrer VARCHAR(500)
);

-- Likes (requires authentication)
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(publication_id, user_id)
);

-- Comments (requires authentication)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  publication_id UUID NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) >= 1 AND char_length(content) <= 2000),
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_publications_slug ON publications(slug);
CREATE INDEX IF NOT EXISTS idx_publications_category ON publications(category);
CREATE INDEX IF NOT EXISTS idx_publications_published ON publications(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_publications_featured ON publications(is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_downloads_publication ON downloads(publication_id);
CREATE INDEX IF NOT EXISTS idx_downloads_date ON downloads(downloaded_at);
CREATE INDEX IF NOT EXISTS idx_likes_publication ON likes(publication_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_publication ON comments(publication_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);

-- =============================================================================
-- VIEWS
-- =============================================================================

-- Publication stats aggregation view
CREATE OR REPLACE VIEW publication_stats AS
SELECT 
  p.id,
  p.slug,
  p.title,
  COALESCE(d.download_count, 0)::INTEGER as download_count,
  COALESCE(l.like_count, 0)::INTEGER as like_count,
  COALESCE(c.comment_count, 0)::INTEGER as comment_count
FROM publications p
LEFT JOIN (
  SELECT publication_id, COUNT(*) as download_count
  FROM downloads
  GROUP BY publication_id
) d ON d.publication_id = p.id
LEFT JOIN (
  SELECT publication_id, COUNT(*) as like_count
  FROM likes
  GROUP BY publication_id
) l ON l.publication_id = p.id
LEFT JOIN (
  SELECT publication_id, COUNT(*) as comment_count
  FROM comments
  WHERE is_approved = TRUE
  GROUP BY publication_id
) c ON c.publication_id = p.id;

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

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

-- Users: Read public profile info
CREATE POLICY "Public can read user profiles"
  ON users FOR SELECT
  USING (true);

-- Users: Service role can manage
CREATE POLICY "Service role can manage users"
  ON users FOR ALL
  USING (auth.role() = 'service_role');

-- Downloads: Anyone can insert (tracking), only service role can read
CREATE POLICY "Anyone can track downloads"
  ON downloads FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can read downloads"
  ON downloads FOR SELECT
  USING (auth.role() = 'service_role');

-- Likes: Read all, service role manages
CREATE POLICY "Public can read likes"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage likes"
  ON likes FOR ALL
  USING (auth.role() = 'service_role');

-- Comments: Read approved, service role manages
CREATE POLICY "Public can read approved comments"
  ON comments FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Service role can manage comments"
  ON comments FOR ALL
  USING (auth.role() = 'service_role');

-- =============================================================================
-- STORAGE BUCKET
-- =============================================================================

-- Create the publications storage bucket (run separately if needed)
INSERT INTO storage.buckets (id, name, public)
VALUES ('publications', 'publications', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: Public read access
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'publications');

-- =============================================================================
-- SAMPLE DATA (OPTIONAL - for testing)
-- =============================================================================

-- Uncomment and run this to add sample data for testing:
/*
INSERT INTO publications (slug, title, description, abstract, category, tags, pdf_path, is_featured)
VALUES 
(
  'sample-research-paper',
  'A Sample Research Paper on Modern Web Development',
  'An exploration of contemporary web development practices and their impact on user experience.',
  'This paper examines the evolution of web development methodologies from traditional server-rendered applications to modern client-side frameworks. We analyze the trade-offs between developer experience and end-user performance, proposing a balanced approach that leverages the strengths of both paradigms.',
  'research-paper',
  ARRAY['web development', 'frontend', 'performance'],
  'research-papers/sample-paper.pdf',
  true
),
(
  'thesis-on-distributed-systems',
  'Distributed Systems Architecture: A Comprehensive Study',
  'A doctoral thesis exploring scalable distributed system architectures.',
  'This thesis presents a comprehensive analysis of distributed system patterns, focusing on consistency models, fault tolerance, and horizontal scalability. Through empirical studies and theoretical models, we propose novel approaches to building resilient distributed applications.',
  'thesis',
  ARRAY['distributed systems', 'scalability', 'architecture'],
  'theses/distributed-systems.pdf',
  true
),
(
  'idea-sustainable-computing',
  'Sustainable Computing: Reducing Digital Carbon Footprint',
  'An idea paper on environmentally conscious software development.',
  'This paper presents innovative ideas for reducing the environmental impact of software systems. We explore energy-efficient algorithms, sustainable cloud practices, and metrics for measuring digital carbon footprint.',
  'idea',
  ARRAY['sustainability', 'green computing', 'environment'],
  'ideas/sustainable-computing.pdf',
  false
);
*/

-- =============================================================================
-- NOTES
-- =============================================================================
-- 
-- 1. Storage Setup:
--    - Create a bucket named 'publications' in Supabase Storage
--    - Enable public access for the bucket
--    - Upload PDFs with paths like: research-papers/paper-slug.pdf
--
-- 2. Clerk Webhook:
--    - Set up webhook in Clerk dashboard pointing to /api/webhooks/clerk
--    - Subscribe to: user.created, user.updated, user.deleted events
--    - Add CLERK_WEBHOOK_SECRET to environment variables
--
-- 3. Environment Variables Required:
--    - NEXT_PUBLIC_SUPABASE_URL
--    - NEXT_PUBLIC_SUPABASE_ANON_KEY
--    - SUPABASE_SERVICE_ROLE_KEY (server only)
--    - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
--    - CLERK_SECRET_KEY
--    - CLERK_WEBHOOK_SECRET
