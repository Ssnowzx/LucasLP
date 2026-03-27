# 🎨 Design System — Operação Boutique (Lucas Veloso)

Este documento define os padrões visuais e técnicos para manter a integridade, o profissionalismo e a alta conversão da landing page.

---

## 💎 1. Identidade Visual (Color Palette)

A paleta foi escolhida para transmitir **autoridade, exclusividade e crescimento**.

### 🖤 Backgrounds (Premium Dark)
- **Primary BG:** `#0A0A0F` (Profundidade e elegância)
- **Surface:** `#111118` (Cards e elementos de primeira camada)
- **Surface 2:** `#1A1A24` (Hover e elementos secundários)
- **Light BG:** `#F5F5F7` (Seções de contraste/leitura limpa)

### 🟢 Acentos de Conversão (Neon Green)
*Representa crescimento, dinheiro e o sinal de "GO".*
- **Primary:** `#B2FE02` (Main CTA, Headlines de destaque)
- **Accent:** `#3AFF5F` (Gradientes e sucesso)
- **Glow:** `rgba(178, 254, 2, 0.12)` (Brilho e bordas suaves)

### ⚪ Tipografia & Texto
- **High Contrast:** `#FFFFFF` (Headlines em fundo escuro)
- **Dark Text:** `#0A0A0F` (Headlines em fundo claro)
- **Muted:** `#6B6B80` (Descrições e textos secundários)

---

## 🖋️ 2. Tipografia

- **Display (Headlines):** `Space Grotesk` (Moderno, tecnológico, autoritário)
- **Body:** `DM Sans` (Limpo, alta legibilidade, amigável)

---

## 🔳 3. Componentes & Padrões

### ✨ Linha de Brilho Premium (Glow Line)
O padrão para divisores de seção e rodapé deve usar o gradiente centralizado que transmite modernidade.

**CSS Standard:**
```css
.glow-line {
    height: 1px;
    width: 100%;
    background: linear-gradient(90deg, transparent 0%, rgba(178, 254, 2, 0.2) 20%, rgba(178, 254, 2, 0.5) 50%, rgba(178, 254, 2, 0.2) 80%, transparent 100%);
    border: none;
    margin: 0;
}
```

### 🔘 Botões CTA
- **Primary:** Gradiente Neon + Sombra de Projeção (Glow).
- **Behavior:** Hover com elevação sutil e aumento de brilho.
- **Radius:** `Full` (Padrão Apple/Moderno).

---

## 🚀 4. Espaçamento & Grid

- **Seção Padding:** `100px 0` (Desktop), `64px 0` (Mobile).
- **Border Radius:** `12px` (Padrão), `20px` (Cards Grandes).
- **Container Max-Width:** `1200px`.

---

## 🚀 5. Psicologia da Conversão (CRO)

1. **Urgência:** Sempre em tons escuros premium com ponto pulsante verde. Evitar vermelho "alerta" para não parecer spam.
2. **Hierarquia:** O verde Neon é reservado estritamente para o que faz o usuário **avançar** (CTAs e métricas de lucro).
3. **Autoridade:** Uso de `Space Grotesk` em caixa alta para tags de seção aumenta a percepção de método estruturado.

---
*Atualizado em: 2026-03-27*
