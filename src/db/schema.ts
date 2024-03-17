import {
  doublePrecision,
  pgTableCreator,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `hono_${name}`);

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  description: text("description"),
  price: doublePrecision("price"),
});
