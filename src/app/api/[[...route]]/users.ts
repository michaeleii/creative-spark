import { verifyAuth } from "@hono/auth-js";
import { Hono } from "hono";

const app = new Hono().get("/profile", verifyAuth(), (c) => {
  const auth = c.get("authUser");

  if (!auth.session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({
    user: auth.session.user,
  });
});

export default app;
