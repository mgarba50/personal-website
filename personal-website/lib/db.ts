export const databaseConfig = {
  provider: "supabase-postgres",
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export function assertDatabaseEnv() {
  const missing = ["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter((key) => !process.env[key]);
  return {
    ok: missing.length === 0,
    missing,
  };
}
