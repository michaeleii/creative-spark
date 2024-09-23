import { processEnv } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as usersSchema from "@/db/schema/auth";
import * as projectsSchema from "@/db/schema/projects";

const sql = neon(processEnv.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql, {
  schema: { ...usersSchema, ...projectsSchema },
});
