# 🎨 Design System — Vantage Command Dashboard

Sistema de design do **painel administrativo** (dashboard.html + login.html). Tema **Editorial Noir + Violet** — estilo profissional, editorial, inspirado em Linear / Vercel / Stripe.

> **Escopo:** apenas o app interno (`/dashboard.html`, `/login.html`). A landing page pública usa um sistema separado documentado em `DESIGN_SYSTEM.md` (tema Neon Green).

---

## 🎨 1. Paleta de cores

Todas as cores são expostas via CSS custom properties em `:root` de `css/dashboard.css`.

### Backgrounds (Editorial Noir)
Cores neutras frias, quase-preto, sem tinta azul ou marrom — estilo "editorial dark".

| Token | Hex | Uso |
|---|---|---|
| `--ocean-abyss` | `#050507` | Fundo mais escuro — sidebar, kanban columns, pipeline stages |
| `--ocean-bg` | `#0A0A0B` | Fundo principal do conteúdo |
| `--ocean-surface` | `#111114` | Cards, modais, painéis |
| `--ocean-surface-light` | `#17171B` | Superfície elevada, notes item, inputs |
| `--ocean-surface-hover` | `#1F1F24` | Estado hover em botões/cards |
| `--ocean-border` | `#242428` | Bordas sutis |
| `--ocean-border-light` | `#3A3A42` | Bordas enfatizadas (hover, focus) |

### Accent (Electric Violet)
Única cor de destaque. Usada para: elementos ativos, CTAs primários, focus ring, highlights.

| Token | Hex | Uso |
|---|---|---|
| `--sea-foam` | `#A78BFA` | Accent principal (texto, ícones, ring) |
| `--sea-foam-dim` | `#8B5CF6` | Accent hover / deeper |
| `--sea-foam-glow` | `rgba(167,139,250,0.12)` | Backgrounds translúcidos (active state, glow) |

> ⚠️ Os tokens mantêm o nome "sea-foam" por compatibilidade com código legado — o valor é violeta.

### Semânticas
Mantidas como universais de UI (verde success, amber warning, vermelho danger).

| Token | Hex | Uso |
|---|---|---|
| `--lagoon-green` | `#10B981` | Success, MRR positivo, fechamentos |
| `--lagoon-green-dim` | `#059669` | Success hover |
| `--sand-gold` | `#F59E0B` | Warning, "morno", pausado |
| `--sand-gold-dim` | `#D97706` | Warning hover |
| `--starfish-coral` | `#F87171` | Danger, despesas, perdidos |
| `--starfish-coral-dim` | `#EF4444` | Danger hover / delete |

### Texto
Cream quente (não branco puro) para hierarquia suave e legibilidade premium.

| Token | Hex | Uso |
|---|---|---|
| `--pearl-white` | `#FAFAF9` | Títulos, números-chave, texto destaque |
| `--sand-mist` | `#E4E4E7` | Texto de corpo |
| `--shell-muted` | `#A1A1AA` | Labels, texto secundário |
| `--deep-muted` | `#71717A` | Texto desabilitado, placeholders |

### Prioridades (Kanban)
| Token | Hex |
|---|---|
| `--priority-urgent` | `#EF4444` |
| `--priority-high` | `#F97316` |
| `--priority-normal` | `#A78BFA` |
| `--priority-low` | `#71717A` |

---

## 🖋️ 2. Tipografia

### Famílias
- **Display / headlines / números:** `Space Grotesk` (500/600/700)
- **UI / corpo:** `DM Sans` (400/500/600/700)

### Escala & uso

| Elemento | Tamanho | Peso | Transform |
|---|---|---|---|
| Page breadcrumb ("DASHBOARD.") | `1.35rem` | 700 | UPPERCASE + tracking `0.02em` + accent dot |
| Section title | `0.82rem` | 700 | UPPERCASE + tracking `0.16em` + `shell-muted` |
| KPI value | `1.9rem` | 700 | tracking `-0.01em` |
| KPI label | `0.68rem` | 600 | UPPERCASE + tracking `0.12em` |
| Card title | `0.85–0.9rem` | 600 | default |
| Body | `0.8–0.95rem` | 400–500 | default |

### Regra editorial
Labels pequenos e uppercase (tracking largo) + números grandes e tight (letter-spacing negativo) = hierarquia editorial estilo Bloomberg / Linear.

---

## 🧩 3. Componentes-chave

### KPI Card (`.kpi-card`)
- Background: `--ocean-surface`
- Border: 1px `--ocean-border`
- Padding: `1.35rem 1.4rem`
- Radius: `--radius-lg` (16px)
- Detalhe: linha gradient sutil no topo (`::before`)
- Hover: `translateY(-2px)` + glow violeta `rgba(167,139,250,0.08)` na sombra

### Sidebar (`.sidebar`)
- Background: `--ocean-abyss` (mais escuro que o conteúdo — cria profundidade)
- Largura: `240px` expandida, `70px` minimizada
- Menu item ativo: fundo `--sea-foam-glow` + **borda esquerda** sólida 2px em `--sea-foam-dim` (inset box-shadow)
- Transition: `0.2s ease` para width e transform

### Floating Sidebar Toggle (`.sidebar-toggle-floating`)
Botão circular **fixo sobreposto na borda** entre sidebar e conteúdo.
- Posição: `position: fixed; top: 88px; left: calc(var(--sidebar-width) - 14px);`
- Tamanho: `28px × 28px`, `border-radius: 50%`
- Conteúdo: chevron SVG single-path (`<`)
- Minimizado: `left` recalcula para `var(--sidebar-width-mini) - 14px` + chevron rotaciona `180deg` via `cubic-bezier(0.4, 0, 0.2, 1)`
- `z-index: 1050` (acima da sidebar `z-index: 1000`)
- Hidden em `max-width: 768px` (substituído pelo mobile hamburger no header)

### Botões primários (`.btn-primary`)
- Background: `--sea-foam` (violet)
- Texto: `--ocean-bg` (near-black)
- Font-weight: 700, font-size: 0.8rem
- Radius: `--radius-sm` (6px)
- Hover: `--sea-foam-dim`

### Formulários (inputs, selects, textareas)
- Background: `--ocean-bg`
- Border: 1px `--ocean-border`
- Focus: border `--sea-foam` + box-shadow `0 0 0 3px --sea-foam-glow`
- Radius: `--radius-md` (10px)

### Modal
- Overlay: `rgba(0,0,0,0.7)` + `backdrop-filter: blur(6px)`
- Content: `--ocean-surface` + border-radius `--radius-xl` (24px)
- Shadow: `--ocean-shadow-lg` (`0 10px 40px rgba(0,0,0,0.7)`)

### Charts (Chart.js defaults em `dashboard.js`)
- `Chart.defaults.color`: `#A1A1AA` (shell-muted)
- `Chart.defaults.borderColor`: `#242428` (ocean-border)
- Grid lines: `rgba(36,36,40,0.6)`
- Paleta multicolor (doughnut de categorias):
  ```
  ['#A78BFA', '#10B981', '#F59E0B', '#F87171', '#60A5FA',
   '#F472B6', '#34D399', '#FB923C', '#A1A1AA']
  ```

---

## 📐 4. Espaçamento & Radius

### Radius tokens
- `--radius-sm`: `6px` (tags, pequenos botões)
- `--radius-md`: `10px` (inputs, cards internos)
- `--radius-lg`: `16px` (cards, chart-cards)
- `--radius-xl`: `24px` (modais)

### Espaçamento vertical entre seções
- Section padding: `1rem 1.5rem 2rem`
- Gap entre cards (grid): `1rem`

### Shadows
- `--ocean-shadow`: `0 4px 20px rgba(0,0,0,0.5)` — cards default
- `--ocean-shadow-lg`: `0 10px 40px rgba(0,0,0,0.7)` — modais, panels

---

## 🎯 5. Ícones

### Sistema
Todos os ícones do menu da sidebar são **SVG inline outline**, `stroke-width: 2`, `stroke-linecap: round`, `stroke-linejoin: round`. Sem fill, sem emoji colorido. `color` herdado via `currentColor` (adota o accent violeta quando item ativo).

### Inventário de ícones do menu

| Página | Semântica | Metáfora |
|---|---|---|
| Dashboard | Overview | Layout assimétrico (grande + 3 pequenos) |
| Kanban | Board | 2 colunas com base sugerindo cards |
| Financeiro | Growth | Line chart com seta ascendente |
| Pipeline | Funnel | Funil (vendas) |
| Metas | Target | 3 círculos concêntricos (alvo) |
| Notas | Note | Sticky note com dobra + linhas |
| Facebook Ads | Megaphone | Megafone com poste |
| Leads | User+ | Pessoa com `+` |

### Toggle chevron
- `<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>`
- Stroke-width: `2.5`, size `14×14` dentro do círculo 28×28

---

## 📏 6. Breakpoints

| Breakpoint | Efeito |
|---|---|
| `≤ 1200px` | KPI grid 4→2 cols, charts 3→2 cols, kanban 4→2, pipeline 6→3 |
| `≤ 1024px` | Sidebar reduz para `200px` / mini `60px` |
| `≤ 768px` | Sidebar vira **drawer** (transform: translateX(-100%)), mobile hamburger aparece, kanban/pipeline viram scroll horizontal. Floating toggle desaparece. |
| `≤ 480px` | KPIs vão pra 1 col, header greeting some, padding reduz |

---

## 🔔 7. Sistema de alertas

### Toast (`.toast`)
- Bottom-right fixo, min-width `280px`, border-left `3px` colorida pelo tipo
- Animação: `toast-in` (cubic-bezier `0.34, 1.56, 0.64, 1` — overshoot sutil)
- Tipos: `.type-info` (violet), `.type-success` (emerald), `.type-warning` (amber), `.type-urgent` (red)

### Painel lateral (`.notif-panel`)
- Drawer direito, largura `380px`, slide-in `0.3s cubic-bezier(0.4, 0, 0.2, 1)`
- Items unread: fundo `rgba(167,139,250,0.05)` + barra lateral colorida pelo tipo

### Bell button (`.notif-bell-btn`)
- Square `38px`, shake infinito `3s` quando `.has-unread`

---

## 🚀 8. Regras de aplicação

1. **Única cor de accent:** violeta (`--sea-foam`) é a **única** cor de destaque. Não introduzir cyan, azul ou laranja como accent alternativo — isso quebra a coesão editorial.
2. **Semânticas intocáveis:** emerald/amber/red são reservados para estados (success/warning/danger). Não usar como decoração.
3. **Tipografia:** números e headlines em `Space Grotesk`, todo resto em `DM Sans`.
4. **Uppercase + tracking largo** em labels pequenos; **tight letter-spacing** em números grandes. Não misturar.
5. **Nunca fill em ícones:** sempre outline stroke. Nunca emoji colorido no UI chrome (sidebar, botões, headers) — emoji só permitido em conteúdo semântico (insight icons, menu-badge, notif-icon decorativos).
6. **Dark exclusivo:** tema é dark-only por design. Não implementar light mode (quebra a identidade editorial).

---

## 🗂️ 9. Arquivos do sistema

| Arquivo | Responsabilidade |
|---|---|
| `css/dashboard.css` | Todos os tokens + componentes do dashboard |
| `dashboard.html` | Markup principal + modals |
| `login.html` | CSS inline com tokens replicados (mesma paleta) |
| `js/dashboard.js` | Configuração de Chart.js defaults + paleta multicolor |

---

## 🔄 10. Histórico

| Versão | Data | Mudança |
|---|---|---|
| v1.0 | — | Ocean Theme (cyan + coral + gold) |
| **v3.0** | **2026-04-24** | **Editorial Noir + Violet** — paleta remapeada, tipografia editorial reforçada, sidebar floating toggle, ícones refinados |

---

*Sistema gerenciado via CSS custom properties. Para trocar o accent color, basta atualizar `--sea-foam` e `--sea-foam-dim` em `:root` de `css/dashboard.css`.*
