import { Hono } from "hono";
import { showRoutes } from "hono/dev";
import { product } from "./db/schema";
import { Client, Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { auth } from "./lib/auth";
import { Env } from "./types";

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.get("/product", auth, async (c) => {
  const client = new Client({ connectionString: c.env.DATABASE_URL });
  const db = drizzle(client);
  await client.connect();
  const res = await db.select().from(product);

  c.executionCtx.waitUntil(client.end());
  return c.json(res);
});

app.get("/product-with-pool", auth, async (c) => {
  const pool = new Pool({ connectionString: c.env.DATABASE_URL });
  const client = await pool.connect();
  const db = drizzle(client);

  try {
    const res = await db.select().from(product);

    return c.json({ data: res, connection: pool.totalCount });
  } catch (error) {
    throw error;
  } finally {
    client.release();

    c.executionCtx.waitUntil(pool.end()); // or remove this
  }
});
showRoutes(app);
export default app;
