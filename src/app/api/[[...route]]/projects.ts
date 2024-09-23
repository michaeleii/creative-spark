import { db } from "@/db";
import { projects, projectsInsertSchema } from "@/db/schema/projects";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const app = new Hono().post(
  "/",
  verifyAuth(),
  zValidator(
    "json",
    projectsInsertSchema.pick({
      name: true,
      data: true,
      width: true,
      height: true,
    })
  ),
  async (c) => {
    const auth = c.get("authUser");
    const { data, height, width, name } = c.req.valid("json");
    if (!auth.user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const result = await db
      .insert(projects)
      .values({
        name,
        data,
        width,
        height,
        userId: auth.user.id,
      })
      .returning()
      .then((res) => res.at(0));

    if (!result) {
      return c.json({ error: "Something went wrong" }, 400);
    }
    return c.json(result);
  }
);

export default app;
