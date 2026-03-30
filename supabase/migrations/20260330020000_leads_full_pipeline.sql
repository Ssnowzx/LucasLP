-- ============================================================
-- Leads Full Pipeline — Expande status para ciclo completo
-- ============================================================

-- Remove constraint antiga e adiciona nova com todos os status
ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_status_check;
ALTER TABLE leads ADD CONSTRAINT leads_status_check
  CHECK (status IN ('novo', 'contatado', 'agendado', 'em_negociacao', 'fechado', 'perdido', 'sem_resposta'));

-- Coluna para motivo de perda
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lost_reason TEXT DEFAULT '';
