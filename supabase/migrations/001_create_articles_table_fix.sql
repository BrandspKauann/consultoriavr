-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  type TEXT NOT NULL CHECK (type IN ('article', 'video')),
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  external_url TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published, order_index);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Artigos públicos são visíveis para todos" ON articles;
DROP POLICY IF EXISTS "Permitir inserção de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir atualização de artigos" ON articles;
DROP POLICY IF EXISTS "Permitir deleção de artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem criar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem atualizar artigos" ON articles;
DROP POLICY IF EXISTS "Usuários autenticados podem deletar artigos" ON articles;

-- Policy: Public articles are visible to everyone (for reading)
CREATE POLICY "Artigos públicos são visíveis para todos"
  ON articles
  FOR SELECT
  USING (published = true);

-- Policy: Allow insert (autenticação simples via localStorage)
-- ATENÇÃO: Em produção, restrinja isso usando Supabase Auth
CREATE POLICY "Permitir inserção de artigos"
  ON articles
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow update
CREATE POLICY "Permitir atualização de artigos"
  ON articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Policy: Allow delete
CREATE POLICY "Permitir deleção de artigos"
  ON articles
  FOR DELETE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (only if they don't exist)
-- Remove this INSERT if you don't want sample data
INSERT INTO articles (title, description, type, category, read_time, published, order_index) 
VALUES
  ('Seguro de Crédito em 60 segundos', 'Entenda rapidamente como funciona o seguro que protege suas vendas a prazo', 'video', 'Introdução', '1 min', true, 1),
  ('O caso Americanas explicado', 'Como o Seguro de Crédito protegeu fornecedores na maior crise do varejo brasileiro', 'article', 'Case Real', '5 min', true, 2),
  ('Como exportar sem risco de inadimplência', 'Estratégias para expandir internacionalmente com segurança', 'video', 'Exportação', '8 min', true, 3),
  ('Mitos e verdades sobre Seguro de Crédito', 'Desmistificamos as principais dúvidas sobre proteção de crédito empresarial', 'article', 'Educativo', '6 min', true, 4),
  ('BI Coface: o poder da informação antes de vender', 'Como a inteligência de negócios pode transformar sua gestão de risco', 'article', 'Business Intelligence', '7 min', true, 5),
  ('40% das falências têm relação com inadimplência', 'Dados da Coface revelam o impacto da inadimplência em cadeia no Brasil', 'video', 'Mercado', '4 min', true, 6)
ON CONFLICT DO NOTHING;

