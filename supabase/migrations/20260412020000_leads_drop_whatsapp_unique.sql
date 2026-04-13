-- Remove unique constraint do whatsapp em leads
-- Leads de mesmo grupo podem ter o mesmo telefone
ALTER TABLE leads DROP CONSTRAINT IF EXISTS uk_leads_whatsapp;
