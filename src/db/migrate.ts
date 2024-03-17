import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from ".";
import { config } from "dotenv";

config({
  path: ".dev.vars",
});

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "drizzle",
    });
    console.log(process.env.DATABASE_URL);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
