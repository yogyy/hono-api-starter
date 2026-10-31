import { BetterAuthOptions } from "better-auth";
import { bearer } from "better-auth/plugins";

/**
 * Custom options for Better Auth
 *
 * Docs: https://www.better-auth.com/docs/reference/options
 */
export const betterAuthOptions: BetterAuthOptions = {
  /**
   * The name of the application.
   */
  appName: "YOUR_APP_NAME",
  /**
   * Base path for Better Auth.
   * @default "/api/auth"
   */
  basePath: "/api",
  baseURL: "http://127.0.0.1:8787",
  emailAndPassword: {
    enabled: true,
  },
  plugins: [bearer()],
  // .... More options
};
