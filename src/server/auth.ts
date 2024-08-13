import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { and, eq } from "drizzle-orm"
import { decodeJwt } from "jose"
import { type DefaultSession, type NextAuthOptions, type TokenSet, getServerSession } from "next-auth"
import { type Adapter } from "next-auth/adapters"
import Keycloak, { type KeycloakProfile } from "next-auth/providers/keycloak"
import { type OAuthConfig } from "next-auth/providers/oauth"

import { db } from "@/database"
import { accounts, createTable, sessions, users } from "@/database/schemas"
import { env } from "@/env"

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      firstName: string
      lastName: string
      username: string
    } & DefaultSession["user"]
    idToken: string
    issuer?: string
    error?: "RefreshAccessTokenError"
  }

  interface JWT extends TokenSet {
    access_token: string
    expires_at: number
    refresh_token: string
    id_token: string
    error?: "RefreshAccessTokenError"
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const token = await db.query.accounts.findFirst({
        where: eq(accounts.userId, user.id),
      })

      if (!token) throw new Error("No token found for user")

      const decodedJWT = decodeJwt(token.id_token!) as {
        preferred_username: string
        given_name: string
        family_name: string
      }

      if (token.expires_at && token.refresh_token && token.expires_at * 1000 < Date.now()) {
        // https://accounts.keycloak.com/.well-known/openid-configuration
        // We need the `token_endpoint`.
        const response = await fetch(`${env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: env.AUTH_KEYCLOAK_ID,
            client_secret: env.AUTH_KEYCLOAK_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
          method: "POST",
        })

        if (!response.ok) {
          await db.delete(sessions).where(eq(sessions.userId, token.userId))
          await db
            .delete(accounts)
            .where(and(eq(accounts.providerAccountId, token.providerAccountId), eq(accounts.provider, "keycloak")))
          await db.delete(users).where(eq(users.id, token.userId))
          throw { error: "RefreshAccessTokenError" }
        }

        const tokens: TokenSet = (await response.json()) as TokenSet

        await db
          .update(accounts)
          .set({
            access_token: tokens.access_token,
            expires_at: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            id_token: tokens.id_token,
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          })
          .where(and(eq(accounts.providerAccountId, token.providerAccountId), eq(accounts.provider, "keycloak")))
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          firstName: decodedJWT.given_name,
          lastName: decodedJWT.family_name,
          username: decodedJWT.preferred_username,
        },
        idToken: token?.id_token,
        issuer: env.AUTH_KEYCLOAK_ISSUER,
      }
    },
  },
  events: {
    signOut: async ({ session }) => {
      if (!session) return

      const sessionWithUser = session as unknown as { userId: string }
      const userId = sessionWithUser.userId

      const token = await db.query.accounts.findFirst({
        where: eq(accounts.userId, userId),
      })

      if (!token?.id_token) return

      const issuerUrl = (authOptions.providers.find((p) => p.id === "keycloak") as OAuthConfig<KeycloakProfile>)
        .options!.issuer!

      const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`)
      logOutUrl.searchParams.set("id_token_hint", token.id_token)

      if (await db.query.sessions.findFirst({ where: eq(sessions.userId, userId) })) {
        await db.delete(sessions).where(eq(sessions.userId, userId))
        await db
          .update(accounts)
          .set({ refresh_token: null })
          .where(and(eq(accounts.providerAccountId, token.providerAccountId), eq(accounts.provider, "keycloak")))
      }

      await fetch(logOutUrl)
    },
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    Keycloak({
      clientId: env.AUTH_KEYCLOAK_ID,
      clientSecret: env.AUTH_KEYCLOAK_SECRET,
      issuer: env.AUTH_KEYCLOAK_ISSUER,
      authorization: {
        params: {
          scope: "openid profile email offline_access",
        },
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
