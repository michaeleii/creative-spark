import { z } from "zod";

export const processEnv = z
  .object({
    UNSPLASH_ACCESS_KEY: z.string(),
  })
  .parse(process.env);
