import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { MikroOrmAdapter } from "@auth/mikro-orm-adapter";
import "next-auth/jwt";
import config from "./mikro-orm.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MikroOrmAdapter(config),
  debug: !!process.env.AUTH_DEBUG,
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/middleware-example") return !!auth;
      return true;
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name;
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token };
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken;

      return session;
    },
  },
  experimental: { enableWebAuthn: true },
});

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
