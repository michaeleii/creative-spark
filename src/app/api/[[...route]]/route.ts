import { Hono } from "hono";
import { handle } from "hono/vercel";

import imagesApp from "./images";
import aiApp from "./ai";

export const runtime = "nodejs";

const app = new Hono()
  .basePath("/api")
  .route("/images", imagesApp)
  .route("/ai", aiApp);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof app;
