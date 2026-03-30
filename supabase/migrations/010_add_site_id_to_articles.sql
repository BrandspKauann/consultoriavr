-- Multi-site: same Supabase project, partition articles by site_id
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS site_id TEXT NOT NULL DEFAULT 'default';

COMMENT ON COLUMN articles.site_id IS 'Identificador do site (ex.: vr-consultoria). Cada front usa VITE_SITE_ID; o admin lista troca com VITE_ADMIN_SITES.';

CREATE INDEX IF NOT EXISTS idx_articles_site_id ON articles(site_id);
CREATE INDEX IF NOT EXISTS idx_articles_site_published ON articles(site_id, published);
CREATE INDEX IF NOT EXISTS idx_articles_site_featured ON articles(site_id, featured, published);

-- Slug único por site (antes era global)
DROP INDEX IF EXISTS idx_articles_slug;
CREATE UNIQUE INDEX IF NOT EXISTS idx_articles_site_slug
  ON articles(site_id, slug)
  WHERE slug IS NOT NULL;
