# 🎨 Design System — Operação Boutique (Lucas Veloso)

Este documento define os padrões visuais e técnicos para manter a integridade, o profissionalismo e a alta conversão da landing page "Lucas Veloso — Estratégia de Marketplaces".

---

## 💎 1. Identidade Visual (Color Palette)

A paleta foi escolhida para transmitir **autoridade, exclusividade e precisão tecnológica**.

### 🖤 Backgrounds (Premium Dark)
- **Primary BG (Body):** `#0A0A0F` (Base escura para contraste com Neon)
- **Surface (Cards/Master):** `#111118` (Profundidade sutil para elementos de interface)
- **Section Dark:** `#010103` (Preto puro para seções de impacto como Hero e FAQ)
- **Light BG:** `#FFFFFF` (Seções de leitura/cases, foco em clareza absoluta)

### 🟢 Acentos de Conversão (Neon Green)
*Representa crescimento, lucro e precisão sênior.*
- **Primary:** `#B2FE02` (Main CTA, Headlines e Tags)
- **Highlight (On Light):** Fundo `#B2FE02` com texto `#0A0A0F`
- **Glow Beam:** `linear-gradient(90deg, transparent, #B2FE02, transparent)` (Feixe de luz divisor)
- **Success:** `#00D26A` (Indicadores de vitória e progresso)

---

## 🖋️ 2. Tipografia Fluida (Responsive Scale)

Utilizamos a técnica de `clamp()` para garantir que os títulos se ajustem automaticamente entre Desktop e Mobile.

- **Headlines (H1/H2):** `Space Grotesk` (Bold)
  - *H1 Scale:* `clamp(1.8rem, 3.8vw, 2.8rem)` (Hero)
  - *H2 Scale:* `clamp(1.75rem, 4vw, 2.75rem)` (Seções)
- **Body:** `DM Sans` (Limpo e profissional)
  - *Standard:* `1rem`
  - *Compact:* `0.95rem` (Textos de cards)
  - *Micro:* `0.75rem` (Labels técnicas)

---

## 🔳 3. Componentes Master (Signature Patterns)

### 🛰️ Boutique Master Card (Command Center)
- **Background:** `#0A0A0F` (Dark background even on white sections).
- **Border:** `1px` sólido `rgba(178,254,2,0.15)`.
- **Layout:** Split Horizontal em desktop, empilhado vertical em mobile.
- **Visuals:** Marcadores circulares (SVG Progress) para escassez.

### 📼 Marquee Strip (Execution Loop)
- **Background:** `#000` absoluto.
- **Transition:** Loop infinito (`marqueeLeft`) com velocidade de `30s` (Normal) e `15s` (Fast).
- **Separators:** Neon Dot (`#B2FE02`) com sombra de brilho.

### 🏷️ Section Tags (Contextual)
- **Style:** Capsule shape, `Space Grotesk`, fundo `rgba(178,254,2,0.1)`.
- **Animation:** `tagFloat` (flutuação de 4px) para indicar "página viva".

---

## 🚀 4. Regras de Aplicação (Architect Rules)

1. **Alternância de Seções:** Nunca use mais de 3 seções escuras seguidas sem uma seção branca para "respiro" visual.
2. **Hierarquia de Cor:** O verde neon `#B2FE02` deve ser usado para **Ação** ou **Destaque Crítico**. Não use para textos longos de leitura.
3. **Imagens/Mídia:** Devem seguir o estilo "Hands-on": fotos reais de operação, vídeos de bastidores e dashboards técnicos. Evite stock photos genéricas.

---

## 🧭 5. Navegação & Comportamento (Mobile UX)

1. **Scroll Flow:** A Navbar superior é dinâmica. No mobile, ela acompanha o topo mas não bloqueia a visão durante a leitura profunda.
2. **Persistência de Prova:** O `floating-cta` deve ser habilitado após o primeiro fold para manter o caminho de conversão sempre aberto.
3. **Redução de Ruído:** Elementos decorativos (como o feixe de luz lateral) são ocultados em mobile para focar na legibilidade.

---
*Última atualização: 29 de Março de 2026 (Full Layout & Mobile Optimization Sync)*
