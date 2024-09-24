import { db } from "@/db";
import { users } from "@/db/schema/auth";
import { projects, projectsInsertSchema } from "@/db/schema/projects";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const result = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(users.id, auth.user.id)))
        .then((res) => res.at(0));

      if (!result) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(result);
    }
  )
  .post(
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
