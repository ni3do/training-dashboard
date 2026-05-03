# CLAUDE.md

Guidance for Claude Code working in this repository. The README covers user-facing setup; this file captures the things that would surprise you when editing code.

## What this is

Self-hosted Next.js 14 (App Router) dashboard that pulls activities from Strava and recovery data from Whoop into a local SQLite database, then computes endurance training metrics (CTL/ATL/TSB/TSS) and renders them with Recharts.

## Repo layout (important)

- The git repo root is **`Training Plan/training-dashboard/`** — *not* the outer `trainings-plan/` directory. Run `git`, `npm`, and `docker` commands from there.
- Source DB lives **outside** the repo at `../data/activities.db` (sibling of `training-dashboard/`). It is intentionally not committed and persists across sessions.

```
trainings-plan/
└── Training Plan/
    ├── data/
    │   └── activities.db        # SQLite DB (gitignored, persists across sessions)
    └── training-dashboard/      # ← git repo root, run commands here
        ├── app/                 # Next.js App Router (pages + API routes)
        ├── scripts/             # tsx-run sync + DB scripts
        ├── instrumentation.ts   # auto-inits DB on server start
        └── training-plan.json   # seed data for `npm run sync:local`
```

## Common commands

Run from `Training Plan/training-dashboard/`:

```bash
npm run dev               # Next dev server on :3000
npm run build && npm start
npm run type-check        # tsc --noEmit (use this; there is no test suite)
npm run lint

npm run db:init           # Idempotent — safe to re-run
npm run sync:strava       # OAuth refresh + fetch activities
npm run sync:whoop        # OAuth refresh + fetch recovery
npm run sync:all          # Both
npm run sync:local        # Import training-plan.json into training_plan table
npm run setup:strava      # Interactive OAuth setup helper
npm run cron              # Long-running cron scheduler (CRON_SCHEDULE env var)
```

There is no test suite. **Type-check is the only automated correctness gate** — always run `npm run type-check` after non-trivial changes.

## Key architectural facts

### DB initialization is automatic
`instrumentation.ts` calls `initDatabase()` from `scripts/init-db.ts` on every Next.js server start (Node runtime only). You generally don't need to run `npm run db:init` manually — booting the dev server is enough. The init script is idempotent (`CREATE TABLE IF NOT EXISTS`).

### Schema migrations: ALTER inside try/catch
`scripts/init-db.ts` uses a try/catch around `ALTER TABLE … ADD COLUMN` to support older DBs (see the `raw_json` column). When adding a new column to an existing table, follow the same pattern — don't assume a fresh schema.

### Path alias
`tsconfig.json` maps `@/*` to the project root. API routes import DB helpers via `@/scripts/db` — keep that pattern when adding new routes rather than relative `../../../scripts/db`.

### DB connection is process-singleton
`scripts/db.ts` caches one `better-sqlite3` connection per process via a module-scoped variable. `getDatabase()` is the only entry point; don't construct `new Database(...)` elsewhere.

### Upserts everywhere
All writes (`upsertActivity`, `upsertWhoopRecovery`, `upsertTrainingPlan`, `saveOAuthToken`) use `INSERT … ON CONFLICT DO UPDATE`. Add new write paths the same way — never assume a row doesn't already exist (Strava and Whoop syncs are re-run regularly).

### API routes must opt out of static rendering
DB-backed routes set `export const dynamic = "force-dynamic"` (see `app/api/metrics/route.ts`). Without this, Next.js will try to evaluate the route at build time, hit the DB, and fail. Add it to every new DB-touching route.

### OAuth tokens live in the DB
Refresh tokens are stored in the `oauth_tokens` table via `saveOAuthToken` / `getOAuthToken`. Env-var refresh tokens (`STRAVA_REFRESH_TOKEN`, `WHOOP_REFRESH_TOKEN`) are seeds for first-run; the DB copy is the source of truth after that.

## Environment

`.env` (loaded by Next + tsx scripts via `dotenv`) — see `.env.example`. The defaults:

```
DATABASE_PATH=../data/activities.db   # Local: outside repo. Docker: /app/data/activities.db
CRON_SCHEDULE=0 5 * * *
```

Note the README sometimes references `training.db` — the actual filename is `activities.db`. Trust `.env.example` and the file on disk.

## UI conventions

- Tailwind utility-first; reusable component classes (`.card`, `.btn-primary`, `.btn-secondary`, `.badge-*`, `.metric-box`) are defined in `app/globals.css`. Use those before adding ad-hoc utility soup.
- Dark mode via `next-themes`; default theme is dark. Charts (Recharts) need explicit color props for dark/light parity.
- Loading states use `app/components/loading-skeleton.tsx` rather than spinners.

## Metrics math (don't break this)

`app/api/metrics/route.ts` is the canonical implementation:
- **TSS** = `(duration_minutes * (suffer_score / 100)) / 0.75`. Activities without `suffer_score` or `duration_seconds` contribute 0 — don't add fallbacks that fabricate intensity.
- **CTL** = exponential moving average with 42-day decay; baseline initialized at 50 to avoid a cold-start zero.
- **ATL** = 7-day rolling sum scaled by `7 / atlDecay`.
- **TSB** = CTL − ATL.

Changing any of these affects historical chart continuity — if you must, do it deliberately and update the README's "Training Metrics Explained" section.

## Docker

Multi-stage Dockerfile (Node 18 Alpine). `docker-compose.yml` mounts a named volume at `/app/data`, so `DATABASE_PATH` is overridden to `/app/data/activities.db` inside the container. The cron scheduler does **not** run inside the web container by default — `npm run cron` is a separate process.

## Historical scaffolding files

`IMPLEMENTATION_COMPLETE.md`, `START_HERE.md`, `VERIFICATION.md`, `QUICKSTART.md`, `PROJECT_STRUCTURE.md`, `FILE_INVENTORY.txt` are one-time setup notes from initial scaffolding. They are not living docs — don't extend them. Update `README.md` (or this file) instead.

## Static training plan pages

The training plan lives as static HTML in `public/plan/`, served at `/plan/`. It is **not** part of the Next.js App Router — just plain HTML + CSS + JS.

```
public/plan/
├── index.html             # Overview + phase summaries + links to subpages
├── weekly-structure.html   # Day-by-day schedule across phases
├── mileage.html            # 14-week mileage table + progression rules
├── running.html            # Pace zones, workout types, 14-week workout schedule
├── gym.html                # Upper, lower, full body workout tables
├── hill-work.html          # Amsterdam-specific vert strategy
├── nutrition.html          # Race fueling notes (TBD)
├── styles.css              # Shared CSS (dark/light via prefers-color-scheme)
└── theme.js                # Shared theme toggle (localStorage-persisted)
```

Navigation uses a `<nav>` bar with `class="active"` on the current page. When adding a new page, add it to the nav in **every** existing page and update the page grid on `index.html`.

## Commit style

Conventional Commits: `type(scope): summary`. Common scopes: `api`, `scripts`, `ui`, `db`, `docker`, `deps`.
