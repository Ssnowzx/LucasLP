# Lucas Veloso - Gestao Estrategica de Marketplaces

Landing page + Dashboard de gestao para operacao boutique de marketplaces.

## Estrutura

```
index.html              Landing page (LP) publica
dashboard.html          Dashboard interno (Vantage Command)
login.html              Autenticacao Supabase
css/
  styles.css            Estilos da LP
  dashboard.css         Estilos do Dashboard
js/
  supabase-client.js    Conexao Supabase + Auth Guard
  main.js               Interacoes da LP (scroll, FAQ, modal, ROI)
  dashboard.js          Engine do Dashboard (Kanban, financas, leads, pipeline)
  seed-leads-sjb.js     Importador de leads via arquivo HTML (Google Sheets)
supabase/
  config.toml           Configuracao local do Supabase
  migrations/           Schema SQL e policies RLS
```

## Setup

### Pre-requisitos

- Node.js 18+
- Supabase CLI (`npm install -g supabase`)

### Instalacao

1. Clone o repositorio
2. Instale dependencias: `npm install`
3. Aplique migrations: `supabase db push`
4. Inicie o dev server: `npm run dev`

### Variaveis de Ambiente

As credenciais do Supabase estao configuradas diretamente em `js/supabase-client.js`.

| Variavel | Descricao |
|----------|-----------|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave anonima (publica) do Supabase |

## Tecnologias

- **Frontend:** HTML, CSS, JavaScript vanilla
- **Backend/DB:** Supabase (PostgreSQL + Auth + RLS)
- **Build:** Vite
- **Charts:** Chart.js (dashboard)

## Paginas do Dashboard

| Pagina | Descricao |
|--------|-----------|
| Dashboard | Visao geral: KPIs, funil de leads, acoes pendentes |
| Kanban | Board de tarefas em colunas (Backlog, Em Progresso, Revisao, Concluido) |
| Financeiro | Receitas e despesas com graficos mensais |
| Pipeline | Slots boutique: acompanhe clientes no funil de vendas |
| Metas | Metas SMART com barras de progresso |
| Notas | Anotacoes rapidas |
| Facebook Ads | Monitoramento de campanhas Meta |
| Leads | Gestao de leads prospectados e capturados pela LP |

## Sistema de Alertas

O dashboard possui um sistema de alertas integrado para que Lucas e Rodrigo nunca percam eventos criticos:

- **Sininho no header:** badge vermelho com contador de alertas nao lidos; animacao ao ter pendencias
- **Painel lateral de notificacoes:** abre ao clicar no sininho; abas "Todos" e "Nao lidos"; navegacao direta para a pagina do alerta ao clicar
- **Badges no sidebar:** Kanban e Leads exibem contadores de itens que precisam de atencao
- **Toasts:** popups temporarios (6s) no canto inferior direito para alertas urgentes novos

### Alertas gerados automaticamente

| Tipo | Condicao | Prioridade |
|------|----------|-----------|
| Tarefa Atrasada | Tarefa com deadline no passado e nao concluida | Urgente |
| Vence Hoje | Tarefa com deadline hoje e nao concluida | Aviso |
| Leads Aguardando | Leads com status novo/pendente sem contato | Aviso |
| Meta Atrasada | Meta com deadline no passado e nao concluida | Urgente |
| Meta Se Aproximando | Meta vence em <= 7 dias e nao concluida | Urgente/Aviso |
| Saldo Negativo | Despesas > Receitas no mes atual | Urgente |
| Pipeline Parado | Cliente sem avancar de stage ha +14 dias | Info |

O estado de leitura dos alertas e salvo em `localStorage` por usuario/navegador.

## Importacao de Leads

O dashboard suporta importacao de leads a partir de planilhas Google Sheets exportadas como HTML:

1. No Google Sheets, va em **Arquivo > Fazer download > Pagina da Web (.html)**
2. No dashboard, acesse a aba **Leads**
3. Clique em **Importar** e selecione o arquivo `.html`
4. O sistema parseia automaticamente as colunas: Empresa, Segmento, Porte, Telefone, Classificacao, Qualificacao e Estrategia

### Formato esperado da planilha

| Coluna | Descricao |
|--------|-----------|
| Empresa | Nome da empresa (obrigatorio) |
| Segmento | Ramo de atuacao |
| Porte | Tamanho da empresa (Pequeno, Medio, Grande) |
| Telefone / WhatsApp | Contato direto |
| Classificacao | QUENTE, MORNO ou FRIO |
| Por que e Lead Qualificado | Justificativa de qualificacao |
| Estrategia de Abordagem | Como abordar o lead |

## Seguranca

- Row Level Security (RLS) habilitado em todas as tabelas
- Tabelas do dashboard: SELECT/UPDATE/DELETE somente autenticado
- Tabela leads: INSERT publico (formulario da LP) + autenticado (importacao no dashboard)
- Auth guard redireciona usuarios nao autenticados para login

## Migrations

| Arquivo | Descricao |
|---------|-----------|
| `20260329185732` | Tabelas principais do dashboard |
| `20260329234931` | Tabela leads |
| `20260330000000` | Indices, constraints e seguranca |
| `20260330010000` | Sistema de status dos leads |
| `20260330020000` | Pipeline completo de leads (7 status) |
| `20260412000000` | RLS INSERT para usuarios autenticados |
| `20260412010000` | Remove unique constraint do email em leads |
| `20260412020000` | Remove unique constraint do whatsapp em leads |
| `20260412030000` | Limpeza de duplicados, email/whatsapp opcionais |
