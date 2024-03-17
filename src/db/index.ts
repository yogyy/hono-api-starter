import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

config({
  path: ".dev.vars",
});

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const db = drizzle(pool);

export { db, pool, schema };
