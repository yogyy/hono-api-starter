import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { getDb } from "../db";
// import { env } from "cloudflare:workers"; // use this for generate better-auth schema
import { account, session, verification, user } from "../db/schema";
import { betterAuthOptions } from "./options";

export const auth = (env: Cloudflare.Env) => {
  return betterAuth({
    ...betterAuthOptions,
    database: drizzleAdapter(getDb(env.DB), {
      provider: "sqlite",
      schema: {
        account,
        session,
        verification,
        user,
      },
    }),
  });
};
