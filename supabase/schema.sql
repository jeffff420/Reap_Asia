-- ============================================================
-- REAP Asia Ministries — Supabase Database Schema
-- Run this entire script in the Supabase SQL Editor
-- ============================================================

-- ─────────────────────────────────────────
-- 1. THOUGHT OF THE DAY
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS thought_of_day (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  quote_text  TEXT        NOT NULL DEFAULT '',
  scripture_ref TEXT       NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Seed with a default thought so the homepage always has content
INSERT INTO thought_of_day (id, quote_text, scripture_ref)
VALUES (
  1,
  'Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost.',
  'Matthew 28:19'
)
ON CONFLICT (id) DO NOTHING;


-- ─────────────────────────────────────────
-- 2. BLOG POSTS
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id                  BIGSERIAL    PRIMARY KEY,
  title               TEXT         NOT NULL,
  slug                TEXT         NOT NULL UNIQUE,
  featured_image_url  TEXT,
  body                TEXT         NOT NULL DEFAULT '',
  status              TEXT         NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tags                TEXT,
  created_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Index for fast slug lookups on public blog pages
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
-- Index for listing published posts sorted by date
CREATE INDEX IF NOT EXISTS blog_posts_status_created_idx ON blog_posts (status, created_at DESC);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ─────────────────────────────────────────
-- 3. CONTACT MESSAGES
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
  id            BIGSERIAL    PRIMARY KEY,
  name          TEXT         NOT NULL,
  email         TEXT         NOT NULL,
  phone         TEXT,
  message       TEXT         NOT NULL,
  submitted_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────

-- thought_of_day: public can read, only authenticated admin can write
ALTER TABLE thought_of_day ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read thought_of_day"
  ON thought_of_day FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can update thought_of_day"
  ON thought_of_day FOR UPDATE
  TO authenticated
  USING (true);


-- blog_posts: public can read published posts, admin can do anything
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Authenticated can read all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);


-- contact_messages: write-only for public, read for authenticated admin
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated can read contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);


-- ─────────────────────────────────────────
-- 5. STORAGE BUCKET
-- ─────────────────────────────────────────
-- Run this separately in Supabase Dashboard > Storage > New Bucket
-- OR uncomment and run here if using Supabase CLI:

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('blog-images', 'blog-images', true)
-- ON CONFLICT DO NOTHING;

-- Storage policies (run after creating the bucket):
-- CREATE POLICY "Public can view blog images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'blog-images');

-- CREATE POLICY "Authenticated can upload blog images"
--   ON storage.objects FOR INSERT
--   TO authenticated
--   WITH CHECK (bucket_id = 'blog-images');

-- CREATE POLICY "Authenticated can delete blog images"
--   ON storage.objects FOR DELETE
--   TO authenticated
--   USING (bucket_id = 'blog-images');
