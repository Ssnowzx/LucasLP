# 🌊 Design System — Vantage Command Dashboard v2.0

## Visão Geral

Design System exclusivo para o **Vantage Command**, dashboard de gestão para boutique consultoria. Baseado em **Ocean Theme** com tokens, componentes reutilizáveis e padrões de interação.

**Versão:** 2.0
**Data:** Março 2026
**Status:** Live

---

## 1️⃣ Tokens de Design

### Cores — Paleta Oceânica

```css
/* BASE ABISSAL */
--ocean-abyss: #080E11;        /* Mais escuro ainda */
--ocean-bg: #0B1215;            /* Background principal */
--ocean-surface: #162125;       /* Cards, panels */
--ocean-surface-light: #1E2B30; /* Hover states */
--ocean-surface-hover: #243338; /* Interações */
--ocean-border: #2A3B42;        /* Bordas padrão */
--ocean-border-light: #344E57;  /* Bordas hover */

/* ACENTOS OCEÂNICOS */
--sea-foam: #7DD3FC;            /* Primary accent (botões, links) */
--sea-foam-dim: #4BA3D4;        /* Hover state */
--sea-foam-glow: rgba(125,211,252,0.12); /* Background subtil */

--lagoon-green: #2DD4BF;        /* Success, crescimento */
--lagoon-green-dim: #1A9E8F;    /* Hover */

--starfish-coral: #FCA5A5;      /* Danger, despesas */
--starfish-coral-dim: #E57373;  /* Hover */

--sand-gold: #FCD34D;           /* Warning, destaque */
--sand-gold-dim: #D4A017;       /* Hover */

/* TIPOGRAFIA */
--pearl-white: #F1F5F9;         /* Headings */
--sand-mist: #E2E8F0;           /* Body text */
--shell-muted: #94A3B8;         /* Secondary text */
--deep-muted: #64748B;          /* Disabled, subtle */

/* PRIORIDADES */
--priority-urgent: #EF4444;     /* Vermelho */
--priority-high: #F97316;       /* Laranja */
--priority-normal: #7DD3FC;     /* Azul sea-foam */
--priority-low: #64748B;        /* Cinza */
```

### Espaçamento

```css
/* Layout */
--sidebar-width: 240px;
--sidebar-width-mini: 70px;
--header-height: 60px;
--container-max: 1440px;

/* Padding */
0.5rem, 0.75rem, 1rem, 1.25rem, 1.5rem, 2rem

/* Gap (flexbox) */
0.25rem, 0.5rem, 0.75rem, 1rem, 1.5rem
```

### Tipografia

```css
/* Fontes */
--heading-font: 'Space Grotesk', sans-serif;  /* Boldface, technical */
--body-font: 'DM Sans', sans-serif;           /* Clean, friendly */

/* Escalas */
Heading 1: 1.3rem, 700, Space Grotesk
Heading 2: 1.15rem, 700, Space Grotesk
Heading 3: 0.9rem, 600, Space Grotesk
Body: 0.85rem, 400, DM Sans
Label: 0.75rem, 600, DM Sans (uppercase)
Caption: 0.7rem, 600, DM Sans
Logo Text: 0.9rem, 700, Space Grotesk
```

### Borders & Radius

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 14px;
--radius-xl: 18px;

/* Borders */
1px solid var(--ocean-border);
```

### Shadows

```css
--ocean-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
--ocean-shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.6);
```

### Transições

```css
--transition: 0.2s ease;
```

---

## 2️⃣ Componentes

### Botões

#### Primário
- **Uso:** Ações principais (criar, salvar, enviar). No Header, utiliza-se a variante `.btn-sm`.
- **Cor:** Sea-foam (#7DD3FC)
- **Hover:** Sea-foam-dim (#4BA3D4)
- **Padding:** 0.55rem 1.1rem (Sm: 0.25rem 0.5rem)
- **Border-radius:** 6px

```html
<button class="btn-primary btn-sm">+ Tarefa</button>
```

#### Secundário
- **Uso:** Ações secundárias (cancelar, filtros)
- **Bg:** ocean-surface-light
- **Border:** 1px ocean-border
- **Hover:** Border light, texto sand-mist

```html
<button class="btn-secondary">Cancelar</button>
```

#### Danger
- **Uso:** Delete, ações destrutivas
- **Bg:** rgba(239, 68, 68, 0.15)
- **Color:** starfish-coral
- **Hover:** rgba(239, 68, 68, 0.25)

```html
<button class="btn-danger">Excluir</button>
```

#### Help Chip (Dicas)
- **Uso:** Botão de ajuda contextual ao lado dos títulos de seção. Exibe um popover com dicas ao ser clicado.
- **Shape:** Pill (border-radius 20px)
- **Bg:** `rgba(125, 211, 252, 0.08)` — glow sutil cyan
- **Border:** `1px solid rgba(125, 211, 252, 0.22)`
- **Color:** `var(--sea-foam)` — sempre visível, sem precisar de hover
- **Hover/Active:** Glow aumenta + box-shadow cyan sutil
- **Ícone:** Sparkle 4-pontas (SVG fill, 11×11px)
- **Texto:** "Dicas" — `0.7rem, 600, DM Sans`

```html
<button class="help-btn" onclick="toggleHelp('help-id')" title="Dicas desta página">
  <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor" aria-hidden="true">
    <path d="M8 0.5L10.5 5.5L15.5 8L10.5 10.5L8 15.5L5.5 10.5L0.5 8L5.5 5.5Z"/>
  </svg>
  <span>Dicas</span>
</button>
```

**Popover associado (`.help-popover`):**
- Aparece abaixo do botão com animação `help-pop`
- Largura: 300px
- Título em sea-foam, lista com bullets `›`
- Fecha ao clicar fora ou ao abrir outro popover
- Auto-alinhamento: inverte para direita se perto da borda

### Cards

#### Funil & Operação Card (v2.1)
- **Uso:** Métricas de eficiência de funil e tempo de operação.
- **Componentes:** Mesmo padrão KPI, mas focados em contagem (`kpiTotalContacts`, `kpiTotalClosed`) e tempo (`kpiOpTime`).

#### KPI Card
- **Uso:** Métricas de crescimento
- **Componentes:**
  - Rótulo (label) - 0.7rem, muted
  - Valor (value) - 1.5rem, bold, pearl-white
  - Subtítulo - 0.7rem, deep-muted
  - Indicador de tendência (↑↓→)
- **Hover:** Lift (+2px transform), border-light

#### Task Card
- **Uso:** Cards do Kanban
- **Componentes:**
  - Título - 0.85rem, bold
  - Descrição - 0.75rem, muted
  - Meta-tags (owner, priority, label, due-date)
  - Ações (edit, delete) - aparecem ao hover
- **Priority Border:** Left 3px colored
- **Drag State:** opacity 0.5 (Native + Touch supported)

#### Client Card
- **Uso:** Pipeline de clientes
- **Componentes:**
  - Nome do cliente
  - Fee mensal
  - % Performance
  - Botões de ação (next, prev, delete)
- **Drag State:** opacity 0.5 (Native + Touch supported)

### Inputs & Forms

#### Text Input
- **Bg:** ocean-bg
- **Border:** 1px ocean-border
- **Color:** sand-mist
- **Focus:** Border sea-foam
- **Padding:** 0.65rem 0.85rem
- **Radius:** 10px

#### Select
- **Mesmo estilo do text input**
- **Cursor:** Pointer

#### Textarea
- **Mesmo do input**
- **Resize:** Vertical only
- **Rows:** 2-3

### Tabelas

```html
<table class="v-table">
  <thead>
    <tr><th>Coluna</th></tr>
  </thead>
  <tbody>
    <tr><td>Dado</td></tr>
  </tbody>
</table>
```

- **Header:** uppercase, muted, 0.7rem
- **Rows:** Hover = ocean-surface-light
- **Valores:** Income (green), Expense (coral)
- **Status tag:** Inline com background

### Badges & Tags

#### Meta-Tags (Kanban)
```html
<span class="task-meta-tag owner-lucas">Lucas</span>
<span class="task-meta-tag priority-urgent">Urgente</span>
<span class="task-meta-tag label-tag">Marketing</span>
<span class="task-meta-tag due-tag">15/04/2026</span>
```

#### Status Tags (Finances)
```html
<span class="status-tag status--income">Recebido</span>
<span class="status-tag status--expense">Pago</span>
```

### Modals

- **Overlay:** rgba(0,0,0,0.7) com blur(6px)
- **Content:** 480px wide (max 95vw), max-height 90vh
- **Bg:** ocean-surface
- **Border:** 1px ocean-border
- **Animation:** fadeIn 0.2s ease

### Sidebar

#### Expanded
- **Width:** 240px
- **Menuitems:** Flex com gap 0.25rem
- **Logo:** `VANTAGE COMMAND` com ícone de prisma oceânico.
- **Labels:** Visível

#### Minimized
- **Width:** 70px
- **Logo:** Hidden
- **Labels:** Hidden
- **Ícones:** Centerado

#### Mobile
- **Transform:** translateX(-100%)
- **.active:** translateX(0)

---

## 3️⃣ Padrões de Layout

### Grid System

#### KPI Grid
```css
grid-template-columns: repeat(4, 1fr);
gap: 1rem;

/* Tablet: 2 colunas */
/* Mobile: 1 coluna */
```

#### Charts Grid
```css
grid-template-columns: 1fr 1fr 1fr;
gap: 1rem;

/* Tablet: 2 colunas */
/* Mobile: 1 coluna */
```

#### Kanban Board
```css
grid-template-columns: repeat(4, 1fr);
gap: 1rem;

/* Tablet: 2 colunas */
/* Mobile: overflow-x auto */
```

#### Goals Grid
```css
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
gap: 1rem;
```

### Sidebar + Main Layout

```
┌─────────────┬──────────────────┐
│  Sidebar    │  Main Area       │
│  240px      │  flex: 1         │
│  (70px min) │                  │
├─────────────┼──────────────────┤
│             │  Header (60px)   │
│             │                  │
│             ├──────────────────┤
│             │  Pages Container │
│             │  (scrollable)    │
└─────────────┴──────────────────┘
```

---

## 4️⃣ Componentes de Página

### Page Intro Box
- **Gradient background:** Azul + Verde with opacity
- **Border:** 1px ocean-border
- **Padding:** 1.5rem
- **Radius:** 14px
- **Heading:** sea-foam, 1.3rem
- **Description:** muted, 0.9rem
- **Tips box:** Left-border 3px sea-foam

### Section Header
- **Display:** Flex, justify-between
- **Gap:** 1rem
- **Flex-wrap:** Wrap
- **Margin-bottom:** 1.25rem

### Chart Card
- **Bg:** ocean-surface
- **Border:** 1px ocean-border
- **Padding:** 1.25rem
- **Height container:** 220px
- **Canvas:** responsive

---

## 5️⃣ Estados & Interações

### Hover States
- **Botões:** Opacity/background change
- **Cards:** Border-color light, slight lift
- **Links:** Color change to sea-foam
- **Menu items:** Bg surface-hover, color sea-foam
- **Table rows:** Bg surface-light

### Focus States
- **Inputs:** Border sea-foam (outline: none)
- **Buttons:** Visual feedback (opacity/shadow)

### Active States
- **Menu items:** `.active` class
  - Bg: sea-foam-glow
  - Color: sea-foam
  - Border-color: sea-foam
- **Filter buttons:** `.active` same as menu
- **Pages:** `.active` = display: block

### Disabled States
- **Color:** deep-muted
- **Opacity:** 0.6
- **Cursor:** not-allowed

### Loading States
- **Spinner:** Pode usar animation CSS
- **Opacity:** Reduzir slightly

---

## 6️⃣ Tipografia & Texto

### Hierarquia

```
H1: Títulos de página (1.3rem, 700)
H2: Títulos de seção (1.15rem, 700)
H3: Subtítulos (0.9rem, 600)
Body: Texto principal (0.85rem, 400)
Label: Rótulos de form (0.75rem, 600)
Caption: Texto pequeno (0.7rem, 600)
```

### Casos de Uso

| Elemento | Size | Weight | Font | Color |
|----------|------|--------|------|-------|
| Page Title | 1.1rem | 700 | Space | pearl-white |
| Section Title | 1.15rem | 700 | Space | pearl-white |
| KPI Value | 1.5rem | 700 | Space | pearl-white |
| Card Label | 0.7rem | 600 | DM | shell-muted |
| Body Text | 0.85rem | 400 | DM | sand-mist |
| Muted | 0.8rem | 400 | DM | deep-muted |

---

## 7️⃣ Responsividade

### Breakpoints

| Device | Width | Sidebar | Grid |
|--------|-------|---------|------|
| Desktop | >1200px | 240px | Full |
| Tablet | 768-1200px | 200px / minimized | 2 cols |
| Mobile | <768px | Overlay | 1 col / scrollable |

### Mobile-First Rules

- **Sidebar:** Transform translateX(-100%), toggle with .active
- **Kanban:** Horizontal scroll com overflow-x
- **Grids:** Single column, flex-wrap
- **Typography:** Sem heading-greeting
- **Charts:** responsive: true, maintainAspectRatio: false

---

## 8️⃣ Acessibilidade

### Aria Attributes

```html
<input type="text" aria-label="Search">
<button aria-expanded="false">Menu</button>
```

### Focus Management

- Todos botões e inputs devem ser focusáveis
- Focus outline: 2px solid sea-foam
- Skip-to-content link (opcional)

### Semântica

- Usar `<button>` para ações
- Usar `<label>` para inputs
- Usar `<table>` para dados tabulares
- Usar `<header>`, `<main>`, `<aside>`, `<section>`

---

## 9️⃣ Animações

### Transições

```css
all 0.2s ease;  /* Default */
```

### Keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(-10px); }
  to { transform: translateX(0); }
}

@keyframes modalIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 🔟 Dark Mode

**Nota:** Dashboard é dark-only. Não há light mode.

---

## 1️⃣1️⃣ Uso de Ícones

### Emoji Icons (Inline)
```html
📊 Dashboard
📋 Kanban
💰 Financeiro
🎯 Pipeline
🏆 Metas
💬 Notas
```

### SVG Icons (Logo)
```html
<svg class="logo-icon"><!-- Logo do prisma oceânico --></svg>
```

---

## 1️⃣2️⃣ Scrollbar Customization

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ocean-bg); }
::-webkit-scrollbar-thumb { background: var(--ocean-border); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--ocean-border-light); }
```

---

## Checklist de Implementação

- [ ] Todas as cores usam tokens CSS
- [ ] Padding/margin respeitam escala de espaçamento
- [ ] Tipografia segue hierarquia
- [ ] Botões têm estados (hover, focus, active)
- [ ] Inputs têm focus style
- [ ] Cards têm hover effect
- [ ] Responsivo em 3 breakpoints
- [ ] Modals têm animação de entrada
- [ ] Sidebar funciona em mobile
- [ ] Acessibilidade semântica

---

**Mantido por:** Squad Poseidon
**Última atualização:** Março 2026
**Status:** Live ✅
