import { db } from "@/db";
import {
  projects,
  projectsInsertSchema,
  projectsUpdateSchema,
} from "@/db/schema/projects";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/templates",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const { page, limit } = c.req.valid("query");
      const result = await db
        .select()
        .from(projects)
        .where(eq(projects.isTemplate, true))
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.isPro), desc(projects.updatedAt));
      if (!result) {
        return c.json({ error: "No Templates" }, 404);
      }
      return c.json(result, 200);
    }
  )
  .delete(
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
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.user.id)))
        .returning({ id: projects.id })
        .then((res) => res.at(0));

      if (!result) {
        return c.json({ error: "Not Found" }, 404);
      }

      return c.json(result);
    }
  )
  .post(
    "/:id/duplicate",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      if (!auth.user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const project = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, auth.user.id)))
        .then((res) => res.at(0));

      if (!project) {
        return c.json({ error: "Not found" }, 404);
      }

      const duplicatedProject = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          data: project.data,
          width: project.width,
          height: project.height,
          userId: auth.user.id,
          createdAt: new Date(),
        })
        .returning()
        .then((res) => res.at(0));

      if (!duplicatedProject) {
        return c.json({ error: "Something went wrong" }, 400);
      }

      return c.json(duplicatedProject);
    }
  )
  .get(
    "/",
    verifyAuth(),
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const auth = c.get("authUser");
      const { page, limit } = c.req.valid("query");

      if (!auth.user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.userId, auth.user.id), eq(projects.isTemplate, false))
        )
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(desc(projects.updatedAt));

      return c.json({
        result,
        nextPage: result.length === limit ? page + 1 : null,
      });
    }
  )
  .patch(
    "/:id",
    verifyAuth(),
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", projectsUpdateSchema),
    async (c) => {
      const auth = c.get("authUser");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!auth.user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.userId, auth.user.id)))
        .returning()
        .then((res) => res.at(0));

      if (!result) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      return c.json(result);
    }
  )
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
        .where(and(eq(projects.id, id), eq(projects.userId, auth.user.id)))
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
          isPro: false,
          isTemplate: false,
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
