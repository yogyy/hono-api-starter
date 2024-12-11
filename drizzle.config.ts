import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: ".dev.vars" });

export default {
  schema: "./src/db/schema.ts",
  dbCredentials: { connectionString: process.env.DATABASE_URL! },
  out: "./drizzle",
  driver: "pg",
} satisfies Config;
