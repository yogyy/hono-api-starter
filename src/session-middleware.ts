import { createMiddleware } from "hono/factory";
import { auth } from "./lib/auth";
import { env } from "cloudflare:workers";

interface Session {
  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null | undefined;
    userAgent?: string | null | undefined;
  };
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
  };
}

type Env = {
  Bindings: Cloudflare.Env;
  Variables: {
    session: Session | null;
  };
};

export const sessionMiddleware = createMiddleware<Env>(async (c, next) => {
  const session = await auth(env).api.getSession({
    headers: c.req.raw.headers,
  });

  c.set("session", session);

  await next();
});
