import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { product } from "./db/schema";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { bearerAuth } from "hono/bearer-auth";

export type Env = {
  DATABASE_URL: string;
  token: string;
};

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.get("/env", async (c, next) => {
  // const token = c.env.token;
  const ip = c.req.raw.headers.get("CF-Connecting-IP");
  return c.json({ ip });
});

app.get("/product", async (c, next) => {
  const auth = bearerAuth({ token: c.env.token });
  await auth(c, next);

  const client = new Client({ connectionString: c.env.DATABASE_URL });
  const db = drizzle(client);
  await client.connect();
  const res = await db.select().from(product);

  c.executionCtx.waitUntil(client.end());
  return c.json(res);
});

showRoutes(app);
export default app;
