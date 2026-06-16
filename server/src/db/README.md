# Database Management Guide

## 📋 Overview

This directory contains database seeding and management utilities for the practice-web-project server.

> **Working directory:** Commands below assume you are inside the `server/` directory.
> From the repo root, prefix with `pnpm --filter server <command>` (e.g. `pnpm --filter server db:init`).
> The project enforces `pnpm` only — `npm`/`yarn` will be rejected by the `preinstall` hook.

---

## 🛠️ Available Commands

### Migration Commands

#### `pnpm migration:generate`

**Purpose:** Automatically generates a new migration file based on entity changes.

**When to use:**

- After modifying entity files (adding/removing columns, changing types)
- TypeORM compares entities with current database schema and creates migration

**Usage:**

```bash
pnpm migration:generate -- src/migrations/DescriptiveMigrationName
```

**Example:**

```bash
pnpm migration:generate -- src/migrations/AddPhoneToProfile
```

---

#### `pnpm migration:run`

**Purpose:** Executes all pending migrations.

**When to use:**

- Apply schema changes to database
- After pulling new code with migrations
- During deployment to production

**Usage:**

```bash
pnpm migration:run
```

**Note:** Only runs migrations that haven't been executed yet (tracks in `migrations` table)

---

#### `pnpm migration:revert`

**Purpose:** Reverts the most recently executed migration.

**When to use:**

- Undo the last migration (useful during development)
- Fix migration errors

**Usage:**

```bash
pnpm migration:revert
```

**Note:** Can be run multiple times to revert multiple migrations sequentially

---

### Database Commands

#### `pnpm seed`

**Purpose:** Populates database with sample/initial data.

**When to use:**

- After fresh database creation
- Reset data to known state for development/testing

**Usage:**

```bash
pnpm seed
```

**What it does:**

1. Seeds users (with hashed passwords)
2. Seeds profiles (linked to users)
3. Seeds addresses (linked to profiles)

**Location:** `src/db/seed.ts` + `src/db/seeds/` directory

---

#### `pnpm db:init`

**Purpose:** Complete database initialization (build + migrate + seed).

**When to use:**

- First-time setup
- After dropping database

**Usage:**

```bash
pnpm db:init
```

**What it does:**

1. `pnpm build` - Compiles TypeScript
2. `pnpm migration:run` - Runs all migrations
3. `pnpm seed` - Seeds initial data

---

#### `pnpm db:drop`

**Purpose:** Drops entire database schema (⚠️ DESTRUCTIVE).

**When to use:**

- Complete database reset during development
- **NEVER in production!**

**Usage:**

```bash
pnpm db:drop
```

**Warning:** Deletes ALL tables and data. Cannot be undone.

---

#### `pnpm db:manage`

**Purpose:** Interactive database management menu.

**When to use:**

- Guided database operations
- Prefer UI over remembering commands

**Usage:**

```bash
pnpm db:manage
```

**Options:**

1. **Create/Recreate Database** - Drops + Init (fresh start)
2. **Update Schema Only** - Runs migrations without dropping data

---

## 🔄 Common Workflows

### First Time Setup

```bash
# 1. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 2. Initialize database
pnpm db:init
```

### After Modifying Entities

```bash
# 1. Generate migration from entity changes
pnpm migration:generate -- src/migrations/YourMigrationName

# 2. Apply the migration
pnpm migration:run
```

### Reset Database (Development)

```bash
# Option 1: Using interactive menu
pnpm db:manage
# Choose option 1

# Option 2: Manual commands
pnpm db:drop
pnpm db:init
```

### Update Schema (Keep Data)

```bash
# Pull new migrations from git
git pull

# Run new migrations
pnpm migration:run
```

---

## 📁 File Structure

```
src/db/
├── README.md           # This file
├── manage-db.js        # Interactive CLI tool
├── seed.ts            # Main seeding orchestrator
└── seeds/             # Individual seeder classes
    ├── seeder.module.ts
    ├── user.seeder.ts
    ├── profile.seeder.ts
    └── address.seeder.ts
```

---

## 🎯 Quick Reference Table

| Command              | Destructive?      | Use Case                             |
| -------------------- | ----------------- | ------------------------------------ |
| `migration:generate` | ❌ No             | Create migration from entity changes |
| `migration:run`      | ⚠️ Schema only    | Apply pending migrations             |
| `migration:revert`   | ⚠️ Last migration | Undo last migration                  |
| `seed`               | ⚠️ Adds data      | Populate with sample data            |
| `db:init`            | ❌ No             | Full setup (build + migrate + seed)  |
| `db:drop`            | ✅ YES            | **Delete everything**                |
| `db:manage`          | Depends           | Interactive guided operations        |

---

## ⚠️ Important Notes

1. **Synchronize is OFF**: We use migrations for schema changes (safer for production)
2. **Naming Strategy**: Uses `SnakeNamingStrategy` (camelCase → snake_case in DB)
3. **Seeding Order**: Users → Profiles → Addresses (respects foreign keys)
4. **Environment**: Commands use `.env` file for database connection

---

## 🔐 Environment Variables Required

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=practice_web_db
```

---

## 🆘 Troubleshooting

### "Migration already exists"

```bash
# Check migrations table
# Manually delete from migrations table or revert
pnpm migration:revert
```

### "Cannot find module"

```bash
# Rebuild TypeScript
pnpm build
```

### "Database does not exist"

```bash
# Create database manually in PostgreSQL first
createdb practice_web_db

# Or use PostgreSQL client
CREATE DATABASE practice_web_db;
```

### Seeding fails with duplicate key

```bash
# Drop and recreate
pnpm db:drop
pnpm db:init
```

---

**Last Updated:** November 23, 2025  
**Maintained by:** Development Team
