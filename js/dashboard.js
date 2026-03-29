/**
 * Vantage Command — Dashboard Engine v2.0 (Sidebar Layout)
 * Squad Poseidon | Ocean Theme
 * Powered by Supabase
 */

let state = {
  tasks: [], finances: [], clients: [], goals: [], notes: [],
  settings: { currentUser: 'lucas', sidebarMinimized: false, portfolioStartDate: '2026-03-01' },
  fbadsConfig: { accessToken: '', adAccountId: '', connected: false },
  fbadsCampaigns: []
};
let currentPage = 'overview';
let _saving = false;

function saveAll() {
  if (_saving) return;
  _saving = true;
  db.saveAll(state).finally(function() { _saving = false; });
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function money(val) { return 'R$ ' + Number(val).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function isoDate() { return new Date().toISOString(); }
function sanitize(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function formatDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-');
  if (parts.length === 3) return parts[2] + '/' + parts[1] + '/' + parts[0];
  return dateStr;
}
function formatDateTime(isoStr) {
  if (!isoStr) return '';
  var d = new Date(isoStr);
  return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

// ============================================================
//  NAVIGATION
// ============================================================
window.navigateTo = function(pageName, event) {
  if (event) { event.preventDefault(); }

  // Hide all pages
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));

  // Show selected page
  var page = document.getElementById('page-' + pageName);
  if (page) page.classList.add('active');

  // Reset scroll to top
  var container = document.querySelector('.pages-container');
  if (container) container.scrollTop = 0;

  // Update menu items
  document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
  var activeItem = document.querySelector('.menu-item[data-page="' + pageName + '"]');
  if (activeItem) activeItem.classList.add('active');

  // Update breadcrumb
  var labels = {
    overview: 'Dashboard',
    kanban: 'Kanban',
    finance: 'Financeiro',
    pipeline: 'Pipeline',
    goals: 'Metas',
    notes: 'Notas',
    fbads: 'Facebook Ads'
  };
  document.getElementById('pageBreadcrumb').textContent = labels[pageName] || pageName;

  currentPage = pageName;

  // Close mobile menu on navigation
  if (window.innerWidth <= 768) {
    closeSidebar();
  }

  // Render page content
  renderAll();
};

// ============================================================
//  SIDEBAR TOGGLE
// ============================================================
window.toggleSidebar = function() {
  var sidebar = document.getElementById('sidebar');
  var mainArea = document.querySelector('.main-area');

  sidebar.classList.toggle('active');
  sidebar.classList.toggle('minimized');
  mainArea.classList.toggle('sidebar-minimized');

  state.settings.sidebarMinimized = sidebar.classList.contains('minimized');
  saveAll();
};

function closeSidebar() {
  if (window.innerWidth <= 768) {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('active');
  }
}

function openSidebar() {
  if (window.innerWidth <= 768) {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.add('active');
  }
}

// ============================================================
//  USER & GREETING
// ============================================================
window.toggleUser = function() {
  state.settings.currentUser = state.settings.currentUser === 'lucas' ? 'rodrigo' : 'lucas';
  saveAll();
  updateUserBadges();
  updateGreeting();
};

function updateUserBadges() {
  var isLucas = state.settings.currentUser === 'lucas';
  document.getElementById('userAvatarSidebar').textContent = isLucas ? 'L' : 'R';
  document.getElementById('userNameSidebar').textContent = isLucas ? 'Lucas' : 'Rodrigo';
  var color = isLucas ? 'var(--sea-foam)' : 'var(--sand-gold)';
  document.getElementById('userAvatarSidebar').style.background = color;
}

function updateGreeting() {
  var hour = new Date().getHours();
  var greet = 'Boa noite';
  if (hour >= 5 && hour < 12) greet = 'Bom dia';
  else if (hour >= 12 && hour < 18) greet = 'Boa tarde';
  var name = state.settings.currentUser === 'lucas' ? 'Lucas' : 'Rodrigo';
  document.getElementById('headerGreeting').textContent = greet + ', ' + name;
}

// ============================================================
//  TIPS CONTROL
// ============================================================
window.toggleTips = function(btn) {
  var tips = btn.closest('.intro-tips');
  tips.classList.toggle('minimized');
};

// ============================================================
//  MODAL CONTROL
// ============================================================
window.openModal = function(id) {
  document.getElementById(id).classList.add('active');
};
window.closeModal = function(id) {
  document.getElementById(id).classList.remove('active');
  var form = document.getElementById(id).querySelector('form');
  if (form) form.reset();
  var editId = document.getElementById('taskEditId');
  if (editId) editId.value = '';
};
window.openTaskModal = function(col) {
  document.getElementById('taskColumn').value = col;
  document.getElementById('taskEditId').value = '';
  document.getElementById('taskOwner').value = state.settings.currentUser;
  openModal('modalTask');
};

// ============================================================
//  KPI ENGINE
// ============================================================
function updateKPIs() {
  var now = new Date();
  var currentMonth = now.getMonth();
  var currentYear = now.getFullYear();

  var monthFinances = state.finances.filter(function(f) {
    var d = new Date(f.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  var income = monthFinances.filter(f => f.type === 'income').reduce((s, f) => s + f.val, 0);
  var expense = monthFinances.filter(f => f.type === 'expense').reduce((s, f) => s + f.val, 0);
  var profit = income - expense;
  var margin = income > 0 ? ((profit / income) * 100) : 0;

  var activeClients = state.clients.filter(c => c.stage === 'active');
  var mrr = activeClients.reduce((s, c) => s + (c.fee || 0), 0);
  var ticket = activeClients.length > 0 ? mrr / activeClients.length : 0;

  // Funil & Operação Metrics
  var totalContacts = state.clients.length;
  var closedClients = activeClients.length;
  var conversionRate = totalContacts > 0 ? (closedClients / totalContacts) * 100 : 0;
  
  var startDate = new Date(state.settings.portfolioStartDate || '2026-03-01');
  var timeDiff = Math.abs(now - startDate);
  var diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  document.getElementById('kpiOpTime').textContent = diffDays + (diffDays === 1 ? ' dia' : ' dias');
  document.getElementById('kpiOpStartDate').textContent = 'Início: ' + formatDate(state.settings.portfolioStartDate || '2026-03-01');
  document.getElementById('kpiTotalContacts').textContent = totalContacts;
  document.getElementById('kpiTotalClosed').textContent = closedClients;
  document.getElementById('kpiConversionRate').textContent = conversionRate.toFixed(1) + '%';

  var prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  var prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  var prevMonthFinances = state.finances.filter(f => {
    var d = new Date(f.date);
    return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
  });

  var prevIncome = prevMonthFinances.filter(f => f.type === 'income').reduce((s, f) => s + f.val, 0);
  var prevExpense = prevMonthFinances.filter(f => f.type === 'expense').reduce((s, f) => s + f.val, 0);
  var prevProfit = prevIncome - prevExpense;
  var growth = prevIncome > 0 ? (((income - prevIncome) / prevIncome) * 100) : 0;

  var activeClientsPrev = state.clients.filter(c => c.stage === 'active'); // Simplification
  var mrrPrev = 0; // Needs historical data if available

  document.getElementById('kpiMRR').textContent = money(mrr);
  document.getElementById('kpiRevenue').textContent = money(income);
  document.getElementById('kpiExpense').textContent = money(expense);
  document.getElementById('kpiProfit').textContent = money(profit);
  document.getElementById('kpiMargin').textContent = margin.toFixed(1) + '%';
  document.getElementById('kpiTicket').textContent = money(ticket);
  document.getElementById('kpiGrowth').textContent = (growth >= 0 ? '+' : '') + growth.toFixed(1) + '%';

  // Insights Logic
  updateInsights(income, prevIncome, expense, prevExpense);

  setTrend('trendMRR', mrr, 0);
  setTrend('trendRevenue', income, prevIncome);
  setTrend('trendExpense', expense, prevExpense, true); // inverted=true for expenses
  setTrend('trendProfit', profit, prevProfit);
  setTrend('trendGrowth', growth, 0);
}

function updateInsights(income, prevIncome, expense, prevExpense) {
  var stuckCard = document.getElementById('insightStuckMoney');
  if (!stuckCard) return;

  // Rule: ads_spend grows > 15% while revenue grows < 5%
  // Here we use total expense as proxy for ads_spend if not categorized separately
  var adsExpense = state.finances.filter(f => f.type === 'expense' && f.cat === 'Ads').reduce((s, f) => s + f.val, 0);
  var prevAdsExpense = state.finances.filter(f => {
    var d = new Date(f.date);
    var now = new Date();
    var pm = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    var py = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    return d.getMonth() === pm && d.getFullYear() === py && f.type === 'expense' && f.cat === 'Ads';
  }).reduce((s, f) => s + f.val, 0);

  var adsGrowth = prevAdsExpense > 0 ? ((adsExpense - prevAdsExpense) / prevAdsExpense) * 100 : 0;
  var revGrowth = prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 0;

  if (adsGrowth > 15 && revGrowth < 5) {
    stuckCard.style.display = 'flex';
  } else {
    stuckCard.style.display = 'none';
  }

  // Boutique Health
  var activeCount = state.clients.filter(c => c.stage === 'active').length;
  var statusText = 'Você tem ' + activeCount + ' de 5 slots ocupados.';
  if (activeCount === 5) statusText += ' **Boutique Lotada!** 🚀';
  else statusText += ' Foco em exclusividade.';
  document.getElementById('insightBoutiqueStatus').textContent = statusText;
}

function setTrend(id, current, previous, inverted) {
  var el = document.getElementById(id);
  if (!el) return;
  
  var isBetter = inverted ? current < previous : current > previous;
  var isWorse = inverted ? current > previous : current < previous;

  if (isBetter) { 
    el.textContent = '↑'; 
    el.className = 'kpi-trend up'; 
  } else if (isWorse) { 
    el.textContent = '↓'; 
    el.className = 'kpi-trend down'; 
  } else { 
    el.textContent = '→'; 
    el.className = 'kpi-trend neutral'; 
  }
}

// ============================================================
//  KANBAN
// ============================================================
var activeFilter = 'all';

window.filterTasks = function(filter) {
  activeFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  renderTasks();
};

window.allowDrop = function(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add('drag-over');
};

window.dropTask = function(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('drag-over');
  var taskId = ev.dataTransfer.getData('taskId');
  var newCol = ev.currentTarget.id.replace('col-', '');
  state.tasks = state.tasks.map(t => t.id === taskId ? Object.assign({}, t, { col: newCol, updatedAt: isoDate() }) : t);
  saveAll();
  renderTasks();
  updateKPIs();
  updateCharts();
};

window.handleTaskSubmit = function(e) {
  e.preventDefault();
  var editId = document.getElementById('taskEditId').value;
  var taskData = {
    title: document.getElementById('taskTitle').value,
    desc: document.getElementById('taskDesc').value,
    owner: document.getElementById('taskOwner').value,
    priority: document.getElementById('taskPriority').value,
    due: document.getElementById('taskDue').value,
    label: document.getElementById('taskLabel').value,
    updatedAt: isoDate()
  };

  if (editId) {
    state.tasks = state.tasks.map(t => t.id === editId ? Object.assign({}, t, taskData) : t);
  } else {
    state.tasks.push(Object.assign({ id: uid(), col: document.getElementById('taskColumn').value, createdAt: isoDate() }, taskData));
  }
  saveAll();
  closeModal('modalTask');
  renderTasks();
  updateCharts();
};

window.editTask = function(id) {
  var task = state.tasks.find(t => t.id === id);
  if (!task) return;
  document.getElementById('taskEditId').value = task.id;
  document.getElementById('taskColumn').value = task.col;
  document.getElementById('taskTitle').value = task.title;
  document.getElementById('taskDesc').value = task.desc || '';
  document.getElementById('taskOwner').value = task.owner || 'lucas';
  document.getElementById('taskPriority').value = task.priority || 'normal';
  document.getElementById('taskDue').value = task.due || '';
  document.getElementById('taskLabel').value = task.label || '';
  openModal('modalTask');
};

var pendingDeleteType = null;
var pendingDeleteId = null;

window.requestDelete = function(type, id, label) {
  pendingDeleteType = type;
  pendingDeleteId = id;
  document.getElementById('confirmText').textContent = 'Excluir "' + label + '"?';
  openModal('modalConfirm');
};

window.confirmDelete = function() {
  if (pendingDeleteType === 'task') {
    db.deleteTask(pendingDeleteId);
    state.tasks = state.tasks.filter(t => t.id !== pendingDeleteId);
  } else if (pendingDeleteType === 'finance') {
    db.deleteFinance(pendingDeleteId);
    state.finances = state.finances.filter(f => f.id !== pendingDeleteId);
  } else if (pendingDeleteType === 'client') {
    db.deleteClient(pendingDeleteId);
    state.clients = state.clients.filter(c => c.id !== pendingDeleteId);
  } else if (pendingDeleteType === 'goal') {
    db.deleteGoal(pendingDeleteId);
    state.goals = state.goals.filter(g => g.id !== pendingDeleteId);
  } else if (pendingDeleteType === 'fbcampaign') {
    db.deleteFbadsCampaign(pendingDeleteId);
    state.fbadsCampaigns = state.fbadsCampaigns.filter(c => c.id !== pendingDeleteId);
  }
  closeModal('modalConfirm');
  renderAll();
  pendingDeleteType = null;
  pendingDeleteId = null;
};

function renderTasks() {
  var cols = ['backlog', 'progress', 'review', 'done'];
  var priorityFilter = document.getElementById('filterPriority').value;

  cols.forEach(function(col) {
    var list = document.getElementById('list-' + col);
    if (!list) return;
    list.innerHTML = '';
    var tasks = state.tasks.filter(function(t) {
      if (t.col !== col) return false;
      if (activeFilter !== 'all' && t.owner !== activeFilter) return false;
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
      return true;
    });

    var order = { urgent: 0, high: 1, normal: 2, low: 3 };
    tasks.sort((a, b) => (order[a.priority] || 2) - (order[b.priority] || 2));

    tasks.forEach(function(task) {
      var card = document.createElement('div');
      card.className = 'task-card';
      card.id = task.id;
      card.draggable = true;
      card.setAttribute('data-priority', task.priority || 'normal');
      card.ondragstart = function(ev) {
        ev.dataTransfer.setData('taskId', task.id);
        card.classList.add('dragging');
      };
      card.ondragend = function() { card.classList.remove('dragging'); };

      var isOverdue = task.due && new Date(task.due) < new Date() && col !== 'done';
      var metaTags = '';
      metaTags += '<span class="task-meta-tag owner-' + (task.owner || 'lucas') + '">' + (task.owner === 'rodrigo' ? 'Rodrigo' : 'Lucas') + '</span>';
      if (task.priority === 'urgent' || task.priority === 'high') {
        metaTags += '<span class="task-meta-tag priority-' + task.priority + '">' + (task.priority === 'urgent' ? 'Urgente' : 'Alta') + '</span>';
      }
      if (task.label) { metaTags += '<span class="task-meta-tag label-tag">' + sanitize(task.label) + '</span>'; }
      if (task.due) {
        var dueClass = isOverdue ? 'due-tag due-overdue' : 'due-tag';
        metaTags += '<span class="task-meta-tag ' + dueClass + '">' + formatDate(task.due) + '</span>';
      }

      card.innerHTML =
        '<div class="task-card__header">' +
          '<span class="task-card__title">' + sanitize(task.title) + '</span>' +
          '<div class="task-card__actions">' +
            '<button class="task-card__btn" onclick="editTask(\'' + task.id + '\')" title="Editar">&#9998;</button>' +
            '<button class="task-card__btn task-card__btn--delete" onclick="requestDelete(\'task\',\'' + task.id + '\',\'' + sanitize(task.title) + '\')" title="Excluir">&times;</button>' +
          '</div>' +
        '</div>' +
        (task.desc ? '<div class="task-card__desc">' + sanitize(task.desc) + '</div>' : '') +
        '<div class="task-card__meta">' + metaTags + '</div>';

      list.appendChild(card);
    });

    document.getElementById('count-' + col).textContent = tasks.length;
  });
}

function setupTouchDrag() {
  var dragEl = null;
  var dragId = null;
  var dragType = null; // 'task' or 'client'

  document.addEventListener('touchstart', function(e) {
    var taskCard = e.target.closest('.task-card');
    var clientCard = e.target.closest('.client-card');
    
    if (taskCard) {
      dragEl = taskCard;
      dragId = taskCard.id;
      dragType = 'task';
    } else if (clientCard) {
      dragEl = clientCard;
      // For clients, we need to find the ID. Assuming it's in the state since it's rendered by ID.
      // But cards don't have id=client.id in the current renderPipeline. Let's fix that.
      dragId = clientCard.getAttribute('data-id');
      dragType = 'client';
    } else {
      return;
    }
    
    dragEl.classList.add('dragging');
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (!dragEl) return;
    dragEl.classList.remove('dragging');
    var touch = e.changedTouches[0];
    var target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (dragType === 'task') {
      var col = target ? target.closest('.kanban-column') : null;
      if (col && dragId) {
        var newCol = col.id.replace('col-', '');
        state.tasks = state.tasks.map(t => t.id === dragId ? Object.assign({}, t, { col: newCol, updatedAt: isoDate() }) : t);
        saveAll();
        renderTasks();
        updateCharts();
      }
    } else if (dragType === 'client') {
      var stageCol = target ? target.closest('.stage-slots') : null;
      if (stageCol && dragId) {
        var newStage = stageCol.id.replace('stage-', '');
        if (newStage !== 'empty') {
          state.clients = state.clients.map(c => c.id === dragId ? Object.assign({}, c, { stage: newStage, updatedAt: isoDate() }) : c);
          saveAll();
          renderPipeline();
          updateKPIs();
        }
      }
    }
    
    dragEl = null;
    dragId = null;
    dragType = null;
  }, { passive: true });
}

// ============================================================
//  FINANCES
// ============================================================
window.handleFinanceSubmit = function(e) {
  e.preventDefault();
  var dateVal = document.getElementById('finDate').value;
  state.finances.push({
    id: uid(),
    date: dateVal || new Date().toISOString().split('T')[0],
    desc: document.getElementById('finDesc').value,
    cat: document.getElementById('finCat').value,
    val: parseFloat(document.getElementById('finValue').value),
    type: document.getElementById('finType').value,
    owner: document.getElementById('finOwner').value,
    createdAt: isoDate()
  });
  saveAll();
  closeModal('modalFinance');
  renderFinances();
  updateKPIs();
  updateCharts();
};

window.renderFinances = function() {
  var monthFilter = document.getElementById('filterFinMonth').value;
  var typeFilter = document.getElementById('filterFinType').value;
  var catFilter = document.getElementById('filterFinCat').value;

  var filtered = state.finances.filter(function(f) {
    if (typeFilter !== 'all' && f.type !== typeFilter) return false;
    if (catFilter !== 'all' && f.cat !== catFilter) return false;
    if (monthFilter !== 'all') {
      var d = new Date(f.date);
      var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
      if (key !== monthFilter) return false;
    }
    return true;
  });

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  var body = document.getElementById('financeBody');
  body.innerHTML = '';
  var emptyEl = document.getElementById('financeEmpty');

  if (filtered.length === 0) {
    emptyEl.style.display = 'block';
  } else {
    emptyEl.style.display = 'none';
    filtered.forEach(function(f) {
      var row = document.createElement('tr');
      var ownerLabel = f.owner === 'rodrigo' ? 'Rodrigo' : f.owner === 'empresa' ? 'Empresa' : 'Lucas';
      row.innerHTML =
        '<td>' + formatDate(f.date) + '</td>' +
        '<td>' + sanitize(f.desc) + '</td>' +
        '<td>' + sanitize(f.cat) + '</td>' +
        '<td>' + ownerLabel + '</td>' +
        '<td class="' + (f.type === 'income' ? 'val-income' : 'val-expense') + '">' +
          (f.type === 'income' ? '+' : '-') + ' ' + money(f.val) +
        '</td>' +
        '<td><span class="status-tag status--' + f.type + '">' + (f.type === 'income' ? 'Recebido' : 'Pago') + '</span></td>' +
        '<td><button class="delete-row-btn" onclick="requestDelete(\'finance\',\'' + f.id + '\',\'' + sanitize(f.desc) + '\')">&times;</button></td>';
      body.appendChild(row);
    });
  }

  var income = filtered.filter(f => f.type === 'income').reduce((s, f) => s + f.val, 0);
  var expense = filtered.filter(f => f.type === 'expense').reduce((s, f) => s + f.val, 0);
  document.getElementById('finIncome').textContent = money(income);
  document.getElementById('finExpense').textContent = money(expense);
  document.getElementById('finBalance').textContent = money(income - expense);
  document.getElementById('finProjection').textContent = money((income - expense) * 1.15);
};

function populateFinanceFilters() {
  var months = {};
  var cats = {};
  state.finances.forEach(f => {
    var d = new Date(f.date);
    var key = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0');
    var mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    months[key] = mNames[d.getMonth()] + ' ' + d.getFullYear();
    cats[f.cat] = true;
  });

  var monthSelect = document.getElementById('filterFinMonth');
  var currentVal = monthSelect.value;
  monthSelect.innerHTML = '<option value="all">Todos os Meses</option>';
  Object.keys(months).sort().reverse().forEach(k => {
    var opt = document.createElement('option');
    opt.value = k;
    opt.textContent = months[k];
    monthSelect.appendChild(opt);
  });
  monthSelect.value = currentVal || 'all';

  var catSelect = document.getElementById('filterFinCat');
  var currentCat = catSelect.value;
  catSelect.innerHTML = '<option value="all">Todas Categorias</option>';
  Object.keys(cats).sort().forEach(k => {
    var opt = document.createElement('option');
    opt.value = k;
    opt.textContent = k;
    catSelect.appendChild(opt);
  });
  catSelect.value = currentCat || 'all';
}

function setDefaultFinDate() {
  var finDate = document.getElementById('finDate');
  if (finDate && !finDate.value) {
    finDate.value = new Date().toISOString().split('T')[0];
  }
}

// ============================================================
//  PIPELINE
// ============================================================
window.handleClientSubmit = function(e) {
  e.preventDefault();
  if (state.clients.length >= 5) {
    alert('Limite de 5 slots boutique atingido!');
    return;
  }
  state.clients.push({
    id: uid(),
    name: document.getElementById('clientName').value,
    fee: parseFloat(document.getElementById('clientFee').value),
    perf: parseFloat(document.getElementById('clientPerf').value) || 0,
    stage: document.getElementById('clientStage').value,
    notes: document.getElementById('clientNotes').value,
    createdAt: isoDate()
  });
  saveAll();
  closeModal('modalClient');
  renderPipeline();
  updateKPIs();
};

window.moveClientStage = function(id, direction) {
  var stages = ['lead', 'proposal', 'onboarding', 'active', 'alert'];
  var client = state.clients.find(c => c.id === id);
  if (!client) return;
  var idx = stages.indexOf(client.stage);
  var newIdx = direction === 'next' ? Math.min(idx + 1, stages.length - 1) : Math.max(idx - 1, 0);
  client.stage = stages[newIdx];
  client.updatedAt = isoDate();
  saveAll();
  renderPipeline();
  updateKPIs();
};

window.allowDropClient = function(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.add('drag-over');
};

window.dropClient = function(ev) {
  ev.preventDefault();
  ev.currentTarget.classList.remove('drag-over');
  var clientId = ev.dataTransfer.getData('clientId');
  var newStage = ev.currentTarget.id.replace('stage-', '');
  if (newStage === 'empty') return; // Cannot drop into empty column
  state.clients = state.clients.map(c => c.id === clientId ? Object.assign({}, c, { stage: newStage, updatedAt: isoDate() }) : c);
  saveAll();
  renderPipeline();
  updateKPIs();
};

function renderPipeline() {
  var pipelineBoard = document.getElementById('pipelineBoard');
  if (!pipelineBoard) return;

  var stages = ['empty', 'lead', 'proposal', 'onboarding', 'active', 'alert'];
  pipelineBoard.innerHTML = '';

  stages.forEach(function(stage) {
    var stageDiv = document.createElement('div');
    stageDiv.className = 'pipeline-stage';
    stageDiv.setAttribute('data-stage', stage);

    var stageColors = { empty: 'var(--deep-muted)', lead: 'var(--shell-muted)', proposal: 'var(--sand-gold)', onboarding: 'var(--sea-foam)', active: 'var(--lagoon-green)', alert: 'var(--starfish-coral)' };
    var stageLabels = { empty: 'Vazio', lead: 'Lead', proposal: 'Proposta', onboarding: 'Onboarding', active: 'Ativo', alert: 'Alerta' };

    var header = document.createElement('div');
    header.className = 'stage-header';
    header.innerHTML =
      '<span class="stage-dot" style="background:' + stageColors[stage] + '"></span>' +
      '<span>' + stageLabels[stage] + '</span>';
    stageDiv.appendChild(header);

    var slotsDiv = document.createElement('div');
    slotsDiv.className = 'stage-slots';
    slotsDiv.id = 'stage-' + stage;
    slotsDiv.ondrop = function(ev) { dropClient(ev); };
    slotsDiv.ondragover = function(ev) { allowDropClient(ev); };
    slotsDiv.ondragleave = function() { slotsDiv.classList.remove('drag-over'); };

    if (stage === 'empty') {
      var usedSlots = state.clients.length;
      var emptySlots = Math.max(0, 5 - usedSlots);
      for (var i = 0; i < emptySlots; i++) {
        slotsDiv.innerHTML += '<div class="empty-slot">Slot disponivel</div>';
      }
      if (emptySlots === 0) {
        slotsDiv.innerHTML = '<div class="empty-slot" style="border-color:var(--lagoon-green);color:var(--lagoon-green)">Lotado!</div>';
      }
    } else {
      var clients = state.clients.filter(c => c.stage === stage);
      clients.forEach(client => {
        var card = document.createElement('div');
        card.className = 'client-card';
        card.setAttribute('data-id', client.id);
        card.draggable = true;
        card.ondragstart = function(ev) {
          ev.dataTransfer.setData('clientId', client.id);
          card.classList.add('dragging');
        };
        card.ondragend = function() { card.classList.remove('dragging'); };
        card.innerHTML =
          '<div class="client-card__name">' + sanitize(client.name) + '</div>' +
          '<div class="client-card__fee">' + money(client.fee) + '/mes</div>' +
          (client.perf ? '<div class="client-card__perf">' + client.perf + '% performance</div>' : '') +
          '<div class="client-card__actions">' +
            '<button class="btn-secondary btn-sm" onclick="moveClientStage(\'' + client.id + '\',\'prev\')">&#8592;</button>' +
            '<button class="btn-secondary btn-sm" onclick="moveClientStage(\'' + client.id + '\',\'next\')">&#8594;</button>' +
            '<button class="btn-danger btn-sm" onclick="requestDelete(\'client\',\'' + client.id + '\',\'' + sanitize(client.name) + '\')">&times;</button>' +
          '</div>';
        slotsDiv.appendChild(card);
      });
    }

    stageDiv.appendChild(slotsDiv);
    pipelineBoard.appendChild(stageDiv);
  });
}

// ============================================================
//  GOALS
// ============================================================
window.handleGoalSubmit = function(e) {
  e.preventDefault();
  state.goals.push({
    id: uid(),
    title: document.getElementById('goalTitle').value,
    category: document.getElementById('goalCategory').value,
    target: parseFloat(document.getElementById('goalTarget').value),
    current: parseFloat(document.getElementById('goalCurrent').value) || 0,
    createdAt: isoDate()
  });
  saveAll();
  closeModal('modalGoal');
  renderGoals();
};

window.updateGoalProgress = function(id, delta) {
  var goal = state.goals.find(g => g.id === id);
  if (!goal) return;
  goal.current = Math.max(0, goal.current + delta);
  goal.updatedAt = isoDate();
  saveAll();
  renderGoals();
};

function renderGoals() {
  var grid = document.getElementById('goalsGrid');
  if (!grid) return;

  var emptyEl = document.getElementById('goalsEmpty');
  grid.innerHTML = '';

  if (state.goals.length === 0) {
    emptyEl.style.display = 'block';
    return;
  }
  emptyEl.style.display = 'none';

  state.goals.forEach(function(goal) {
    var pct = goal.target > 0 ? Math.min(100, (goal.current / goal.target) * 100) : 0;
    var fillClass = pct >= 100 ? 'complete' : pct >= 70 ? '' : 'warning';
    var catLabels = { receita: 'Receita', clientes: 'Clientes', tarefas: 'Tarefas', ads: 'Ads', outro: 'Outro' };

    var card = document.createElement('div');
    card.className = 'goal-card';
    card.innerHTML =
      '<div class="goal-card__header">' +
        '<span class="goal-card__title">' + sanitize(goal.title) + '</span>' +
        '<span class="goal-card__category">' + (catLabels[goal.category] || goal.category) + '</span>' +
      '</div>' +
      '<div class="goal-card__progress">' +
        '<div class="goal-progress-bar"><div class="goal-progress-fill ' + fillClass + '" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="goal-card__values">' +
        '<span class="goal-card__current">' + money(goal.current) + ' / ' + money(goal.target) + '</span>' +
        '<span class="goal-card__percent">' + pct.toFixed(0) + '%</span>' +
      '</div>' +
      '<div class="goal-card__actions">' +
        '<button class="btn-secondary btn-sm" onclick="updateGoalProgress(\'' + goal.id + '\',-500)">-500</button>' +
        '<button class="btn-primary btn-sm" onclick="updateGoalProgress(\'' + goal.id + '\',500)">+500</button>' +
        '<button class="btn-primary btn-sm" onclick="updateGoalProgress(\'' + goal.id + '\',1000)">+1k</button>' +
        '<button class="btn-primary btn-sm" onclick="updateGoalProgress(\'' + goal.id + '\',5000)">+5k</button>' +
        '<button class="btn-danger btn-sm" onclick="requestDelete(\'goal\',\'' + goal.id + '\',\'' + sanitize(goal.title) + '\')" style="margin-left:auto">&times;</button>' +
      '</div>';
    grid.appendChild(card);
  });
}

// ============================================================
//  NOTES
// ============================================================
window.addNote = function() {
  var input = document.getElementById('noteInput');
  var text = input.value.trim();
  if (!text) return;
  var note = { id: uid(), text: text, user: state.settings.currentUser, createdAt: isoDate() };
  state.notes.unshift(note);
  if (state.notes.length > 50) state.notes = state.notes.slice(0, 50);
  db.saveNote(note);
  input.value = '';
  renderNotes();
};

function renderNotes() {
  var feed = document.getElementById('notesFeed');
  if (!feed) return;
  feed.innerHTML = '';
  state.notes.slice(0, 20).forEach(function(note) {
    var isLucas = note.user === 'lucas';
    var item = document.createElement('div');
    item.className = 'note-item';
    item.innerHTML =
      '<div class="note-item__avatar ' + (isLucas ? 'lucas' : 'rodrigo') + '">' + (isLucas ? 'L' : 'R') + '</div>' +
      '<div class="note-item__body">' +
        '<div class="note-item__meta">' + (isLucas ? 'Lucas' : 'Rodrigo') + ' &middot; ' + formatDateTime(note.createdAt) + '</div>' +
        '<div class="note-item__text">' + sanitize(note.text) + '</div>' +
      '</div>';
    feed.appendChild(item);
  });
}

function setupNoteEnter() {
  var input = document.getElementById('noteInput');
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addNote();
      }
    });
  }
}

// ============================================================
//  FACEBOOK ADS
// ============================================================
window.toggleApiKeyVisibility = function() {
  var input = document.getElementById('fbApiKey');
  var btn = input.nextElementSibling;
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = '🙈';
  } else {
    input.type = 'password';
    btn.textContent = '👁';
  }
};

window.saveFbConfig = function() {
  var token = document.getElementById('fbApiKey').value.trim();
  var accountId = document.getElementById('fbAccountId').value.trim();
  state.fbadsConfig.accessToken = token;
  state.fbadsConfig.adAccountId = accountId;
  state.fbadsConfig.connected = token.length > 0 && accountId.length > 0;
  saveAll();
  updateFbConfigStatus();
};

window.testFbConnection = function() {
  var statusEl = document.getElementById('fbConfigStatus');
  if (!state.fbadsConfig.accessToken || !state.fbadsConfig.adAccountId) {
    statusEl.textContent = 'Preencha o token e o ID da conta primeiro';
    statusEl.className = 'fbads-config-status error';
    return;
  }
  statusEl.textContent = 'Configuracao salva. Conexao com API sera validada ao integrar com Supabase.';
  statusEl.className = 'fbads-config-status connected';
};

function updateFbConfigStatus() {
  var statusEl = document.getElementById('fbConfigStatus');
  if (!statusEl) return;
  var tokenInput = document.getElementById('fbApiKey');
  var accountInput = document.getElementById('fbAccountId');
  if (tokenInput) tokenInput.value = state.fbadsConfig.accessToken || '';
  if (accountInput) accountInput.value = state.fbadsConfig.adAccountId || '';
  if (state.fbadsConfig.connected) {
    statusEl.textContent = 'Configurado';
    statusEl.className = 'fbads-config-status connected';
  } else {
    statusEl.textContent = 'Nao configurado';
    statusEl.className = 'fbads-config-status';
  }
}

window.openFbCampaignModal = function() {
  document.getElementById('fbCampaignEditId').value = '';
  document.getElementById('fbCampOwner').value = state.settings.currentUser;
  openModal('modalFbCampaign');
};

window.editFbCampaign = function(id) {
  var camp = state.fbadsCampaigns.find(c => c.id === id);
  if (!camp) return;
  document.getElementById('fbCampaignEditId').value = camp.id;
  document.getElementById('fbCampName').value = camp.name || '';
  document.getElementById('fbCampStatus').value = camp.status || 'draft';
  document.getElementById('fbCampObjective').value = camp.objective || '';
  document.getElementById('fbCampBudget').value = camp.budget || 0;
  document.getElementById('fbCampSpent').value = camp.spent || 0;
  document.getElementById('fbCampImpressions').value = camp.impressions || 0;
  document.getElementById('fbCampClicks').value = camp.clicks || 0;
  document.getElementById('fbCampConversions').value = camp.conversions || 0;
  document.getElementById('fbCampROAS').value = camp.roas || 0;
  document.getElementById('fbCampStart').value = camp.startDate || '';
  document.getElementById('fbCampEnd').value = camp.endDate || '';
  document.getElementById('fbCampOwner').value = camp.owner || 'lucas';
  document.getElementById('fbCampFbId').value = camp.fbId || '';
  document.getElementById('fbCampNotes').value = camp.notes || '';
  openModal('modalFbCampaign');
};

window.handleFbCampaignSubmit = function(e) {
  e.preventDefault();
  var editId = document.getElementById('fbCampaignEditId').value;
  var clicks = parseFloat(document.getElementById('fbCampClicks').value) || 0;
  var impressions = parseFloat(document.getElementById('fbCampImpressions').value) || 0;
  var spent = parseFloat(document.getElementById('fbCampSpent').value) || 0;

  var campData = {
    name: document.getElementById('fbCampName').value,
    status: document.getElementById('fbCampStatus').value,
    objective: document.getElementById('fbCampObjective').value,
    budget: parseFloat(document.getElementById('fbCampBudget').value) || 0,
    spent: spent,
    impressions: impressions,
    clicks: clicks,
    conversions: parseFloat(document.getElementById('fbCampConversions').value) || 0,
    roas: parseFloat(document.getElementById('fbCampROAS').value) || 0,
    ctr: impressions > 0 ? ((clicks / impressions) * 100) : 0,
    cpc: clicks > 0 ? (spent / clicks) : 0,
    cpm: impressions > 0 ? ((spent / impressions) * 1000) : 0,
    startDate: document.getElementById('fbCampStart').value,
    endDate: document.getElementById('fbCampEnd').value,
    owner: document.getElementById('fbCampOwner').value,
    fbId: document.getElementById('fbCampFbId').value,
    notes: document.getElementById('fbCampNotes').value,
    updatedAt: isoDate()
  };

  if (editId) {
    state.fbadsCampaigns = state.fbadsCampaigns.map(c => c.id === editId ? Object.assign({}, c, campData) : c);
  } else {
    state.fbadsCampaigns.push(Object.assign({ id: uid(), createdAt: isoDate() }, campData));
  }
  saveAll();
  closeModal('modalFbCampaign');
  renderFbCampaigns();
  updateFbKPIs();
  updateFbCharts();
};

window.filterFbCampaigns = function() {
  renderFbCampaigns();
};

function renderFbCampaigns() {
  var statusFilter = document.getElementById('filterFbStatus');
  var objFilter = document.getElementById('filterFbObjective');
  var sFilter = statusFilter ? statusFilter.value : 'all';
  var oFilter = objFilter ? objFilter.value : 'all';

  var filtered = state.fbadsCampaigns.filter(function(c) {
    if (sFilter !== 'all' && c.status !== sFilter) return false;
    if (oFilter !== 'all' && c.objective !== oFilter) return false;
    return true;
  });

  filtered.sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));

  var body = document.getElementById('fbCampaignsBody');
  var emptyEl = document.getElementById('fbCampaignsEmpty');
  if (!body) return;
  body.innerHTML = '';

  if (filtered.length === 0) {
    if (emptyEl) emptyEl.style.display = 'block';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    filtered.forEach(function(c) {
      var row = document.createElement('tr');
      var statusClass = 'campaign-status campaign-status--' + (c.status || 'draft');
      var statusLabels = { active: 'Ativa', paused: 'Pausada', completed: 'Finalizada', draft: 'Rascunho' };
      var objLabels = { conversions: 'Conversoes', traffic: 'Trafego', leads: 'Leads', awareness: 'Reconhecimento', engagement: 'Engajamento' };
      row.innerHTML =
        '<td><span class="' + statusClass + '">' + (statusLabels[c.status] || c.status) + '</span></td>' +
        '<td>' + sanitize(c.name) + '</td>' +
        '<td>' + (objLabels[c.objective] || c.objective || '-') + '</td>' +
        '<td>' + money(c.budget) + '</td>' +
        '<td>' + money(c.spent) + '</td>' +
        '<td>' + (c.impressions || 0).toLocaleString('pt-BR') + '</td>' +
        '<td>' + (c.clicks || 0).toLocaleString('pt-BR') + '</td>' +
        '<td>' + (c.ctr || 0).toFixed(2) + '%</td>' +
        '<td>' + money(c.cpc || 0) + '</td>' +
        '<td>' + (c.roas || 0).toFixed(2) + 'x</td>' +
        '<td>' +
          '<button class="task-card__btn" onclick="editFbCampaign(\'' + c.id + '\')" title="Editar">&#9998;</button>' +
          '<button class="task-card__btn task-card__btn--delete" onclick="requestDelete(\'fbcampaign\',\'' + c.id + '\',\'' + sanitize(c.name) + '\')" title="Excluir">&times;</button>' +
        '</td>';
      body.appendChild(row);
    });
  }
}

function updateFbKPIs() {
  var camps = state.fbadsCampaigns;
  var totalSpent = camps.reduce((s, c) => s + (c.spent || 0), 0);
  var totalImpressions = camps.reduce((s, c) => s + (c.impressions || 0), 0);
  var totalClicks = camps.reduce((s, c) => s + (c.clicks || 0), 0);
  var totalConversions = camps.reduce((s, c) => s + (c.conversions || 0), 0);
  var avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100) : 0;
  var avgCPC = totalClicks > 0 ? (totalSpent / totalClicks) : 0;
  var avgCPM = totalImpressions > 0 ? ((totalSpent / totalImpressions) * 1000) : 0;
  var totalRevFromAds = camps.reduce((s, c) => s + ((c.roas || 0) * (c.spent || 0)), 0);
  var avgROAS = totalSpent > 0 ? (totalRevFromAds / totalSpent) : 0;

  var el = function(id) { return document.getElementById(id); };
  if (el('fbTotalSpent')) el('fbTotalSpent').textContent = money(totalSpent);
  if (el('fbTotalImpressions')) el('fbTotalImpressions').textContent = totalImpressions.toLocaleString('pt-BR');
  if (el('fbTotalClicks')) el('fbTotalClicks').textContent = totalClicks.toLocaleString('pt-BR');
  if (el('fbTotalConversions')) el('fbTotalConversions').textContent = totalConversions.toLocaleString('pt-BR');
  if (el('fbAvgCTR')) el('fbAvgCTR').textContent = avgCTR.toFixed(2) + '%';
  if (el('fbAvgCPC')) el('fbAvgCPC').textContent = money(avgCPC);
  if (el('fbAvgCPM')) el('fbAvgCPM').textContent = money(avgCPM);
  if (el('fbAvgROAS')) el('fbAvgROAS').textContent = avgROAS.toFixed(2) + 'x';
}

var chartFbSpend = null;
var chartFbROAS = null;

function initFbCharts() {
  var ctxSpend = document.getElementById('chartFbSpend');
  var ctxPerf = document.getElementById('chartFbROAS');
  if (!ctxSpend || !ctxPerf) return;

  chartFbSpend = new Chart(ctxSpend.getContext('2d'), {
    type: 'bar',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } } },
      scales: {
        y: { grid: { color: 'rgba(42,59,66,0.5)' }, ticks: { callback: v => 'R$' + (v/1000) + 'k' } },
        x: { grid: { display: false } }
      }
    }
  });

  chartFbROAS = new Chart(ctxPerf.getContext('2d'), {
    type: 'line',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } } },
      scales: {
        y: { grid: { color: 'rgba(42,59,66,0.5)' } },
        x: { grid: { display: false } }
      }
    }
  });

  updateFbCharts();
}

function updateFbCharts() {
  if (!chartFbSpend || !chartFbROAS) return;

  var camps = state.fbadsCampaigns.filter(c => c.status === 'active' || c.status === 'completed');
  var names = camps.map(c => c.name.length > 15 ? c.name.substring(0, 15) + '...' : c.name);
  var budgets = camps.map(c => c.budget || 0);
  var spents = camps.map(c => c.spent || 0);

  chartFbSpend.data.labels = names.length > 0 ? names : ['Sem dados'];
  chartFbSpend.data.datasets = [
    { label: 'Orcamento', data: budgets.length > 0 ? budgets : [0], backgroundColor: 'rgba(125,211,252,0.4)', borderColor: '#7DD3FC', borderWidth: 1, borderRadius: 6 },
    { label: 'Gasto', data: spents.length > 0 ? spents : [0], backgroundColor: 'rgba(252,165,165,0.4)', borderColor: '#FCA5A5', borderWidth: 1, borderRadius: 6 }
  ];
  chartFbSpend.update();

  var ctrs = camps.map(c => c.ctr || 0);
  var roasVals = camps.map(c => c.roas || 0);

  chartFbROAS.data.labels = names.length > 0 ? names : ['Sem dados'];
  chartFbROAS.data.datasets = [
    { label: 'CTR (%)', data: ctrs.length > 0 ? ctrs : [0], borderColor: '#2DD4BF', backgroundColor: 'rgba(45,212,191,0.1)', tension: 0.3, fill: false, yAxisID: 'y' },
    { label: 'ROAS (x)', data: roasVals.length > 0 ? roasVals : [0], borderColor: '#FCD34D', backgroundColor: 'rgba(252,211,77,0.1)', tension: 0.3, fill: false, yAxisID: 'y1' }
  ];
  chartFbROAS.options.scales.y1 = { position: 'right', grid: { display: false }, ticks: { callback: v => v + 'x' } };
  chartFbROAS.update();
}

// ============================================================
//  CHARTS
// ============================================================
var chartRevenue = null;
var chartExpenses = null;
var chartTasks = null;

function initCharts() {
  if (!document.getElementById('chartRevenue')) return;

  Chart.defaults.color = '#94A3B8';
  Chart.defaults.borderColor = '#2A3B42';
  Chart.defaults.font.family = 'DM Sans';

  var ctxRev = document.getElementById('chartRevenue').getContext('2d');
  chartRevenue = new Chart(ctxRev, {
    type: 'line',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } } },
      scales: {
        y: { grid: { color: 'rgba(42,59,66,0.5)' }, ticks: { callback: v => 'R$' + (v/1000) + 'k' } },
        x: { grid: { display: false } }
      }
    }
  });

  var ctxExp = document.getElementById('chartExpenses').getContext('2d');
  chartExpenses = new Chart(ctxExp, {
    type: 'doughnut',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 10, font: { size: 11 } } } },
      cutout: '65%'
    }
  });

  var ctxTasks = document.getElementById('chartTasks').getContext('2d');
  chartTasks = new Chart(ctxTasks, {
    type: 'bar',
    data: { labels: [], datasets: [] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { grid: { color: 'rgba(42,59,66,0.5)' }, beginAtZero: true, ticks: { stepSize: 1 } },
        x: { grid: { display: false } }
      }
    }
  });
  updateCharts();
}

function updateCharts() {
  if (!chartRevenue) return;
  updateRevenueChart();
  updateExpenseChart();
  updateTasksChart();
}

function updateRevenueChart() {
  var months = getLast6Months();
  var incomeData = [];
  var expenseData = [];

  months.forEach(m => {
    var monthFin = state.finances.filter(f => {
      var d = new Date(f.date);
      return d.getMonth() === m.month && d.getFullYear() === m.year;
    });
    incomeData.push(monthFin.filter(f => f.type === 'income').reduce((s, f) => s + f.val, 0));
    expenseData.push(monthFin.filter(f => f.type === 'expense').reduce((s, f) => s + f.val, 0));
  });

  chartRevenue.data.labels = months.map(m => m.label);
  chartRevenue.data.datasets = [
    { label: 'Receita', data: incomeData, borderColor: '#2DD4BF', backgroundColor: 'rgba(45,212,191,0.1)', tension: 0.3, fill: true },
    { label: 'Despesa', data: expenseData, borderColor: '#FCA5A5', backgroundColor: 'rgba(252,165,165,0.1)', tension: 0.3, fill: true }
  ];
  chartRevenue.update();
}

function updateExpenseChart() {
  var catTotals = {};
  state.finances.filter(f => f.type === 'expense').forEach(f => {
    catTotals[f.cat] = (catTotals[f.cat] || 0) + f.val;
  });

  var labels = Object.keys(catTotals);
  var data = labels.map(l => catTotals[l]);
  var colors = ['#7DD3FC', '#2DD4BF', '#FCA5A5', '#FCD34D', '#A78BFA', '#F472B6', '#34D399', '#FB923C', '#94A3B8'];

  chartExpenses.data.labels = labels.length > 0 ? labels : ['Sem dados'];
  chartExpenses.data.datasets = [{
    data: data.length > 0 ? data : [1],
    backgroundColor: data.length > 0 ? colors.slice(0, labels.length) : ['#2A3B42'],
    borderWidth: 0
  }];
  chartExpenses.update();
}

function updateTasksChart() {
  var weeks = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
  var doneTasks = state.tasks.filter(t => t.col === 'done');
  var weekData = [0, 0, 0, 0];

  doneTasks.forEach(t => {
    var d = new Date(t.updatedAt || t.createdAt);
    var weekIdx = Math.min(3, Math.floor((d.getDate() - 1) / 7));
    weekData[weekIdx]++;
  });

  chartTasks.data.labels = weeks;
  chartTasks.data.datasets = [{
    label: 'Concluidas',
    data: weekData,
    backgroundColor: '#7DD3FC',
    borderRadius: 6
  }];
  chartTasks.update();
}

function getLast6Months() {
  var result = [];
  var now = new Date();
  var mNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  for (var i = 5; i >= 0; i--) {
    var d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    result.push({ month: d.getMonth(), year: d.getFullYear(), label: mNames[d.getMonth()] });
  }
  return result;
}

// ============================================================
//  INITIALIZATION
// ============================================================
function renderAll() {
  updateKPIs();
  renderTasks();
  renderFinances();
  renderPipeline();
  renderGoals();
  renderNotes();
  populateFinanceFilters();
  updateCharts();
  renderFbCampaigns();
  updateFbKPIs();
  updateFbCharts();
}

document.addEventListener('DOMContentLoaded', function() {
  // Load from Supabase then initialize UI
  db.loadAll().then(function(data) {
    state = data;

    updateGreeting();
    updateUserBadges();
    setDefaultFinDate();
    setupTouchDrag();
    setupNoteEnter();
    initCharts();
    initFbCharts();
    updateFbConfigStatus();
    renderAll();

    // Restore sidebar state
    if (state.settings.sidebarMinimized) {
      document.getElementById('sidebar').classList.add('minimized');
      document.querySelector('.main-area').classList.add('sidebar-minimized');
    }

    // Finance modal default date
    var modalFinEl = document.getElementById('modalFinance');
    var observer = new MutationObserver(function() {
      if (modalFinEl && modalFinEl.classList.contains('active')) setDefaultFinDate();
    });
    observer.observe(modalFinEl, { attributes: true, attributeFilter: ['class'] });

    // Responsive sidebar on resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        document.getElementById('sidebar').classList.remove('active');
      }
    });
  });
});
