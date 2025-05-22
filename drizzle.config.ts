import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  verbose: true,
  strict: true,
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
