import { processEnv } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/**",
  verbose: true,
  strict: true,
  out: "./drizzle",
  dbCredentials: {
    url: processEnv.DRIZZLE_DATABASE_URL,
  },
});
