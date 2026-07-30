import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";

const authBaseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const databasePath =
  process.env.BETTER_AUTH_DATABASE_PATH ?? path.join(process.cwd(), ".data", "auth.sqlite");
const secret = process.env.BETTER_AUTH_SECRET;

if (!secret) {
  throw new Error(
    "BETTER_AUTH_SECRET is required. Copy .env.example to .env.local and generate a secret.",
  );
}

mkdirSync(path.dirname(databasePath), { recursive: true });

export const auth = betterAuth({
  appName: "Farm.js Better Auth Starter",
  baseURL: authBaseUrl,
  database: new Database(databasePath),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  secret,
  trustedOrigins: [new URL(authBaseUrl).origin],
});

const migrations = await getMigrations(auth.options);
await migrations.runMigrations();
