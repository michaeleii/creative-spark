import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  UNSPLASH_ACCESS_KEY: z.string(),
  UNSPLASH_SECRET_KEY: z.string(),
  UPLOADTHING_TOKEN: z.string(),
  REPLICATE_API_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
