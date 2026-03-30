-- ============================================================
-- Leads Status System — novo / em_andamento / fechado
-- ============================================================

ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'novo'
  CHECK (status IN ('novo', 'em_andamento', 'fechado'));

ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT DEFAULT '';

ALTER TABLE leads ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Allow authenticated users to update leads (status changes)
CREATE POLICY "Permitir update autenticado de leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete leads
CREATE POLICY "Permitir delete autenticado de leads" ON leads
  FOR DELETE USING (auth.role() = 'authenticated');
