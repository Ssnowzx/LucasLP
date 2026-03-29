-- 1. Criar a tabela para os leads do site
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  revenue TEXT,
  focus TEXT,
  goal TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Habilitar Segurança de Linha (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 3. Criar política para o formulário do site poder enviar dados
CREATE POLICY "Permitir envio publico de leads" ON leads 
FOR INSERT WITH CHECK (true);

-- 4. Criar política para que VOCÊ possa ver os leads no Dashboard
CREATE POLICY "Permitir leitura autenticada de leads" ON leads 
FOR SELECT USING (auth.role() = 'authenticated');
