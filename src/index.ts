import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { sessionMiddleware } from "./session-middleware";
import { auth } from "./lib/auth";

const app = new Hono<{ Bindings: Cloudflare.Env }>().basePath("/api");
app.on(["POST", "GET"], "/auth/*", (c) => auth(c.env).handler(c.req.raw));

app.get("/", sessionMiddleware, (c) => {
  const data = c.get("session");
  console.log(data);
  return c.text("Hello Hono!");
});

app.get("/get-acc", async (c) => {
  const data = await auth(c.env).api.signUpEmail({
    body: {
      email: "user@example.com",
      password: "securepassword",
      name: "test user",
    },
  });

  return c.json(data);
});

app.get("/hello", sessionMiddleware, (c) => {
  const session = c.get("session");
  if (!session) {
    // throw new HTTPException(401);
    return c.json({ error: "Unauthorized" }, { status: 401 });
  }
  return c.json({ message: `Hello, ${session.user.name}.` });
});

showRoutes(app);
export default app;
