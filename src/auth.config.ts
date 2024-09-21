import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { NextAuthConfig } from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { db } from "@/db";
export default {
  adapter: DrizzleAdapter(db),
  providers: [Discord, Google],
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthConfig;
