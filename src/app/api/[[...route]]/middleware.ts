import { createMiddleware } from "hono/factory";
import type { Env } from "./route";

export const verifyAuth = createMiddleware<Env>(async (c, next) => {
  const user = c.get("user");

  if (!user) return c.body(null, 401);
  await next();
});
