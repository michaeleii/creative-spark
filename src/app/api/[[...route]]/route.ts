import { Hono } from "hono";
import { handle } from "hono/vercel";

import usersApp from "./users";

export const runtime = "nodejs";

const app = new Hono().basePath("/api").route("/users", usersApp);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;
