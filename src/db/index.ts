import { drizzle } from "drizzle-orm/d1";

export const getDb = (d1: D1Database) => drizzle(d1);
