import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { prisma } from "@/lib/prisma";

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const betterAuthUrl = process.env.BETTER_AUTH_URL;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (
  !betterAuthSecret ||
  !betterAuthUrl ||
  !googleClientId ||
  !googleClientSecret
) {
  throw new Error("Missing required authentication environment variables");
}

export const auth = betterAuth({
  appName: "ScopeAprove",
  secret: betterAuthSecret,
  baseURL: betterAuthUrl,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
});