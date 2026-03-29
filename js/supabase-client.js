/**
 * Supabase Client — Vantage Command Dashboard
 * Data layer that replaces localStorage with Supabase
 */

const SUPABASE_URL = 'https://ygxkzmdvdlxidhwgunvy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneGt6bWR2ZGx4aWRod2d1bnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDQ4NDIsImV4cCI6MjA5MDM4MDg0Mn0.z7GFT63Exy-AshLz-gfg4CUmFJkG1GZ_Pwm8wgGTwLQ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
//  AUTH GUARD — Block dashboard until authenticated
// ============================================================
// Hide body immediately until auth is confirmed
document.documentElement.style.visibility = 'hidden';

window._authReady = supabase.auth.getSession().then(function(res) {
  if (!res.data.session) {
    window.location.replace('/login.html');
    throw new Error('not authenticated');
  }
  window.authUser = res.data.session.user;
  window.authUserName = (res.data.session.user.user_metadata && res.data.session.user.user_metadata.name) || 'Lucas';
  document.documentElement.style.visibility = 'visible';
  return res.data.session;
});

// Logout function — clear session completely
window.logout = function() {
  supabase.auth.signOut({ scope: 'local' }).then(function() {
    window.location.replace('/login.html');
  });
};

// ============================================================
//  DATA LAYER — Maps between JS state shape and DB columns
// ============================================================

var db = {
  // --- TASKS ---
  async loadTasks() {
    const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadTasks:', error); return []; }
    return data.map(t => ({
      id: t.id, title: t.title, desc: t.description, owner: t.owner,
      priority: t.priority, due: t.due_date, label: t.label, col: t.col,
      createdAt: t.created_at, updatedAt: t.updated_at
    }));
  },
  async saveTasks(tasks) {
    const rows = tasks.map(t => ({
      id: t.id, title: t.title, description: t.desc || '', owner: t.owner || 'lucas',
      priority: t.priority || 'normal', due_date: t.due || null, label: t.label || '',
      col: t.col || 'backlog', created_at: t.createdAt, updated_at: t.updatedAt || new Date().toISOString()
    }));
    const { error } = await supabase.from('tasks').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveTasks:', error);
  },
  async deleteTask(id) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) console.error('deleteTask:', error);
  },

  // --- FINANCES ---
  async loadFinances() {
    const { data, error } = await supabase.from('finances').select('*').order('date', { ascending: false });
    if (error) { console.error('loadFinances:', error); return []; }
    return data.map(f => ({
      id: f.id, date: f.date, desc: f.description, cat: f.category,
      val: Number(f.val), type: f.type, owner: f.owner, createdAt: f.created_at
    }));
  },
  async saveFinances(finances) {
    const rows = finances.map(f => ({
      id: f.id, date: f.date, description: f.desc || '', category: f.cat || 'Outros',
      val: f.val, type: f.type, owner: f.owner || 'lucas', created_at: f.createdAt
    }));
    const { error } = await supabase.from('finances').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveFinances:', error);
  },
  async deleteFinance(id) {
    const { error } = await supabase.from('finances').delete().eq('id', id);
    if (error) console.error('deleteFinance:', error);
  },

  // --- CLIENTS ---
  async loadClients() {
    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadClients:', error); return []; }
    return data.map(c => ({
      id: c.id, name: c.name, fee: Number(c.fee), perf: Number(c.perf),
      stage: c.stage, notes: c.notes, createdAt: c.created_at, updatedAt: c.updated_at
    }));
  },
  async saveClients(clients) {
    const rows = clients.map(c => ({
      id: c.id, name: c.name, fee: c.fee || 0, perf: c.perf || 0,
      stage: c.stage || 'lead', notes: c.notes || '',
      created_at: c.createdAt, updated_at: c.updatedAt || new Date().toISOString()
    }));
    const { error } = await supabase.from('clients').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveClients:', error);
  },
  async deleteClient(id) {
    const { error } = await supabase.from('clients').delete().eq('id', id);
    if (error) console.error('deleteClient:', error);
  },

  // --- GOALS ---
  async loadGoals() {
    const { data, error } = await supabase.from('goals').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadGoals:', error); return []; }
    return data.map(g => ({
      id: g.id, title: g.title, category: g.category,
      target: Number(g.target), current: Number(g.current),
      createdAt: g.created_at, updatedAt: g.updated_at
    }));
  },
  async saveGoals(goals) {
    const rows = goals.map(g => ({
      id: g.id, title: g.title, category: g.category || 'outro',
      target: g.target || 0, current: g.current || 0,
      created_at: g.createdAt, updated_at: g.updatedAt || new Date().toISOString()
    }));
    const { error } = await supabase.from('goals').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveGoals:', error);
  },
  async deleteGoal(id) {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) console.error('deleteGoal:', error);
  },

  // --- NOTES ---
  async loadNotes() {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false }).limit(50);
    if (error) { console.error('loadNotes:', error); return []; }
    return data.map(n => ({
      id: n.id, text: n.text, user: n.user, createdAt: n.created_at
    }));
  },
  async saveNote(note) {
    const row = { id: note.id, text: note.text, user: note.user, created_at: note.createdAt };
    const { error } = await supabase.from('notes').upsert([row], { onConflict: 'id' });
    if (error) console.error('saveNote:', error);
  },

  // --- SETTINGS ---
  async loadSettings() {
    const { data, error } = await supabase.from('settings').select('*').eq('id', 'default').single();
    if (error || !data) return { currentUser: 'lucas', sidebarMinimized: false, portfolioStartDate: '2026-03-01' };
    return {
      currentUser: data.current_user_name || 'lucas',
      sidebarMinimized: data.sidebar_minimized || false,
      portfolioStartDate: data.portfolio_start_date || '2026-03-01'
    };
  },
  async saveSettings(settings) {
    const { error } = await supabase.from('settings').upsert([{
      id: 'default',
      current_user_name: settings.currentUser,
      sidebar_minimized: settings.sidebarMinimized,
      portfolio_start_date: settings.portfolioStartDate
    }], { onConflict: 'id' });
    if (error) console.error('saveSettings:', error);
  },

  // --- FBADS CONFIG ---
  async loadFbadsConfig() {
    const { data, error } = await supabase.from('fbads_config').select('*').eq('id', 'default').single();
    if (error || !data) return { accessToken: '', adAccountId: '', connected: false };
    return { accessToken: data.access_token, adAccountId: data.ad_account_id, connected: data.connected };
  },
  async saveFbadsConfig(config) {
    const { error } = await supabase.from('fbads_config').upsert([{
      id: 'default',
      access_token: config.accessToken,
      ad_account_id: config.adAccountId,
      connected: config.connected
    }], { onConflict: 'id' });
    if (error) console.error('saveFbadsConfig:', error);
  },

  // --- FBADS CAMPAIGNS ---
  async loadFbadsCampaigns() {
    const { data, error } = await supabase.from('fbads_campaigns').select('*').order('updated_at', { ascending: false });
    if (error) { console.error('loadFbadsCampaigns:', error); return []; }
    return data.map(c => ({
      id: c.id, name: c.name, status: c.status, objective: c.objective,
      budget: Number(c.budget), spent: Number(c.spent), impressions: c.impressions,
      clicks: c.clicks, conversions: c.conversions, roas: Number(c.roas),
      ctr: Number(c.ctr), cpc: Number(c.cpc), cpm: Number(c.cpm),
      startDate: c.start_date, endDate: c.end_date, owner: c.owner,
      fbId: c.fb_id, notes: c.notes, createdAt: c.created_at, updatedAt: c.updated_at
    }));
  },
  async saveFbadsCampaigns(campaigns) {
    const rows = campaigns.map(c => ({
      id: c.id, name: c.name, status: c.status || 'draft', objective: c.objective || '',
      budget: c.budget || 0, spent: c.spent || 0, impressions: c.impressions || 0,
      clicks: c.clicks || 0, conversions: c.conversions || 0, roas: c.roas || 0,
      ctr: c.ctr || 0, cpc: c.cpc || 0, cpm: c.cpm || 0,
      start_date: c.startDate || null, end_date: c.endDate || null,
      owner: c.owner || 'lucas', fb_id: c.fbId || '', notes: c.notes || '',
      created_at: c.createdAt, updated_at: c.updatedAt || new Date().toISOString()
    }));
    const { error } = await supabase.from('fbads_campaigns').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveFbadsCampaigns:', error);
  },
  async deleteFbadsCampaign(id) {
    const { error } = await supabase.from('fbads_campaigns').delete().eq('id', id);
    if (error) console.error('deleteFbadsCampaign:', error);
  },

  // --- LOAD ALL ---
  async loadAll() {
    const [tasks, finances, clients, goals, notes, settings, fbadsConfig, fbadsCampaigns] = await Promise.all([
      db.loadTasks(), db.loadFinances(), db.loadClients(), db.loadGoals(),
      db.loadNotes(), db.loadSettings(), db.loadFbadsConfig(), db.loadFbadsCampaigns()
    ]);
    return { tasks, finances, clients, goals, notes, settings, fbadsConfig, fbadsCampaigns };
  },

  // --- SAVE ALL ---
  async saveAll(state) {
    await Promise.all([
      db.saveTasks(state.tasks),
      db.saveFinances(state.finances),
      db.saveClients(state.clients),
      db.saveGoals(state.goals),
      db.saveSettings(state.settings),
      db.saveFbadsConfig(state.fbadsConfig),
      db.saveFbadsCampaigns(state.fbadsCampaigns)
    ]);
  }
};

window.db = db;
