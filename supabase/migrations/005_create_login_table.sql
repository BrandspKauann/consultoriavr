-- Criar tabela de login para autenticação customizada
CREATE TABLE IF NOT EXISTS login (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para busca rápida por email
CREATE INDEX IF NOT EXISTS idx_login_email ON login(email);

-- Habilitar RLS
ALTER TABLE login ENABLE ROW LEVEL SECURITY;

-- Policy: Permitir leitura para verificação de login (anon pode ler)
-- ATENÇÃO: Isso permite que qualquer um leia a tabela para verificar credenciais
-- Em produção, considere usar uma função stored procedure mais segura
CREATE POLICY "Permitir leitura de login para verificação"
  ON login
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Permitir que qualquer um possa criar usuário (necessário para registro)
-- ATENÇÃO: Em produção, considere adicionar validações adicionais (rate limiting, captcha, etc)
CREATE POLICY "Permitir criação de usuários para registro"
  ON login
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Apenas usuários autenticados podem atualizar
CREATE POLICY "Apenas autenticados podem atualizar login"
  ON login
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Apenas usuários autenticados podem deletar
CREATE POLICY "Apenas autenticados podem deletar login"
  ON login
  FOR DELETE
  TO authenticated
  USING (true);

-- Function para atualizar updated_at
CREATE OR REPLACE FUNCTION update_login_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
DROP TRIGGER IF EXISTS update_login_updated_at ON login;
CREATE TRIGGER update_login_updated_at
  BEFORE UPDATE ON login
  FOR EACH ROW
  EXECUTE FUNCTION update_login_updated_at();

-- NOTA: O usuário será inserido através do código TypeScript
-- que vai hashar a senha antes de salvar.
-- Para criar o usuário inicial, use a página de registro ou o script PowerShell.

