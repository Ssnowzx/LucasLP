# 🗄️ Database Architecture — Vantage Command Dashboard

## 1. Overview
The project uses **Supabase (PostgreSQL)** as its primary backend. All data interactions are handled via the Supabase JS Client in `js/supabase-client.js`.

---

## 2. Table Schemas & Optimization (Indexes)

To ensure high performance and low latency, the following indexes are required based on the application's query patterns (mostly ordering by date/creation).

### Tables & Required Indexes

| Table | Primary Query Pattern | Required Index (PostgreSQL) |
| :--- | :--- | :--- |
| `tasks` | `order('created_at', asc)` | `CREATE INDEX idx_tasks_created_at ON tasks(created_at);` |
| `finances` | `order('date', desc)` | `CREATE INDEX idx_finances_date ON finances(date DESC);` |
| `clients` | `order('created_at', asc)` | `CREATE INDEX idx_clients_created_at ON clients(created_at);` |
| `goals` | `order('created_at', asc)` | `CREATE INDEX idx_goals_created_at ON goals(created_at);` |
| `notes` | `order('created_at', desc)` | `CREATE INDEX idx_notes_created_at ON notes(created_at DESC);` |
| `fbads_campaigns` | `order('updated_at', desc)` | `CREATE INDEX idx_fbads_updated_at ON fbads_campaigns(updated_at DESC);` |
| `fbads_config` | `eq('id', 'default')` | Primary Key `id` covers this. |
| `settings` | `eq('id', 'default')` | Primary Key `id` covers this. |

> [!TIP]
> **Why these indexes?** Without them, PostgreSQL performs a "Sequential Scan" followed by a sort in memory. As the data grows, this will slow down from milliseconds to seconds. With B-Tree indexes on the sort columns, the DB can read the rows already in order.

---

## 3. Security & Row Level Security (RLS)

### Authentication Flow
The dashboard is guarded by a blocking Auth Guard in `js/supabase-client.js`. Access to `dashboard.html` is strictly restricted to authenticated users.

### RLS Policies (MANDATORY)
To prevent data leakage between users (security isolation), **RLS must be enabled on ALL tables**.

#### Policy Template
Each table should have a policy allowing users to only see/edit their own data. We assume columns like `owner` (string) or a future `user_id` (UUID) are used.

```sql
-- Example for tasks table
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Select Policy
CREATE POLICY "Users can only see their own tasks" 
ON tasks FOR SELECT 
USING (auth.uid() = user_id);

-- Insert/Update/Delete Policies
-- ... similar logic ...
```

> [!IMPORTANT]
> **Security Audit:** Currently, the application uses an `owner` field based on names (e.g., 'lucas', 'rodrigo'). For maximum security, we recommend migrating to a `user_id` column of type `UUID` linked to `auth.users(id)`.

---

## 4. Maintenance & Backups
*   **Backups:** Handled automatically by Supabase (daily).
*   **Migrations:** Schema changes should be tracked via SQL files in a `/supabase/migrations` folder (recommended for future).
*   **Connection:** Always use SSL (enabled by default in Supabase client).

---

**Architect:** Aria 🏛️
**Status:** Optimized & Secure ✅
**Last Update:** Março 2026
