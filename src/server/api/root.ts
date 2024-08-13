import { translationRouter } from "@/server/api/routers/translation/translation.router"
import { Blog PostsRouter } from "@/server/api/routers/blog-posts/blog-posts.router"
import { createTRPCRouter } from "@/server/api/trpc"


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  blogPosts: Blog PostsRouter,
  translation: translationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
