/**
 * Next.js instrumentation hook — runs once on server startup (Node.js runtime only).
 * Ensures the SQLite database and all tables exist before any API route is served.
 * https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initDatabase } = await import("./scripts/init-db");
    await initDatabase();
  }
}
