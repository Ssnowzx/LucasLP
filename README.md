# Lucas Veloso - Gestao Estrategica de Marketplaces

Landing page + Dashboard de gestao para operacao boutique de marketplaces.

## Estrutura

```
index.html        Landing page (LP) publica
dashboard.html    Dashboard interno (Vantage Command)
login.html        Autenticacao Supabase
css/
  styles.css      Estilos da LP
  dashboard.css   Estilos do Dashboard
js/
  supabase-client.js   Conexao Supabase + Auth Guard
  main.js              Interacoes da LP (scroll, FAQ, modal, ROI)
  dashboard.js         Engine do Dashboard (Kanban, financas, leads)
supabase/
  config.toml          Configuracao local do Supabase
  migrations/          Schema SQL e policies
```

## Setup

### Pre-requisitos

- Node.js 18+
- Supabase CLI (`npm install -g supabase`)

### Instalacao

1. Clone o repositorio
2. Copie `.env.example` para `.env` e preencha:
   ```
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-anon-key
   ```
3. Instale dependencias: `npm install`
4. Inicie o Supabase local: `supabase start`
5. Aplique migrations: `supabase db push`
6. Inicie o dev server: `npm run dev`

### Variaveis de Ambiente

| Variavel | Descricao |
|----------|-----------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_ANON_KEY` | Chave anonima (publica) do Supabase |

## Tecnologias

- **Frontend:** HTML, CSS, JavaScript vanilla
- **Backend/DB:** Supabase (PostgreSQL + Auth + RLS)
- **Build:** Vite
- **Charts:** Chart.js (dashboard)

## Seguranca

- Row Level Security (RLS) habilitado em todas as tabelas
- Tabelas do dashboard: acesso somente autenticado
- Tabela leads: INSERT publico, SELECT autenticado
- Auth guard redireciona usuarios nao autenticados para login
