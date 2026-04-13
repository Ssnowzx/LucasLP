-- ============================================================
-- Limpar leads duplicados e dados lixo
-- Mantém apenas 1 registro por nome (o mais recente)
-- Remove leads com nome vazio ou lixo do parser
-- ============================================================

-- 1. Remover leads com nomes vazios ou lixo
DELETE FROM leads WHERE name = '' OR name IS NULL;
DELETE FROM leads WHERE name LIKE 'Leads%Qualificados%';
DELETE FROM leads WHERE name LIKE '%Resumo%';
DELETE FROM leads WHERE name = '#';

-- 2. Remover duplicados - manter apenas o mais recente por nome
DELETE FROM leads a
USING leads b
WHERE a.name = b.name
  AND a.created_at < b.created_at;

-- 3. Tornar email opcional (permitir NULL)
ALTER TABLE leads ALTER COLUMN email DROP NOT NULL;
ALTER TABLE leads ALTER COLUMN whatsapp DROP NOT NULL;
