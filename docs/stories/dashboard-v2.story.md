# 🔱 Story: Dashboard Vantage Command v2.0

**Squad:** Poseidon
**Status:** Draft
**Prioridade:** Alta
**Data:** 2026-03-27

---

## Visão Geral

Dashboard completo de gestão para a sociedade boutique entre Lucas Veloso e Rodrigo. Centraliza TODAS as operações de negócio em uma única página — sem dependência de ferramentas externas (Trello, Notion, etc). Tema Ocean (Deep Sea Professional).

**Persistência:** localStorage estruturado para migração futura ao Supabase.

---

## 🎯 Módulos do Dashboard

### M1 — Header & Navegação
- [x] Logo "VANTAGE COMMAND" com ícone oceânico
- [ ] Saudação dinâmica (Bom dia/tarde/noite + nome)
- [ ] Tabs de navegação rápida (âncoras para seções)
- [ ] Botões de ação rápida: + Transação, + Tarefa, + Cliente
- [ ] Indicador de quem está logado (Lucas / Sócio)

### M2 — KPI Cards (Métricas de Crescimento)
Cards estratégicos para decisão rápida:

| KPI | Descrição | Cálculo |
|-----|-----------|---------|
| MRR | Receita Recorrente Mensal | Soma fees clientes ativos |
| Receita Total | Receita do mês corrente | Soma entradas do mês |
| Despesas | Total de gastos do mês | Soma saídas do mês |
| Lucro Líquido | Resultado operacional | Receita - Despesas |
| Margem (%) | Saúde do lucro | (Lucro / Receita) × 100 |
| Clientes Ativos | Slots boutique ocupados | Count status=active / 5 |
| Ticket Médio | Valor médio por cliente | MRR / Clientes Ativos |
| Crescimento MoM | Variação mês a mês | ((MRR atual - anterior) / anterior) × 100 |

- [ ] 8 cards em grid responsivo (4 cols desktop, 2 cols tablet, 1 col mobile)
- [ ] Indicadores de tendência (↑ verde, ↓ vermelho, → neutro)
- [ ] Tooltips explicativos em cada card

### M3 — Gráficos de Performance
- [ ] **Revenue Trend** (Line Chart): Receita vs Despesa últimos 6 meses
- [ ] **Breakdown de Despesas** (Donut Chart): Categorias de gastos
- [ ] **Performance Semanal** (Bar Chart): Tarefas concluídas por semana
- [ ] Todos com tema Ocean (cores: sea-foam, lagoon-green, starfish-coral)

### M4 — Kanban Board (Funcional Completo)
Substitui Trello/Notion com funcionalidade nativa:

**4 Colunas:**
1. 📋 Backlog — Ideias e tarefas futuras
2. 🔄 Em Andamento — Work in progress
3. 👁️ Em Revisão — Aguardando validação de Rodrigo
4. ✅ Concluído — Done

**Card de Tarefa:**
- Título (obrigatório)
- Descrição (opcional)
- Responsável: Lucas | Rodrigo (avatar/badge)
- Prioridade: Urgente | Alta | Normal | Baixa (cor-coded)
- Prazo (date picker)
- Labels/Tags customizáveis
- Botão de deletar

**Funcionalidades:**
- [ ] Drag & drop entre colunas
- [ ] Filtro por responsável (toggle Lucas/Sócio/Todos)
- [ ] Filtro por prioridade
- [ ] Contador de tasks por coluna
- [ ] Modal de criação/edição completo
- [ ] Confirmação ao deletar
- [ ] Ordenação por prioridade dentro da coluna

### M5 — Gestão Financeira
Controle total de entrada/saída:

**Tabela de Transações:**
- Data | Descrição | Categoria | Responsável | Valor | Status
- Filtros por: tipo (entrada/saída), categoria, mês, responsável
- Ordenação por data/valor

**Categorias de Despesa:**
- Ads/Tráfego Pago
- Ferramentas/Software
- Operacional
- Impostos
- Pró-labore
- Marketing
- Outros

**Cards Resumo Financeiro:**
- Total Entradas do mês
- Total Saídas do mês
- Saldo atual
- Projeção próximo mês

- [ ] CRUD completo de transações
- [ ] Filtros e busca
- [ ] Cálculos automáticos de saldo
- [ ] Categorização obrigatória
- [ ] Identificação de responsável (Lucas/Sócio)

### M6 — Pipeline de Clientes
Gestão visual dos 5 slots boutique:

**Estágios:**
1. 🔲 Vazio — Slot disponível
2. 📞 Lead — Prospecto em contato
3. 📝 Proposta — Proposta enviada
4. 🚀 Onboarding — Configuração inicial
5. ✅ Ativo — Cliente operando
6. ⚠️ Alerta — Atenção necessária

**Card de Cliente:**
- Nome
- Fee mensal
- % Performance
- Estágio atual
- Data de início
- Observações

- [ ] 5 slots visuais estilo pipeline
- [ ] Drag & drop entre estágios
- [ ] Modal de CRUD de clientes
- [ ] Indicador visual de saúde (verde/amarelo/vermelho)

### M7 — Metas & OKRs
Acompanhamento de objetivos do negócio:

- [ ] Metas mensais com barra de progresso
- [ ] Input de meta (valor alvo) e progresso atual
- [ ] Categorias: Receita, Clientes, Tarefas, Ads
- [ ] Visual de % atingido com cores graduais

### M8 — Notas Rápidas (Lucas & Rodrigo)
Comunicação interna sem ferramentas externas:

- [ ] Área de notas compartilhadas
- [ ] Timestamp em cada nota
- [ ] Identificação de quem escreveu (Lucas/Sócio)
- [ ] Últimas 20 notas visíveis
- [ ] Input para nova nota

---

## 🌊 Design System — Ocean Theme v2

### Paleta Expandida
```css
/* Base Abissal */
--ocean-abyss: #080E11;
--ocean-bg: #0B1215;
--ocean-surface: #162125;
--ocean-surface-light: #1E2B30;
--ocean-surface-hover: #243338;
--ocean-border: #2A3B42;
--ocean-border-light: #344E57;

/* Acentos Oceânicos */
--sea-foam: #7DD3FC;           /* Primary accent */
--sea-foam-dim: #4BA3D4;       /* Hover state */
--lagoon-green: #2DD4BF;       /* Success/growth */
--lagoon-green-dim: #1A9E8F;
--starfish-coral: #FCA5A5;     /* Danger/expense */
--starfish-coral-dim: #E57373;
--sand-gold: #FCD34D;          /* Warning/highlight */
--pearl-white: #F1F5F9;        /* Headings */
--sand-mist: #E2E8F0;          /* Body text */
--shell-muted: #94A3B8;        /* Secondary text */
--deep-muted: #64748B;         /* Disabled/subtle */

/* Prioridades */
--priority-urgent: #EF4444;
--priority-high: #F97316;
--priority-normal: #7DD3FC;
--priority-low: #64748B;
```

### Responsividade
- Desktop: 1400px container, grids de 4 colunas
- Tablet (≤1024px): grids de 2 colunas, kanban scrollável
- Mobile (≤768px): 1 coluna, kanban horizontal swipe

---

## 📦 Estrutura de Dados (localStorage → Supabase Ready)

```javascript
const STORAGE_KEYS = {
  tasks: 'vantage_tasks',
  finances: 'vantage_finances',
  clients: 'vantage_clients',
  goals: 'vantage_goals',
  notes: 'vantage_notes',
  settings: 'vantage_settings'
};

// Estrutura compatível com Supabase schema
// Cada entidade tem: id (uuid), created_at, updated_at
```

---

## ✅ Critérios de Aceitação

1. Dashboard carrega em < 2s
2. Todos os módulos funcionais com localStorage
3. Drag & drop funciona em desktop e mobile (touch)
4. Responsivo em 3 breakpoints (mobile/tablet/desktop)
5. Tema Ocean consistente em TODOS os elementos
6. Zero dependências de APIs pagas
7. Dados persistem entre reloads (localStorage)
8. Cálculos financeiros corretos (verificados)
9. Filtros do Kanban funcionais
10. Charts renderizam com dados dinâmicos

---

## 📁 File List

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `dashboard.html` | 🔄 Rewrite | HTML completo com todos os módulos |
| `css/dashboard.css` | 🔄 Rewrite | Ocean Theme v2 + responsivo |
| `js/dashboard.js` | 🔄 Rewrite | Engine completa com state management |
| `squads/poseidon/squad.yaml` | ✅ Criado | Definição da squad |
| `docs/stories/dashboard-v2.story.md` | ✅ Criado | Este documento |

---
*Squad Poseidon — Orion orchestrating 🎯*
