/**
 * Supabase Client — Vantage Command Dashboard
 * Data layer that replaces localStorage with Supabase
 */

// Initialize essentials immediately on window
window.SUPABASE_URL = 'https://ygxkzmdvdlxidhwgunvy.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneGt6bWR2ZGx4aWRod2d1bnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4MDQ4NDIsImV4cCI6MjA5MDM4MDg0Mn0.z7GFT63Exy-AshLz-gfg4CUmFJkG1GZ_Pwm8wgGTwLQ';
window.db = {};
window._authReady = null;
window.supabaseClient = null;

(function initSupabase() {
  try {
    if (window.supabase) {
      window.supabaseClient = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
    }
  } catch (e) {
    console.error('Supabase init crash:', e);
  }
})();

// ============================================================
//  AUTH GUARD — Block dashboard until authenticated
// ============================================================
if (!window.supabaseClient) {
  console.error('Supabase library not found! Check script order.');
  document.documentElement.style.visibility = 'visible';
} else {
  // Only redirect if on dashboard.html
  const isDashboard = /\/dashboard\.html$/.test(window.location.pathname);

  window._authReady = window.supabaseClient.auth.getSession().then(function(res) {
    if (isDashboard && !res.data.session) {
      window.location.replace('/login.html');
      throw new Error('not authenticated');
    }
    
    if (res.data.session) {
      window.authUser = res.data.session.user;
      window.authUserName = (res.data.session.user.user_metadata && res.data.session.user.user_metadata.name) || 'Lucas';
    }
    
    // Visibility is set by dashboard.js after page restore to avoid flash
    return res.data.session;
  }).catch(function(err) {
    document.documentElement.style.visibility = 'visible';
    if (err.message !== 'not authenticated') {
      console.error('Auth Guard Error:', err);
    }
    throw err;
  });
}

// Fallback visibility (Show page after 3s if guard hangs)
setTimeout(function() {
  if (document.documentElement.style.visibility === 'hidden') {
    console.warn('Auth guard timeout — forcing visibility');
    document.documentElement.style.visibility = 'visible';
  }
}, 3000);

// Logout function
window.logout = function() {
  if (window.supabaseClient) {
    window.supabaseClient.auth.signOut({ scope: 'local' }).then(function() {
      window.location.replace('/login.html');
    });
  } else {
    window.location.replace('/login.html');
  }
};

// ============================================================
//  DATA LAYER — Maps between JS state shape and DB columns
// ============================================================
Object.assign(window.db, {
  async loadTasks() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('tasks').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadTasks:', error); return []; }
    return data.map(t => ({
      id: t.id, title: t.title, desc: t.description, owner: t.owner,
      priority: t.priority, due: t.due_date, label: t.label, col: t.col,
      createdAt: t.created_at, updatedAt: t.updated_at
    }));
  },
  async saveTasks(tasks) {
    if (!window.supabaseClient) return;
    const rows = tasks.map(t => ({
      id: t.id, title: t.title, description: t.desc || '', owner: t.owner || 'lucas',
      priority: t.priority || 'normal', due_date: t.due || null, label: t.label || '',
      col: t.col || 'backlog', created_at: t.createdAt, updated_at: t.updatedAt || new Date().toISOString()
    }));
    const { error } = await window.supabaseClient.from('tasks').upsert(rows, { onConflict: 'id' });
    if (error) {
      console.error('saveTasks error — col values being sent:', rows.map(r => r.col));
      console.error('saveTasks:', error.message, error.details, error.hint);
    }
  },
  async deleteTask(id) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('tasks').delete().eq('id', id);
    if (error) console.error('deleteTask:', error);
  },
  async loadFinances() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('finances').select('*').order('date', { ascending: false });
    if (error) { console.error('loadFinances:', error); return []; }
    return data.map(f => ({
      id: f.id, date: f.date, desc: f.description, cat: f.category,
      val: Number(f.val), type: f.type, owner: f.owner, createdAt: f.created_at
    }));
  },
  async saveFinances(finances) {
    if (!window.supabaseClient) return;
    const rows = finances.map(f => ({
      id: f.id, date: f.date, description: f.desc || '', category: f.cat || 'Outros',
      val: f.val, type: f.type, owner: f.owner || 'lucas', created_at: f.createdAt
    }));
    const { error } = await window.supabaseClient.from('finances').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveFinances:', error);
  },
  async deleteFinance(id) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('finances').delete().eq('id', id);
    if (error) console.error('deleteFinance:', error);
  },
  async loadClients() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('clients').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadClients:', error); return []; }
    return data.map(c => ({
      id: c.id, name: c.name, fee: Number(c.fee), perf: Number(c.perf),
      stage: c.stage, notes: c.notes, createdAt: c.created_at, updatedAt: c.updated_at
    }));
  },
  async saveClients(clients) {
    if (!window.supabaseClient) return;
    const rows = clients.map(c => ({
      id: c.id, name: c.name, fee: c.fee || 0, perf: c.perf || 0,
      stage: c.stage || 'lead', notes: c.notes || '',
      created_at: c.createdAt, updated_at: c.updatedAt || new Date().toISOString()
    }));
    const { error } = await window.supabaseClient.from('clients').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveClients:', error);
  },
  async deleteClient(id) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('clients').delete().eq('id', id);
    if (error) console.error('deleteClient:', error);
  },
  async loadGoals() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('goals').select('*').order('created_at', { ascending: true });
    if (error) { console.error('loadGoals:', error); return []; }
    return data.map(g => ({
      id: g.id, title: g.title, category: g.category,
      target: Number(g.target), current: Number(g.current),
      createdAt: g.created_at, updatedAt: g.updated_at
    }));
  },
  async saveGoals(goals) {
    if (!window.supabaseClient) return;
    const rows = goals.map(g => ({
      id: g.id, title: g.title, category: g.category || 'outro',
      target: g.target || 0, current: g.current || 0,
      created_at: g.createdAt, updated_at: g.updatedAt || new Date().toISOString()
    }));
    const { error } = await window.supabaseClient.from('goals').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveGoals:', error);
  },
  async deleteGoal(id) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('goals').delete().eq('id', id);
    if (error) console.error('deleteGoal:', error);
  },
  async loadNotes() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('notes').select('*').order('created_at', { ascending: false }).limit(50);
    if (error) { console.error('loadNotes:', error); return []; }
    return data.map(n => ({
      id: n.id, text: n.text, user: n.user, createdAt: n.created_at
    }));
  },
  async saveNote(note) {
    if (!window.supabaseClient) return;
    const row = { id: note.id, text: note.text, user: note.user, created_at: note.createdAt };
    const { error } = await window.supabaseClient.from('notes').upsert([row], { onConflict: 'id' });
    if (error) console.error('saveNote:', error);
  },
  async loadSettings() {
    if (!window.supabaseClient) return { currentUser: 'lucas', sidebarMinimized: false, portfolioStartDate: '2026-03-01' };
    const { data, error } = await window.supabaseClient.from('settings').select('*').eq('id', 'default').single();
    if (error || !data) return { currentUser: 'lucas', sidebarMinimized: false, portfolioStartDate: '2026-03-01' };
    return {
      currentUser: data.current_user_name || 'lucas',
      sidebarMinimized: data.sidebar_minimized || false,
      portfolioStartDate: data.portfolio_start_date || '2026-03-01'
    };
  },
  async saveSettings(settings) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('settings').upsert([{
      id: 'default',
      current_user_name: settings.currentUser,
      sidebar_minimized: settings.sidebarMinimized,
      portfolio_start_date: settings.portfolioStartDate
    }], { onConflict: 'id' });
    if (error) console.error('saveSettings:', error);
  },
  async loadFbadsConfig() {
    if (!window.supabaseClient) return { accessToken: '', adAccountId: '', connected: false };
    const { data, error } = await window.supabaseClient.from('fbads_config').select('*').eq('id', 'default').single();
    if (error || !data) return { accessToken: '', adAccountId: '', connected: false };
    return { accessToken: data.access_token, adAccountId: data.ad_account_id, connected: data.connected };
  },
  async saveFbadsConfig(config) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('fbads_config').upsert([{
      id: 'default',
      access_token: config.accessToken,
      ad_account_id: config.adAccountId,
      connected: config.connected
    }], { onConflict: 'id' });
    if (error) console.error('saveFbadsConfig:', error);
  },
  async loadFbadsCampaigns() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('fbads_campaigns').select('*').order('updated_at', { ascending: false });
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
    if (!window.supabaseClient) return;
    const rows = campaigns.map(c => ({
      id: c.id, name: c.name, status: c.status || 'draft', objective: c.objective || '',
      budget: c.budget || 0, spent: c.spent || 0, impressions: c.impressions || 0,
      clicks: c.clicks || 0, conversions: c.conversions || 0, roas: c.roas || 0,
      ctr: c.ctr || 0, cpc: c.cpc || 0, cpm: c.cpm || 0,
      start_date: c.startDate || null, end_date: c.endDate || null,
      owner: c.owner || 'lucas', fb_id: c.fbId || '', notes: c.notes || '',
      created_at: c.createdAt, updatedAt: c.updatedAt || new Date().toISOString()
    }));
    const { error } = await window.supabaseClient.from('fbads_campaigns').upsert(rows, { onConflict: 'id' });
    if (error) console.error('saveFbadsCampaigns:', error);
  },
  async deleteFbadsCampaign(id) {
    if (!window.supabaseClient) return;
    const { error } = await window.supabaseClient.from('fbads_campaigns').delete().eq('id', id);
    if (error) console.error('deleteFbadsCampaign:', error);
  },
  async saveLead(lead) {
    if (!window.supabaseClient) return false;
    const row = {
      name: lead.name || '',
      email: lead.email || '',
      whatsapp: lead.whatsapp || '',
      revenue: lead.revenue || '',
      focus: lead.focus || '',
      goal: lead.goal || '',
      created_at: new Date().toISOString()
    };
    const { error } = await window.supabaseClient.from('leads').insert([row]);
    if (error) console.error('saveLead error:', error.message, error.details, error.hint, error.code);
    return !error;
  },
  async loadLeads() {
    if (!window.supabaseClient) return [];
    const { data, error } = await window.supabaseClient.from('leads').select('*').order('created_at', { ascending: false });
    if (error) { console.error('loadLeads error:', error); return []; }
    return data;
  },
  async updateLeadStatus(id, status) {
    if (!window.supabaseClient) return false;
    const { error } = await window.supabaseClient.from('leads').update({ status: status, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) console.error('updateLeadStatus error:', error);
    return !error;
  },
  async updateLeadNotes(id, notes) {
    if (!window.supabaseClient) return false;
    const { error } = await window.supabaseClient.from('leads').update({ notes: notes, lost_reason: notes, updated_at: new Date().toISOString() }).eq('id', id);
    if (error) console.error('updateLeadNotes error:', error);
    return !error;
  },
  async loadAll() {
    const [tasks, finances, clients, goals, notes, settings, fbadsConfig, fbadsCampaigns, leads] = await Promise.all([
      window.db.loadTasks(), window.db.loadFinances(), window.db.loadClients(), window.db.loadGoals(),
      window.db.loadNotes(), window.db.loadSettings(), window.db.loadFbadsConfig(), window.db.loadFbadsCampaigns(),
      window.db.loadLeads()
    ]);
    return { tasks, finances, clients, goals, notes, settings, fbadsConfig, fbadsCampaigns, leads };
  },
  async saveAll(state) {
    await Promise.all([
      window.db.saveTasks(state.tasks),
      window.db.saveFinances(state.finances),
      window.db.saveClients(state.clients),
      window.db.saveGoals(state.goals),
      window.db.saveSettings(state.settings),
      window.db.saveFbadsConfig(state.fbadsConfig),
      window.db.saveFbadsCampaigns(state.fbadsCampaigns)
    ]);
  }
});
