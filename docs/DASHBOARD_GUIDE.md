# 📊 Guia de Uso — Vantage Command Dashboard

**Versão:** 2.0
**Última atualização:** Março 2026
**Para:** Lucas & Rodrigo

---

## 🌊 Bem-vindo ao Vantage Command

Seu **centro de comando centralizado** para gestão do negócio boutique. Substitui Trello, Notion e planilhas — tudo em um único dashboard com dados persistentes em seu navegador.

**O que você consegue fazer aqui:**
- 📊 Acompanhar KPIs críticos em tempo real
- 📋 Organizar tarefas com Kanban funcional (drag & drop)
- 💰 Controlar receitas e despesas com categorização automática
- 🎯 Gerenciar clientes em pipeline de 6 estágios
- 🏆 Acompanhar metas mensais com progresso visual
- 💬 Compartilhar notas rápidas entre Lucas e Rodrigo
- 📢 Monitorar campanhas do Facebook Ads com KPIs dedicados

---

## ⚡ Início Rápido

### 1. Primeiro Acesso
1. Abra o dashboard no seu navegador
2. Veja o **menu lateral esquerdo** (📊 Dashboard, 📋 Kanban, 💰 Financeiro, etc.)
3. Clique em **seu nome no canto inferior esquerdo** para alternar entre Lucas e Rodrigo
4. Todos os dados são salvos automaticamente no seu navegador

### 2. Navegação
- **Desktop/Tablet:** Use o menu lateral expansível
- **Mobile:** Clique no ☰ no canto superior esquerdo para abrir/fechar o menu
- **Minimizar sidebar:** Clique no ⊟ (hamburguinho) ao lado da logo

### 3. Primeiros Passos Recomendados
1. **Configure suas metas** (📊 Dashboard → Seção "Metas")
2. **Adicione seus clientes** (🎯 Pipeline)
3. **Registre uma transação** (💰 Financeiro)
4. **Crie sua primeira tarefa** (📋 Kanban)

---

## 📖 Guia Completo por Setor

---

### 📊 DASHBOARD (Visão Geral)

**O que é?**
Sua tela inicial com visão de 360° do negócio. Concentra os KPIs mais críticos em 3 seções:

#### 1️⃣ Métricas de Crescimento (8 Cards)

| Card | Significado | Como Usar |
|------|------------|-----------|
| **MRR** | Receita Recorrente Mensal | Soma de fees de clientes ativos |
| **Receita Total** | Entrada do mês atual | Verificar saúde mensal |
| **Despesas** | Total gasto no mês | Acompanhar burn rate |
| **Lucro Líquido** | Receita - Despesas | Indicador de saúde financeira |
| **Margem (%)** | (Lucro / Receita) × 100 | Meta: 50%+ é saudável |
| **Clientes Ativos** | Slots boutique ocupados | De 0 a 5 |
| **Ticket Médio** | MRR / Clientes Ativos | Valor médio por cliente |
| **Crescimento MoM** | Variação mês anterior | % de crescimento mensal |

**Indicadores de Tendência:**
- 📈 **Verde (↑):** Crescimento positivo
- 📉 **Vermelho (↓):** Queda
- ➡️ **Neutro (→):** Sem variação

**Exemplo:**
```
Se você tem 3 clientes com fees de R$5.000, R$3.000 e R$2.000:
- MRR = R$10.000
- Ticket Médio = R$3.333
- Clientes Ativos = 3/5
```

#### 2️⃣ Gráficos de Performance (3 Gráficos)

**Revenue Trend (Linha):**
- Receita vs Despesa últimos 6 meses
- Use para: Identificar sazonalidade, planejar crescimento

**Breakdown de Despesas (Donut):**
- Distribuição por categoria (Ads, Software, Operacional, etc.)
- Use para: Encontrar onde o dinheiro está indo, otimizar custos

**Performance Semanal (Barra):**
- Tarefas concluídas por semana (últimas 4 semanas)
- Use para: Avaliar produtividade, planejar workload

---

### 📋 KANBAN (Gestão de Tarefas)

**O que é?**
Seu **Trello nativo** — organize tarefas por estágio sem sair do dashboard.

#### 4 Colunas (Estágios)

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ 📋        │    │ 🔄        │    │ 👁️        │    │ ✅        │
│ Backlog   │ → │ Progresso │ → │ Revisão  │ → │ Concluído│
│ (Ideias)  │    │ (WIP)     │    │ (Rodrigo)│    │ (Done)   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

#### Como Criar uma Tarefa

1. Clique em **+ Adicionar Tarefa** na seção Kanban
2. Preencha o modal:
   - **Título** (obrigatório) — Ex: "Enviar proposta para TechCorp"
   - **Descrição** (opcional) — Contexto adicional
   - **Responsável** — Lucas ou Rodrigo
   - **Prioridade** — Urgente / Alta / Normal / Baixa (cores indicam urgência)
   - **Prazo** — Data de entrega esperada
   - **Labels** — Tags customizáveis (Marketing, Ops, etc.)
3. Clique em **Criar**

#### Como Mover Tarefas

**Desktop:**
- Arraste o card para a próxima coluna

**Mobile:**
- Toque e segure o card, arraste para a coluna desejada

#### Filtros Disponíveis

```
Filtrar por Responsável:  Lucas | Rodrigo | Todos
Filtrar por Prioridade:   Urgente | Alta | Normal | Baixa
```

**Exemplo de Workflow:**
```
1. Tarefa criada em "Backlog"
2. Move para "Progresso" quando começa
3. Move para "Revisão" quando pronto
4. Move para "Concluído" após Rodrigo validar
```

#### Cores de Prioridade

| Prioridade | Cor | Urgência |
|-----------|-----|----------|
| Urgente | 🔴 Vermelho (#EF4444) | HOJE |
| Alta | 🟠 Laranja (#F97316) | Esta semana |
| Normal | 🔵 Azul (#7DD3FC) | Esta semana/próxima |
| Baixa | ⚫ Cinza (#64748B) | Quando houver tempo |

#### Dicas do Kanban

- ✅ Sempre especifique o **Responsável** (Lucas ou Rodrigo) — evita duplicação
- ✅ Use **Prazo** para acompanhar deadlines críticos
- ✅ **Labele** por categoria (Marketing, Financeiro, Dev, etc.)
- ✅ Revise **"Backlog"** toda segunda-feira
- ❌ Não acumule tarefas em "Progresso" (máx. 5-7 por coluna)
- ❌ Não deixe tarefas vencidas — mova para "Concluído" ou reajuste prazo

---

### 💰 FINANCEIRO (Gestão Financeira)

**O que é?**
Controle completo de entradas e saídas com categorização automática.

#### 3 Cards de Resumo

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Total Entradas  │  │ Total Saídas    │  │ Saldo Atual     │
│ R$ 45.000       │  │ R$ 15.000       │  │ R$ 30.000       │
│ (Mês Atual)     │  │ (Mês Atual)     │  │ (Acumulado)     │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

#### Como Adicionar uma Transação

1. Clique em **+ Adicionar Transação**
2. Preencha:
   - **Data** — Quando ocorreu (obrigatório)
   - **Descrição** — Ex: "Pagamento cliente TechCorp", "Conta AWS" (obrigatório)
   - **Tipo** — Entrada / Saída (obrigatório)
   - **Categoria** — Veja lista abaixo (obrigatório)
   - **Valor** — Número sem R$ (obrigatório)
   - **Responsável** — Quem registrou (Lucas ou Rodrigo)
   - **Status** — Pendente / Recebido / Pago
3. Clique em **Salvar**

#### Categorias de Despesa

| Categoria | Exemplos | Atalho |
|-----------|----------|--------|
| **Ads/Tráfego** | Facebook Ads, Google Ads, LinkedIn | Ad spend, paid traffic |
| **Ferramentas/Software** | Supabase, SendGrid, Stripe | SaaS tools, subscriptions |
| **Operacional** | Hospedagem, domínios, internet | Monthly ops |
| **Impostos** | IRPJ, ICMS, contribuições | Tax payments |
| **Pró-labore** | Salário Lucas/Rodrigo, distribuição lucro | Personal withdrawal |
| **Marketing** | Criação conteúdo, design, copywriting | Content, branding |
| **Outros** | Despesas não categorizadas | Miscellaneous |

**Categorias de Entrada:**
- Fees de clientes
- Consultoria/Serviços adicionais
- Investimento externo
- Outros

#### Tabela de Transações

A tabela mostra todas as transações com:
- **Data** — Ordenável
- **Descrição** — O que foi
- **Categoria** — Visual (cores por tipo)
- **Responsável** — Quem registrou
- **Valor** — Entrada (+) ou Saída (-)
- **Status** — Pendente/Recebido/Pago

#### Filtros & Busca

```
Filtrar por:
- Tipo (Entrada / Saída)
- Categoria (veja lista)
- Mês (dropdown)
- Responsável (Lucas / Rodrigo)

Ordenar por:
- Data (crescente/decrescente)
- Valor (maior/menor)
```

#### Cálculos Automáticos

```
Total Entradas  = Soma de todas as entradas do mês
Total Saídas    = Soma de todas as saídas do mês
Saldo Atual     = Entradas - Saídas (acumulado)
Margem (%)      = (Saldo / Entradas) × 100
```

#### Dicas Financeiras

- ✅ **Registre diariamente** — Evita esquecer transações
- ✅ **Sempre categorize** — Essencial para análise de burn rate
- ✅ **Identifique responsável** — Rastreabilidade entre Lucas e Rodrigo
- ✅ **Revise semanalmente** — Identifique anomalias cedo
- ❌ Não misture contas pessoais com empresariais
- ❌ Não deixe transações em "Pendente" indefinidamente

---

### 🎯 PIPELINE (Gestão de Clientes)

**O que é?**
Sua **visão visual dos 5 slots boutique** do negócio. Acompanhe clientes do contato até o sucesso.

#### 6 Estágios

```
1️⃣ VAZIO           2️⃣ LEAD            3️⃣ PROPOSTA
Slot disponível    Prospecto em       Proposta
                   contato             enviada

4️⃣ ONBOARDING      5️⃣ ATIVO           6️⃣ ALERTA
Configuração       Cliente            Atenção
inicial            operando           necessária
```

#### Como Adicionar um Cliente

1. Clique em **+ Adicionar Cliente**
2. Preencha:
   - **Nome do Cliente** — Obrigatório
   - **Fee Mensal** — Valor em R$ (ex: 5000)
   - **% Performance** — Resultado esperado (0-100%)
   - **Estágio** — Onde ele está na jornada
   - **Data de Início** — Quando começou (se ativo)
   - **Observações** — Notas internas
3. Clique em **Salvar**

#### Como Mover Clientes Entre Estágios

**Desktop:**
- Arraste o card para o próximo estágio

**Mobile:**
- Toque e segure, arraste para o novo estágio

#### Indicador de Saúde

Cada card de cliente tem cor indicadora:
- 🟢 **Verde** — Saudável, em dia
- 🟡 **Amarelo** — Requer atenção
- 🔴 **Vermelho** — Crítico, ação imediata

#### Fluxo Recomendado

```
VAZIO (slot disponível)
  ↓
LEAD (enviar proposta em 7 dias)
  ↓
PROPOSTA (aguardar decisão, 14 dias)
  ↓
ONBOARDING (setup 30 dias)
  ↓
ATIVO (acompanhamento contínuo)
  ↓
ALERTA (se performance <50% esperado)
  ↓
(Re-converter ou desligar)
```

#### KPI: Ocupação

```
Clientes Ativos / 5 Slots × 100 = Ocupação %

Exemplo:
- Você tem 3 clientes ativos
- 3 / 5 × 100 = 60% de ocupação
- Ainda há 2 slots disponíveis
```

#### Dicas do Pipeline

- ✅ **Revise semanalmente** — Identifique gargalos
- ✅ **Acompanhe prazos** — 14 dias em PROPOSTA é máximo
- ✅ **Documente observações** — Histórico é crucial
- ✅ **Mova para ALERTA** se performance <75% esperado
- ❌ Não deixe em ONBOARDING >30 dias sem evolução
- ❌ Não perca clientes em VAZIO — defina meta de ocupação

---

### 🏆 METAS (Objetivos de Negócio)

**O que é?**
Acompanhamento visual de metas mensais com **barra de progresso**.

#### Como Criar uma Meta

1. Clique em **+ Adicionar Meta**
2. Preencha:
   - **Nome da Meta** — Ex: "Atingir R$50k em MRR"
   - **Categoria** — Receita / Clientes / Tarefas / Ads
   - **Valor Alvo** — Número esperado
   - **Valor Atual** — Progresso atual (pode editar)
3. Clique em **Salvar**

#### Progresso Visual

```
Receita Mensal:  [████████░░] 80% de R$50.000
Novos Clientes:  [███░░░░░░░] 30% (meta: 2, atual: 0.6)
Tarefas Concluídas: [████████░░] 80% de 50 tarefas
Roi em Ads:      [██████░░░░] 60% de R$10k investido
```

**Cores Progressivas:**
- 0-25% → 🔴 Vermelho (atrasado)
- 25-50% → 🟠 Laranja (precisa acelerar)
- 50-75% → 🟡 Amarelo (no caminho)
- 75-100% → 🟢 Verde (meta atingida!)
- 100%+ → 🎉 Azul (superou!)

#### Categoria Recomendadas

| Categoria | Meta Exemplo | Frequência |
|-----------|-------------|-----------|
| **Receita** | R$50.000 MRR | Mensal |
| **Clientes** | 3 novos clientes | Mensal |
| **Tarefas** | 50 tarefas concluídas | Semanal/Mensal |
| **Ads** | ROI >3x em Ad Spend | Mensal |

#### Dicas de Metas

- ✅ **Máximo 4-6 metas** por mês (foco)
- ✅ **Revise semanalmente** — Ajuste se necessário
- ✅ **Celebre conquistas** — Marca como concluída quando atingida
- ❌ Não crie metas irrealistas (desmotiva)
- ❌ Não deixe metas velhas (apague depois do mês)

---

### 💬 NOTAS (Comunicação Interna)

**O que é?**
**Slack simplificado** — compartilhe notas rápidas entre Lucas e Rodrigo sem ferramentas externas.

#### Como Adicionar uma Nota

1. Clique no campo de input na parte inferior
2. Digite sua mensagem
3. Clique em **Enviar**

#### O que Aparece em Cada Nota

```
[NOME DO AUTOR] — Hora/Data
"Conteúdo da nota aqui..."

Exemplo:
Lucas — 14:32, 27/03/2026
"Cliente TechCorp quer reunião amanhã. Confirmou?"
```

#### Dicas de Notas

- ✅ Use para **decisões rápidas** ("Aumentar fee de X de R$3k para R$5k?")
- ✅ Use para **updates críticos** ("Proposta saiu, aguardando resposta")
- ✅ Use para **lembretes** ("Cobrar fatura de Y até sexta")
- ❌ Não use para conversas longas (use WhatsApp/Slack)
- ❌ Não delete notas sem motivo (histórico é importante)

---

### 📢 FACEBOOK ADS (Gestão de Tráfego Pago)

**O que é?**
Painel dedicado para monitorar e gerenciar suas campanhas de tráfego pago no Facebook/Meta Ads. Registre campanhas manualmente ou conecte a API do Facebook Marketing para sincronizar dados automaticamente.

#### Configuração da API

1. Acesse a página **Facebook Ads** no menu lateral
2. Na seção **Configuração da API**, preencha:
   - **Access Token** — Token do Facebook Marketing API
   - **Ad Account ID** — ID da conta de anúncios (formato: `act_XXXXXXXXX`)
3. Clique em **Salvar Configuração**
4. Use **Testar Conexão** para verificar se a API está funcionando

> **Nota:** A chave da API fica salva localmente no localStorage do seu navegador. Para maior segurança, considere a futura integração com Supabase.

#### 8 KPIs de Performance

| KPI | Significado | Referência Saudável |
|-----|-----------|---------------------|
| **Total Gasto** | Investimento total em ads | Dentro do orçamento |
| **Impressões** | Quantas vezes o ad foi exibido | Depende do orçamento |
| **Cliques** | Interações com o ad | Quanto mais, melhor |
| **Conversões** | Ações realizadas (leads, vendas) | Meta específica |
| **CTR Médio** | Click-Through Rate (Cliques / Impressões) | > 1% é bom |
| **CPC Médio** | Custo por Clique | < R$3 é bom |
| **CPM Médio** | Custo por 1.000 Impressões | < R$30 é bom |
| **ROAS Médio** | Return on Ad Spend | > 3x é saudável |

#### Como Adicionar uma Campanha

1. Clique em **+ Adicionar Campanha**
2. Preencha:
   - **Nome da Campanha** — Ex: "Conversão LP Boutique — Março"
   - **Objetivo** — Conversões / Tráfego / Leads / Reconhecimento / Engajamento
   - **Status** — Ativa / Pausada / Concluída / Rascunho
   - **Orçamento (R$)** — Valor total ou diário
   - **Gasto (R$)** — Quanto já foi gasto
   - **Impressões** — Total de impressões
   - **Cliques** — Total de cliques
   - **Conversões** — Total de conversões
   - **Receita Gerada (R$)** — Receita atribuída à campanha
3. Clique em **Salvar**

#### Filtros de Campanhas

```
Filtrar por Status:    Ativa | Pausada | Concluída | Rascunho
Filtrar por Objetivo:  Conversões | Tráfego | Leads | Reconhecimento | Engajamento
```

#### Gráficos de Ads (2 Gráficos)

**Gasto vs Conversões (Barra):**
- Compare investimento com resultados por campanha
- Use para: Identificar campanhas mais eficientes

**ROAS por Campanha (Barra Horizontal):**
- Retorno por real investido em cada campanha
- Use para: Decidir onde investir mais ou menos

#### Cálculos Automáticos

```
CTR (%)  = (Cliques / Impressões) × 100
CPC (R$) = Gasto / Cliques
CPM (R$) = (Gasto / Impressões) × 1000
ROAS (x) = Receita / Gasto
```

#### Dicas de Facebook Ads

- ✅ **Atualize dados semanalmente** — Mantenha métricas precisas
- ✅ **Compare ROAS entre campanhas** — Invista mais nas que dão melhor retorno
- ✅ **Monitore CTR** — CTR < 1% indica que o criativo precisa melhorar
- ✅ **Defina orçamento máximo** — Evite gastar mais que o planejado
- ✅ **Use na seção de Metas** — Crie metas de ROAS e conversões
- ❌ Não deixe campanhas "Ativa" sem monitorar por mais de 3 dias
- ❌ Não ignore CPC alto — otimize público-alvo e criativo

---

## 🎓 Boas Práticas & Workflow Recomendado

### Daily Ritual (10 minutos)

```
09:00 - Abra o Dashboard
  ├─ Verifique KPIs (MRR, Receita, Clientes)
  ├─ Revise Kanban → Mova tarefas completadas
  ├─ Adicione transações pendentes do dia anterior
  └─ Leia notas de Rodrigo

16:00 - Atualização Rápida
  ├─ Registre transações do dia
  └─ Atualize progresso de tarefas

20:00 - Retrospectiva Semanal (sexta-feira)
  ├─ Revise metas da semana
  ├─ Limpe Kanban (archive tarefas concluídas)
  └─ Discuta metas da próxima semana nas Notas
```

### Weekly Review (30 minutos, toda segunda)

```
1. Dashboard → Análise de KPIs
   - MRR cresceu? Por quê?
   - Despesas altas? Onde?
   - Clientes caíram? Investigar

2. Kanban → Planejamento semanal
   - Priorize tarefas urgentes
   - Equilibre workload (Lucas / Rodrigo)
   - Defina deadline para tarefas novas

3. Financeiro → Reconciliação
   - Revise transações (erros?)
   - Categorize tudo
   - Projetar próximo mês

4. Pipeline → Oportunidades
   - Algum client em PROPOSTA >14 dias? Seguir up
   - ALERTA? Agendar reunião
   - VAZIO? Puxar leads

5. Metas → Ajustes
   - Metas de março realistas?
   - Modificar se necessário
   - Comunicar novo target
```

### Monthly Ritual (1 hora, último dia do mês)

```
1. Financeiro → Fechamento
   - Todas transações registradas?
   - Recebimentos em dia?
   - Projeção próximo mês (burn rate)

2. Metas → Avaliação
   - Atingiu metas de março?
   - Por que não atingiu (se for o caso)?
   - Metas realistas para abril?

3. Pipeline → Health Check
   - Qual é a ocupação?
   - Clientes saudáveis?
   - Estratégia para próximo mês

4. Notas → Decisões
   - Alguma decisão estratégica anotada?
   - Implementar em abril?
   - Comunicar para o time (se houver)
```

---

## ❓ Perguntas Frequentes (FAQ)

### Geral

**P: Meus dados são salvos automaticamente?**
R: Sim! Todos os dados são salvos no **localStorage do seu navegador** automaticamente. Não precisa clicar em "Salvar".

**P: E se eu limpar o cache do navegador?**
R: Os dados serão perdidos. Por enquanto, não há backup — apenas localStorage. Futuro: integração com Supabase.

**P: Posso usar em múltiplos navegadores?**
R: Não, pois cada navegador tem seu próprio localStorage. Recomendamos designar **um navegador por pessoa** (Lucas usa Chrome, Rodrigo usa Firefox, por exemplo).

**P: Como fazer backup dos dados?**
R: Abra o DevTools (F12), vá para Application → Local Storage, copie os valores manualmente. (Futuro: exportação em CSV)

---

### Dashboard

**P: Por que meu MRR não bate com minha planilha?**
R: MRR soma apenas fees de clientes em estágio "ATIVO" no Pipeline. Verifique se todos clientes ativos estão marcados como ATIVO.

**P: Como editar um KPI?**
R: KPIs são calculados automaticamente a partir dos dados que você insere em Pipeline, Financeiro e Kanban. Para alterar, ajuste os dados de origem (ex: update cliente no Pipeline).

---

### Kanban

**P: Como deletar uma tarefa?**
R: Clique no ❌ no card. Será pedida confirmação antes de deletar.

**P: Como editar uma tarefa existente?**
R: Clique em qualquer lugar no card (exceto o ❌) para abrir o modal de edição.

**P: Posso ter mais de 4 colunas?**
R: Não, o design é fixo em 4 estágios (Backlog, Progresso, Revisão, Concluído). Se precisar de mais estágios, use labels/tags para subcategorizar.

---

### Financeiro

**P: Posso registrar transações futuras (agendadas)?**
R: Sim! Use o campo Data para registrar quando o dinheiro entrará/sairá. Apenas não coloque como "Recebido/Pago" até que efetivamente ocorra.

**P: Como reverter uma transação?**
R: Delete a transação original e crie uma nova com valores invertidos (se necessário gerar nota de crédito).

**P: Posso dividir uma transação grande em parcelas?**
R: Sim, registre uma por uma com datas diferentes (ex: Proposta de R$10k = 5 parcelas de R$2k em meses diferentes).

---

### Pipeline

**P: Posso ter mais de 5 clientes?**
R: O modelo é boutique com máximo 5 slots. Se quer expandir, essa é uma decisão estratégica. Por enquanto, a interface não suporta >5.

**P: Como sair um cliente?**
R: Mude para estágio "ALERTA" e faça anotação. Se quiser realmente deletar, há opção no card (confirmação pedida).

**P: Qual é a fee mínima/máxima?**
R: Não há limite. Recomendamos: mínimo R$1k/mês (viabilidade), máximo ilimitado.

---

### Metas

**P: Como editar o valor atual de uma meta?**
R: Clique no card da meta para editar. Campo "Valor Atual" é editável a qualquer momento.

**P: Posso ter metas recorrentes (toda semana)?**
R: Sim! Crie a mesma meta com nome ligeiramente diferente (ex: "Tarefas Semana 1", "Tarefas Semana 2").

**P: Pode haver metas negativas (reduzir custos)?**
R: Sim! Use em Despesas: "Reduzir gasto em Ads de R$10k para R$8k".

---

### Facebook Ads

**P: Como obtenho o Access Token?**
R: No Painel de Desenvolvedores do Facebook, crie um App, adicione o produto "Marketing API" e gere um token de acesso de curta ou longa duração.

**P: Posso usar sem a API?**
R: Sim! Você pode registrar todas as suas campanhas manualmente clicando em "+ Adicionar Campanha" e preenchendo os dados de gasto, cliques e conversões.

**P: O ROAS é calculado automaticamente?**
R: Sim, desde que você insira o "Gasto" e a "Receita Gerada" no cadastro da campanha.

---

### Notas

**P: Como apagar uma nota?**
R: Não há opção de delete visual. Se muito importante: selecione o texto, copie em algum lugar seguro, depois crie nota de "Nota deletada em [data] por [motivo]".

**P: As notas ficam privadas (só eu vejo)?**
R: Não, todas notas são vistas por quem tem acesso ao dashboard (Lucas + Rodrigo). Não coloque dados sensíveis aqui.

---

## 🚀 Dicas Avançadas

### Automação de Cálculos

```javascript
// Os seguintes cálculos são AUTOMÁTICOS:
- MRR = soma de fees de clientes em estágio ATIVO
- Ocupação % = clientes ativos / 5 × 100
- Margem = (lucro / receita) × 100
- Progresso de meta = valor atual / valor alvo × 100
```

**Você controla os inputs; o dashboard calcula os outputs.**

### Usando Filtros Eficientemente

**Kanban:**
```
Filtre por "Lucas" → Veja apenas tarefas dele
Filtre por "Urgente" → Identifique bloqueadores críticos
Filtre por "Rodrigo" + "Revisão" → Identifique gargalos
```

**Financeiro:**
```
Filtre por "Março" → Feche o mês
Filtre por "Saída" + "Ads" → Analise gasto em publicidade
Filtre por "Entrada" → Veja apenas receitas
```

### Padrão de Nomes para Rastreabilidade

**Transações:**
```
✅ BOM:   "Proposta aprovada TechCorp (fee inicial)"
✅ BOM:   "Pagamento AWS — servidores março"
❌ RUIM:  "Gasto" ou "Dinheiro"
```

**Tarefas:**
```
✅ BOM:   "Enviar proposta para TechCorp — deadline 31/03"
✅ BOM:   "[Urgente] Corrigir bug em dashboard"
❌ RUIM:  "Coisa" ou "Fazer depois"
```

**Clientes:**
```
✅ BOM:   "TechCorp — SaaS B2B, setor fintech"
✅ BOM:   "Startup XYZ — Series A"
❌ RUIM:  "Cliente 1" ou "Novo"
```

---

## 📞 Suporte & Feedback

**Encontrou um bug?**
- Nota no setor "Notas" descrevendo o problema
- Capturas de tela se possível

**Quer uma nova feature?**
- Discuta com Rodrigo
- Abra issue em GitHub (se projeto é público)

**Precisa de ajuda?**
- Este guia cobre 95% dos casos
- Se não encontrar aqui, pergunte a Rodrigo ou ao desenvolvedor

---

## 🎯 Próximas Melhorias (Roadmap)

```
Sprint 1 (Abril 2026):
  - [ ] Exportar dados em CSV
  - [ ] Backup automático em Supabase
  - [ ] Integração com Stripe (capturar fees automaticamente)

Sprint 2 (Maio 2026):
  - [ ] Gráficos customizáveis (user-specific)
  - [ ] Alertas por email (metas não atingidas, clientes em alerta)
  - [ ] Dark mode + Light mode toggle

Sprint 3 (Junho 2026):
  - [ ] Supabase migration (dados na nuvem)
  - [ ] Multi-device sync (Lucas em web, Rodrigo em mobile)
  - [ ] Relatórios automáticos (PDF mensal)
```

---

**Mantido por:** Squad Poseidon
**Última revisão:** 27 de Março de 2026
**Versão:** 2.1 (Sidebar + 7 Páginas + Facebook Ads Support)
