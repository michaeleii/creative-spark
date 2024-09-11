import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { replicate } from "@/lib/replicate";

const IMAGE_GENERATION_MODEL = "black-forest-labs/flux-schnell";

const app = new Hono().post(
  "/generate",
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
