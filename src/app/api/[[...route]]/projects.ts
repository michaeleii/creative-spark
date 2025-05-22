import { db } from "@/db";
import {
  projects,
  projectsInsertSchema,
  projectsUpdateSchema,
} from "@/db/schema";
import { verifyAuth } from "./middleware";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get(
    "/templates",
    verifyAuth,
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
    verifyAuth,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
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
    verifyAuth,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }
      const project = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
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
          userId: user.id,
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
    verifyAuth,
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const { page, limit } = c.req.valid("query");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .select()
        .from(projects)
        .where(
          and(eq(projects.userId, user.id), eq(projects.isTemplate, false))
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
    verifyAuth,
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", projectsUpdateSchema as any),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .update(projects)
        .set({ ...values, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
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
    verifyAuth,
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const result = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
        .then((res) => res.at(0));

      if (!result) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(result);
    }
  )
  .post(
    "/",
    verifyAuth,
    zValidator(
      "json",
      projectsInsertSchema.pick({
        name: true,
        data: true,
        width: true,
        height: true,
      }) as any
    ),
    async (c) => {
      const user = c.get("user");
      const { data, height, width, name } = c.req.valid("json");

      if (!user) {
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
          userId: user.id,
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
