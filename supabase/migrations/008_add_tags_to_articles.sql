-- Add tags column to articles table
ALTER TABLE articles
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create index for tag searches
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);

