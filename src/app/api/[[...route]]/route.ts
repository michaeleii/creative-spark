import { Hono } from "hono";
import { handle } from "hono/vercel";

import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./projects";
import { auth, type AuthType } from "@/lib/auth";

export const runtime = "nodejs";

export type Env = { Variables: AuthType };

const app = new Hono<Env>()
  .use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  })
  .basePath("/api")
  .route("/images", images)
  .route("/ai", ai)
  .route("/users", users)
  .route("/projects", projects);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
