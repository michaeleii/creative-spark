import { z } from "zod";

export const processEnv = z
  .object({
    UNSPLASH_ACCESS_KEY: z.string(),
    REPLICATE_API_TOKEN: z.string(),
  })
  .parse(process.env);
