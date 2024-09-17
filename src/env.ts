import { z } from "zod";

export const env = z.object({
  UNSPLASH_ACCESS_KEY: z.string(),
  REPLICATE_API_TOKEN: z.string(),
  DRIZZLE_DATABASE_URL: z.string(),
});

export const processEnv = env.parse(process.env);
