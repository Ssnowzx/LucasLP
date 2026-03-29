-- ============================================================
-- Vantage Command Dashboard — Supabase Schema
-- ============================================================

-- TASKS (Kanban)
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  owner TEXT DEFAULT 'lucas',
  priority TEXT DEFAULT 'normal',
  due_date DATE,
  label TEXT DEFAULT '',
  col TEXT DEFAULT 'backlog',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FINANCES
CREATE TABLE IF NOT EXISTS finances (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  val NUMERIC(12,2) NOT NULL DEFAULT 0,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  owner TEXT DEFAULT 'lucas',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CLIENTS (Pipeline Boutique)
CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  fee NUMERIC(12,2) DEFAULT 0,
  perf NUMERIC(5,2) DEFAULT 0,
  stage TEXT DEFAULT 'lead',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GOALS
CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'outro',
  target NUMERIC(12,2) DEFAULT 0,
  current NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NOTES (Chat Lucas/Rodrigo)
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  "user" TEXT DEFAULT 'lucas',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SETTINGS
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  current_user_name TEXT DEFAULT 'lucas',
  sidebar_minimized BOOLEAN DEFAULT FALSE,
  portfolio_start_date DATE DEFAULT '2026-03-01'
);

INSERT INTO settings (id) VALUES ('default') ON CONFLICT DO NOTHING;

-- FACEBOOK ADS CONFIG
CREATE TABLE IF NOT EXISTS fbads_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  access_token TEXT DEFAULT '',
  ad_account_id TEXT DEFAULT '',
  connected BOOLEAN DEFAULT FALSE
);

INSERT INTO fbads_config (id) VALUES ('default') ON CONFLICT DO NOTHING;

-- FACEBOOK ADS CAMPAIGNS
CREATE TABLE IF NOT EXISTS fbads_campaigns (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  objective TEXT DEFAULT '',
  budget NUMERIC(12,2) DEFAULT 0,
  spent NUMERIC(12,2) DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  roas NUMERIC(8,2) DEFAULT 0,
  ctr NUMERIC(8,4) DEFAULT 0,
  cpc NUMERIC(12,2) DEFAULT 0,
  cpm NUMERIC(12,2) DEFAULT 0,
  start_date DATE,
  end_date DATE,
  owner TEXT DEFAULT 'lucas',
  fb_id TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RLS — Open access (dashboard is private/internal)
-- ============================================================
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE finances ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE fbads_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE fbads_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for anon" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON finances FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON clients FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON goals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON fbads_config FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON fbads_campaigns FOR ALL USING (true) WITH CHECK (true);
