# 🔱 Arquitetura: Oceanic Boutique Dashboard

Este documento detalha a estrutura técnica e funcional do Centro de Comando da sociedade entre Lucas Veloso e Rodrigo.

## 🌊 1. Visão Geral
Um painel administrativo nativo focado em **Crescimento Acelerado** e **Transparência de Sociedade**, operando em regime de "Boutique" (máximo 5 clientes).

## 🛠️ 2. Stack Tecnológico
- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Gráficos:** Chart.js (Oceanic Theme).
- **Backend/DB:** Supabase (PostgreSQL + RLS).
- **Persistência Temporária:** LocalStorage (enquanto o Supabase slot não libera).

## 🗄️ 3. Modelo de Dados (Supabase)

### 3.1 `clients_slots`
- `id`: uuid (PK)
- `name`: text (Nome do Cliente)
- `status`: text (Empty, Onboarding, Active, Warning)
- `monthly_fee`: numeric (Valor Fixo)
- `perf_percent`: numeric (% de Performance)

### 3.2 `client_performance`
- `id`: uuid (PK)
- `client_id`: uuid (FK)
- `ref_date`: date (Mês de referência)
- `revenue`: numeric (Faturamento Bruto)
- `ads_spend`: numeric (Investimento Ads)
- `organic_share`: numeric (% Orgânico)

### 3.3 `society_finances`
- `id`: uuid (PK)
- `description`: text
- `amount`: numeric
- `type`: text (Income, Expense)
- `partner_owner`: text (Lucas, Rodrigo)

### 3.4 `strategic_tasks`
- `id`: uuid (PK)
- `title`: text
- `column_name`: text (Backlog, Focus, Review, Done)
- `impact_level`: integer (1-5 Estrelas)

## 🎨 4. Design System (Deep Sea Professional)
- **Primary BG:** `#0B1215` (Abismo)
- **Surface:** `#162125` (Coral Shadow)
- **Accent:** `#7DD3FC` (Sea Foam - Azul Pastel)
- **Success:** `#2DD4BF` (Lagoon - Verde Água)
- **Warning:** `#FCA5A5` (Starfish - Coral Pastel)

## ⚖️ 5. Regras de Negócio (Lógica @analyst)
1. **Dinheiro Travado (Insight):** Alerta se `ads_spend` cresce > 15% enquanto `revenue` cresce < 5%. (Implementado via proxy de despesas categorizadas como "Ads").
2. **Saúde da Boutique:** Indicador visual de slots ocupados (x/5). Foco em manter exclusividade e alto ticket.
3. **Divisão de Sociedade:** Cálculo automático de lucro líquido pós-custos operacionais.
4. **Funil & Operação:**
   - **Tempo de Operação:** Dias decorridos desde `portfolioStartDate` (Padrão: 01/03/2026).
   - **Taxa de Conversão:** Proporção entre clientes no estágio `active` e o total de contatos na base.

## 📈 6. KPIs Estratégicos (Engine v2.0)
- **MRR:** Soma de `monthly_fee` de clientes ativos.
- **Ticket Médio:** `MRR / Clientes Ativos`.
- **Growth MoM:** Variação percentual da receita em relação ao mês anterior.
- **Revenue/Expense Trends:** Comparativo visual de entradas vs saídas.

---
*Atualizado em: 29 de Março de 2026 — Squad Poseidon*
