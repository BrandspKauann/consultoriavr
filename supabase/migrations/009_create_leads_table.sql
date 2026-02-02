-- Criar tabela de leads
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  empresa TEXT,
  cargo TEXT,
  mensagem TEXT,
  origem TEXT DEFAULT 'formulario_site',
  status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'convertido', 'arquivado')),
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_origem ON leads(origem);

-- Habilitar RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Permitir inserção de leads" ON leads;
CREATE POLICY "Permitir inserção de leads"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Apenas autenticados podem ler leads" ON leads;
CREATE POLICY "Apenas autenticados podem ler leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Apenas autenticados podem atualizar leads" ON leads;
CREATE POLICY "Apenas autenticados podem atualizar leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function para atualizar updated_at
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_leads_updated_at();
