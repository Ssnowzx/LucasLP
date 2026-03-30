-- ============================================================
-- Security, Indices & Constraints Migration
-- Fixes: RLS policies, adds performance indices,
--        CHECK constraints, and UNIQUE constraints
-- ============================================================

-- ============================================================
-- 1. FIX RLS POLICIES — Replace open "allow all" with auth-only
-- ============================================================

-- Drop insecure policies
DROP POLICY IF EXISTS "Allow all for anon" ON tasks;
DROP POLICY IF EXISTS "Allow all for anon" ON finances;
DROP POLICY IF EXISTS "Allow all for anon" ON clients;
DROP POLICY IF EXISTS "Allow all for anon" ON goals;
DROP POLICY IF EXISTS "Allow all for anon" ON notes;
DROP POLICY IF EXISTS "Allow all for anon" ON settings;
DROP POLICY IF EXISTS "Allow all for anon" ON fbads_config;
DROP POLICY IF EXISTS "Allow all for anon" ON fbads_campaigns;

-- Create secure policies — authenticated users only
CREATE POLICY "Authenticated full access" ON tasks
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON finances
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON clients
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON goals
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON notes
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON settings
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON fbads_config
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated full access" ON fbads_campaigns
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- leads table already has correct policies (public INSERT, auth SELECT)

-- ============================================================
-- 2. CHECK CONSTRAINTS — Validate enumerated fields
-- ============================================================

ALTER TABLE tasks
  ADD CONSTRAINT chk_tasks_priority CHECK (priority IN ('urgent', 'high', 'normal', 'low')),
  ADD CONSTRAINT chk_tasks_col CHECK (col IN ('backlog', 'todo', 'doing', 'review', 'done'));

ALTER TABLE clients
  ADD CONSTRAINT chk_clients_stage CHECK (stage IN ('lead', 'onboarding', 'active', 'paused', 'churned'));

ALTER TABLE fbads_campaigns
  ADD CONSTRAINT chk_campaigns_status CHECK (status IN ('draft', 'active', 'paused', 'completed', 'archived'));

-- ============================================================
-- 3. UNIQUE CONSTRAINTS — Prevent duplicates
-- ============================================================

ALTER TABLE leads ADD CONSTRAINT uk_leads_email UNIQUE (email);
ALTER TABLE leads ADD CONSTRAINT uk_leads_whatsapp UNIQUE (whatsapp);

-- ============================================================
-- 4. PERFORMANCE INDICES
-- ============================================================

-- Tasks
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_col ON tasks(col);
CREATE INDEX IF NOT EXISTS idx_tasks_owner ON tasks(owner);

-- Finances
CREATE INDEX IF NOT EXISTS idx_finances_date ON finances(date DESC);
CREATE INDEX IF NOT EXISTS idx_finances_type ON finances(type);
CREATE INDEX IF NOT EXISTS idx_finances_category ON finances(category);
CREATE INDEX IF NOT EXISTS idx_finances_owner ON finances(owner);

-- Clients
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at);
CREATE INDEX IF NOT EXISTS idx_clients_stage ON clients(stage);

-- Goals
CREATE INDEX IF NOT EXISTS idx_goals_created_at ON goals(created_at);

-- Notes
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);

-- Leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Facebook Ads Campaigns
CREATE INDEX IF NOT EXISTS idx_fbads_campaigns_updated_at ON fbads_campaigns(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_fbads_campaigns_status ON fbads_campaigns(status);
