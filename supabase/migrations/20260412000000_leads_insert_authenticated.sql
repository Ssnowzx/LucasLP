-- ============================================================
-- Permite INSERT de leads por usuarios autenticados (dashboard)
-- A politica existente "Permitir envio publico de leads"
-- usa WITH CHECK (true) mas pode nao cobrir role authenticated
-- ============================================================

-- Drop and recreate to ensure it covers ALL roles
DROP POLICY IF EXISTS "Permitir envio publico de leads" ON leads;

CREATE POLICY "Permitir envio publico de leads" ON leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
