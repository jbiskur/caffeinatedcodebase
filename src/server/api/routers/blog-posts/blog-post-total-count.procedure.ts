import { and, count, eq } from "drizzle-orm"

import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { protectedProcedure } from "@/server/api/trpc"

export const getBlogPostCountProcedure = protectedProcedure.query(async (): Promise<number> => {
  return db
    .select({ value: count() })
    .from(blogPosts)
    .where(and(eq(blogPosts.archived, false)))
    .then((result) => result[0]?.value ?? 0)
})
