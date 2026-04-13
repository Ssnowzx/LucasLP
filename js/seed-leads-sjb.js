/**
 * Importador de Leads via arquivo HTML (exportado do Google Planilhas)
 * Abre seletor de arquivo, parseia a tabela, e insere no Supabase
 */

window.importLeadsFromFile = function() {
  if (!window.supabaseClient) {
    alert('Supabase nao conectado. Faca login primeiro.');
    return;
  }

  var input = document.createElement('input');
  input.type = 'file';
  input.accept = '.html,.htm';

  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;

    var btn = document.getElementById('btnImportSJB');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Lendo arquivo...';
    }

    var reader = new FileReader();
    reader.onload = function(ev) {
      var content = ev.target.result;
      var leads = parseGoogleSheetsHTML(content);

      if (leads.length === 0) {
        alert('Nenhum lead encontrado no arquivo.\n\nVerifique se:\n- O arquivo e uma planilha Google Sheets exportada como HTML\n- A planilha tem colunas: Empresa, Segmento, Porte, Telefone');
        resetBtn(btn);
        return;
      }

      // Show preview of what was found
      var preview = leads.slice(0, 3).map(function(l) { return '  - ' + l.name; }).join('\n');
      var extra = leads.length > 3 ? '\n  ... e mais ' + (leads.length - 3) : '';

      if (!confirm('Encontrados ' + leads.length + ' leads:\n' + preview + extra + '\n\nImportar todos?')) {
        resetBtn(btn);
        return;
      }

      if (btn) btn.textContent = 'Importando 0/' + leads.length + '...';
      insertLeads(leads, btn);
    };

    reader.readAsText(file, 'UTF-8');
  };

  input.click();
};

function resetBtn(btn) {
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:6px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Importar Leads';
    btn.style.background = 'var(--sand-gold)';
  }
}

function parseGoogleSheetsHTML(html) {
  var parser = new DOMParser();
  var doc = parser.parseFromString(html, 'text/html');
  var allRows = doc.querySelectorAll('tr');
  var leads = [];

  // Step 1: Find the header row containing "Empresa"
  var headerRowIdx = -1;
  var headerCells = null;

  for (var i = 0; i < allRows.length; i++) {
    var rowText = allRows[i].textContent;
    if (rowText.indexOf('Empresa') !== -1 && (rowText.indexOf('Segmento') !== -1 || rowText.indexOf('Porte') !== -1)) {
      headerRowIdx = i;
      headerCells = allRows[i].querySelectorAll('td, th');
      break;
    }
  }

  if (headerRowIdx === -1 || !headerCells) return [];

  // Step 2: Map column indices by header text
  var cols = {};
  for (var h = 0; h < headerCells.length; h++) {
    var txt = headerCells[h].textContent.trim().toLowerCase();
    if (txt === 'empresa' || txt === 'nome') cols.empresa = h;
    if (txt === 'segmento' || txt === 'foco') cols.segmento = h;
    if (txt === 'porte' || txt === 'faturamento') cols.porte = h;
    if (txt === 'site') cols.site = h;
    if (txt === 'instagram') cols.instagram = h;
    if (txt.indexOf('telefone') !== -1 || txt.indexOf('whatsapp') !== -1) cols.telefone = h;
    if (txt.indexOf('marketplace') !== -1) cols.marketplace = h;
    if (txt.indexOf('classifica') !== -1) cols.classificacao = h;
    if (txt.indexOf('qualificado') !== -1 || txt.indexOf('por que') !== -1) cols.qualificacao = h;
    if (txt.indexOf('abordagem') !== -1 || txt.indexOf('estrat') !== -1) cols.estrategia = h;
  }

  if (cols.empresa === undefined) return [];

  // Step 3: Parse data rows
  for (var r = headerRowIdx + 1; r < allRows.length; r++) {
    var cells = allRows[r].querySelectorAll('td, th');
    if (cells.length < 3) continue;

    var get = function(key) {
      if (cols[key] === undefined || cols[key] >= cells.length) return '';
      return (cells[cols[key]].textContent || '').trim();
    };

    var empresa = get('empresa');
    // Skip empty rows, number-only rows, or header-like rows
    if (!empresa || /^\d*$/.test(empresa) || empresa === '#') continue;

    var classificacao = get('classificacao');
    var qualificacao = get('qualificacao');
    var estrategia = get('estrategia');
    var siteTxt = get('site');
    var igTxt = get('instagram');
    var mkpTxt = get('marketplace');

    // Build combined goal text
    var parts = [];
    if (classificacao) parts.push(classificacao);
    if (qualificacao) parts.push(qualificacao);
    if (siteTxt && siteTxt.toLowerCase() !== 'nao encontrado' && siteTxt.toLowerCase() !== 'não encontrado') parts.push('Site: ' + siteTxt);
    if (igTxt && igTxt.toLowerCase() !== 'nao encontrado' && igTxt.toLowerCase() !== 'não encontrado') parts.push('IG: ' + igTxt);
    if (mkpTxt) parts.push('Marketplace: ' + mkpTxt);
    if (estrategia) parts.push('Estrategia: ' + estrategia);

    leads.push({
      name: empresa,
      email: '',
      whatsapp: get('telefone'),
      revenue: get('porte'),
      focus: get('segmento'),
      goal: parts.join(' | ')
    });
  }

  return leads;
}

async function insertLeads(leads, btn) {
  var successCount = 0;
  var errorCount = 0;
  var errors = [];

  for (var i = 0; i < leads.length; i++) {
    if (btn) btn.textContent = 'Importando ' + (i + 1) + '/' + leads.length + '...';

    // Use db.saveLead which is the proven method from the landing page form
    var ok = await window.db.saveLead(leads[i]);

    if (ok) {
      successCount++;
    } else {
      errorCount++;
      // Try direct insert to get error details
      var directResult = await window.supabaseClient.from('leads').insert([{
        name: leads[i].name,
        email: leads[i].email || '',
        whatsapp: leads[i].whatsapp || '',
        revenue: leads[i].revenue || '',
        focus: leads[i].focus || '',
        goal: leads[i].goal || '',
        created_at: new Date().toISOString()
      }]);
      if (directResult.error && errors.length < 3) {
        errors.push(leads[i].name + ': ' + (directResult.error.message || directResult.error.code || 'erro desconhecido'));
      }
    }
  }

  var msg = '';
  if (successCount > 0) {
    msg = successCount + ' leads importados com sucesso!';
  }
  if (errorCount > 0) {
    msg += (msg ? '\n' : '') + errorCount + ' leads falharam.';
    if (errors.length > 0) {
      msg += '\n\nDetalhes dos erros:\n' + errors.join('\n');
    }
  }
  if (!msg) msg = 'Nenhum lead processado.';

  alert(msg);

  if (btn) {
    if (successCount > 0) {
      btn.textContent = successCount + ' importados!';
      btn.style.background = 'var(--lagoon-green)';
      btn.disabled = false;
    } else {
      resetBtn(btn);
    }
  }

  // Reload leads list
  if (window.loadDashboardLeads) {
    window.loadDashboardLeads();
  }
}
