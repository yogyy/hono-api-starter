CREATE TABLE IF NOT EXISTS "hono_product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"price" double precision
);
