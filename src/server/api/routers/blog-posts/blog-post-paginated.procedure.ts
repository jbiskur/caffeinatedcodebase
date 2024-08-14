import { type SQL, and, asc, desc, eq, ilike } from "drizzle-orm"

import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { type ScrollBlogPostResult } from "@/contracts/blog-posts/scroll-blog-posts"
import { SearchableScrollPaginationInput } from "@/contracts/pagination/scroll"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { protectedProcedure } from "@/server/api/trpc"
import { BlogPostService } from "@/server/services/blog-post.service"

export const getBlogPostListProcedure = protectedProcedure
  .input(SearchableScrollPaginationInput)
  .query(async ({ input }): Promise<ScrollBlogPostResult> => {
    const limit = input.limit ?? 50
    const { cursor } = input

    let orderBy: SQL<unknown>[] = [asc(blogPosts.id)]

    if (input.sort?.[0]) {
      const sorting = input.sort[0] as { id: keyof BlogPost; desc: boolean }

      switch (sorting.id) {
        case "createdAt":
          orderBy = sorting.desc ? [desc(blogPosts.id)] : [asc(blogPosts.id)]
          break
        default:
          orderBy = [desc(blogPosts.createdAt)]
          break
      }
    }

    const inputSearchTerm = `${"%" + input.searchTerm + "%"}`
    const searchConditions = input.searchTerm ? ilike(blogPosts.id, inputSearchTerm) : undefined

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
      items: profileResult.map((row): BlogPost => {
        const blogPostService = new BlogPostService(row)
        return blogPostService.getBlogPost()
      }),
      nextCursor,
    }
  })
