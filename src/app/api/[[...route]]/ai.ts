import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { verifyAuth } from "@hono/auth-js";
import { z } from "zod";

import { replicate } from "@/lib/replicate";

const IMAGE_GENERATION_MODEL = "black-forest-labs/flux-schnell";
const REMOVE_BG_MODEL =
  "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";

const app = new Hono()
  .post(
    "/remove-bg",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        image: z.string(),
      })
    ),
    async (c) => {
      const { image } = c.req.valid("json");
      const output: unknown = await replicate.run(REMOVE_BG_MODEL, {
        input: { image },
      });
      const res = output as string;
      return c.json({ image: res });
    }
  )
  .post(
    "/generate",
    verifyAuth(),
    zValidator(
      "json",
      z.object({
        prompt: z.string().min(1),
      })
    ),
    async (c) => {
      const { prompt } = c.req.valid("json");
      const output: unknown = await replicate.run(IMAGE_GENERATION_MODEL, {
        input: { prompt },
      });
      const res = output as string[];
      return c.json({ image: res[0] });
    }
  );

export default app;
