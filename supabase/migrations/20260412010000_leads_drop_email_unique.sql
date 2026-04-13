-- ============================================================
-- Remove unique constraint do email em leads
-- Leads prospectados nao tem email, todos ficam com ''
-- e violam a constraint uk_leads_email
-- ============================================================

ALTER TABLE leads DROP CONSTRAINT IF EXISTS uk_leads_email;

-- Limpar leads duplicados com campos vazios (tentativas anteriores de import)
DELETE FROM leads WHERE name = '' AND email = '' AND whatsapp = '';
