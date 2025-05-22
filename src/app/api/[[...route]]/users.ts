import { verifyAuth } from "./middleware";
import { Hono } from "hono";

const app = new Hono().get("/profile", verifyAuth, (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  return c.json({
    user,
  });
});

export default app;
