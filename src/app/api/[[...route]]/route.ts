import { Hono, type Context } from "hono";
import { handle } from "hono/vercel";

import { initAuthConfig, type AuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config";

import images from "./images";
import ai from "./ai";
import users from "./users";
import projects from "./projects";

export const runtime = "nodejs";

type Bindings = {
  AUTH_SECRET: string;
};

function getAuthConfig(c: Context<{ Bindings: Bindings }>): AuthConfig {
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig,
  };
}

const app = new Hono<{ Bindings: Bindings }>()
  .use("*", initAuthConfig(getAuthConfig))
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
