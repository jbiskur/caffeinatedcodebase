import { and, asc, desc, eq, ilike, type SQL } from "drizzle-orm"

import { SearchableScrollPaginationInput } from "@/contracts/pagination/scroll"
import { db } from "@/database"
import { protectedProcedure } from "@/server/api/trpc"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { type ScrollBlog PostResult } from "@/contracts/blogPosts/scroll-blogPosts"
import { blogPosts } from "@/database/schemas"
import { Blog PostService } from "@/server/services/blogPost.service"

export const getBlog PostListProcedure = protectedProcedure
  .input(SearchableScrollPaginationInput)
  .query(async ({ input }): Promise<ScrollBlog PostResult> => {
    const limit = input.limit ?? 50
    const { cursor } = input

    let orderBy: SQL<unknown>[] = [asc(blogPosts.id)]

    if (input.sort?.[0]) {
      const sorting = input.sort[0] as { id: keyof Blog Post; desc: boolean }

      switch (sorting.id) {
        case "createdAt":
          orderBy = sorting.desc
            ? [desc(blogPosts.id)]
            : [asc(blogPosts.id)]
          break
        default:
          orderBy = [desc(blogPosts.createdAt)]
          break
      }
    }

    const inputSearchTerm = `${"%"+ input.searchTerm +"%"}`;
    const searchConditions = input.searchTerm
      ? ilike(blogPosts.id, inputSearchTerm)
      : undefined

    const profileResult = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.archived, false), searchConditions))
      .offset(cursor)
      .limit(limit + 1)
      .orderBy(...orderBy)
      .execute()

    if (!profileResult.length) {
      return {
        items: [],
      }
    }

    let nextCursor: typeof cursor | undefined = undefined
    if (profileResult.length > limit) {
      profileResult.pop()
      nextCursor = cursor + limit
    }
    return {
      items: profileResult.map((row): Blog Post => {
        const blogPostService = new Blog PostService(row)
        return blogPostService.getBlog Post()
      }),
      nextCursor,
    }
  })


