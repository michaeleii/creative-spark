import { processEnv } from "@/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(processEnv.DRIZZLE_DATABASE_URL);
export const db = drizzle(sql);
