import { bearerAuth } from "hono/bearer-auth";
import { createFactory } from "hono/factory";
import { Env } from "../types";

const factory = createFactory<{ Bindings: Env }>();

export const auth = factory.createMiddleware(async (c, next) => {
  const auth = bearerAuth({ token: c.env.token });

  await auth(c, next);
});
