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

-- IMPORTANTE: Para autenticação simples (localStorage), use estas políticas:
-- Permitir leitura pública de artigos publicados
CREATE POLICY "Artigos públicos são visíveis para todos"
  ON articles
  FOR SELECT
  USING (published = true);

-- Permitir inserção (você pode restringir isso depois)
-- ATENÇÃO: Isso permite qualquer pessoa inserir. Em produção, use autenticação adequada!
CREATE POLICY "Permitir inserção de artigos"
  ON articles
  FOR INSERT
  WITH CHECK (true);

-- Permitir atualização
CREATE POLICY "Permitir atualização de artigos"
  ON articles
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Permitir deleção
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

-- Trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (opcional)
INSERT INTO articles (title, description, type, category, read_time, published, order_index) VALUES
  ('Seguro de Crédito em 60 segundos', 'Entenda rapidamente como funciona o seguro que protege suas vendas a prazo', 'video', 'Introdução', '1 min', true, 1),
  ('O caso Americanas explicado', 'Como o Seguro de Crédito protegeu fornecedores na maior crise do varejo brasileiro', 'article', 'Case Real', '5 min', true, 2),
  ('Como exportar sem risco de inadimplência', 'Estratégias para expandir internacionalmente com segurança', 'video', 'Exportação', '8 min', true, 3),
  ('Mitos e verdades sobre Seguro de Crédito', 'Desmistificamos as principais dúvidas sobre proteção de crédito empresarial', 'article', 'Educativo', '6 min', true, 4),
  ('BI Coface: o poder da informação antes de vender', 'Como a inteligência de negócios pode transformar sua gestão de risco', 'article', 'Business Intelligence', '7 min', true, 5),
  ('40% das falências têm relação com inadimplência', 'Dados da Coface revelam o impacto da inadimplência em cadeia no Brasil', 'video', 'Mercado', '4 min', true, 6)
ON CONFLICT DO NOTHING;

-- NOTA: 
-- Em produção, substitua as políticas de INSERT/UPDATE/DELETE por políticas
-- que verificam autenticação do Supabase Auth para maior segurança.

