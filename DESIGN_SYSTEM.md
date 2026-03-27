# 🎨 Design System — Operação Boutique (Lucas Veloso)

Este documento define os padrões visuais e técnicos para manter a integridade, o profissionalismo e a alta conversão da landing page "Lucas Veloso — Estratégia de Marketplaces".

---

## 💎 1. Identidade Visual (Color Palette)

A paleta foi escolhida para transmitir **autoridade, exclusividade e precisão tecnológica**.

### 🖤 Backgrounds (Premium Dark)
- **Primary BG:** `#050508` (Preto absoluto para contraste máximo)
- **Surface (Cards):** `#0A0A0F` (Base dos cartões master e seções)
- **Light BG:** `#FFFFFF` (Seções de leitura/cases, foco em clareza)

### 🟢 Acentos de Conversão (Neon Green)
*Representa crescimento, lucro e precisão sênior.*
- **Primary:** `#B2FE02` (Main CTA, Headlines e Tags)
- **Glow Beam:** `linear-gradient(90deg, transparent, #B2FE02, transparent)` (Feixe de luz superior)
- **Success:** `#059669` (Resultados vitoriosos em fundo claro)

---

## 🖋️ 2. Tipografia Fluida (Responsive Scale)

Utilizamos a técnica de `clamp()` para garantir que os títulos se ajustem automaticamente entre Desktop e Mobile sem quebras.

- **Headlines (H1/H2):** `Space Grotesk` (Semibold/Bold)
  - *H1 Scale:* `clamp(2.4rem, 5vw, 4rem)`
  - *H2 Scale:* `clamp(1.8rem, 4vw, 2.8rem)`
- **Body:** `DM Sans` (Limpo e profissional)
  - *Regular:* `1rem`
  - *Small/Muted:* `0.85rem`

---

## 🔳 3. Componentes Master (Signature Patterns)

### 🛰️ Boutique Master Card (Command Center)
O padrão para blocos de alta autoridade da página.
- **Background:** `#0A0A0F` com borda sutil `rgba(178,254,2,0.22)`.
- **Top Beam Effect:** Um pseudo-elemento `::before` com altura de `3px` e gradiente neon no topo.
- **Shadow:** `inset 0 4px 12px rgba(178,254,2,0.08)` para criar profundidade de luz.
- **Width:** Máximo de `1000px` para evitar vazios visuais.

### 📼 Marquee Strip (Dark Variant)
- **Background:** `#000` (Preto absoluto).
- **Text:** White (`#FFFFFF`), bold (`700`), uppercase.
- **Punctuation:** Pontos neon (`#B2FE02`) com sombra de brilho (`box-shadow`).

### 🏷️ Section Tags (Centralized)
- **Style:** Caixa alta, fonte `Space Grotesk` negrito, fundo transparente com borda neon.
- **Animation:** `tagFloat` (flutuação infinita suave) para indicar vitalidade.
- **Position:** Sempre centralizada no topo da seção, fora do cartão principal.

---

## 🚀 4. Psicologia da Conversão (CRO)

1. **Escassez Real:** O contador de vagas (8/10) deve ser em formato circular (SVG) com animação de progresso.
2. **Autoridade Split:** Layouts de cartões master devem ser divididos (Split) entre Texto Persuasivo (Esquerda) e Prova/Ação (Direita).
3. **Contraste de Decisão:** CTAs principais sempre em verde sólido; CTAs secundários em fundo escuro com borda neon fina.

---

## 🧭 5. Navegação & Comportamento (Mobile)

Para maximizar o espaço de leitura e focar na mensagem central em telas pequenas, adotamos o seguinte padrão de comportamento:

1. **Navbar Superior (Topo):** No mobile, a barra de navegação **não deve ser fixa**. Ela usa `position: relative` para subir junto com o cabeçalho e sumir da tela conforme o usuário rola a página, eliminando ruídos visuais.
2. **Floating CTA (Rodapé):** Surge automaticamente após os primeiros **400px de scroll**. Este botão fixo no rodapé torna-se o único ponto de conversão persistente após a saída do Hero.
3. **Menu Dropdown:** Deve flutuar abaixo do logo com o efeito `menuSlideDown`, sem bloquear o topo da tela.

---
*Última atualização: 27 de Março de 2026 (Boutique Navigation Sync)*
