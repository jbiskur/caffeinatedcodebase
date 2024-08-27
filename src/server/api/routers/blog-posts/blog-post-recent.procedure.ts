import { BlogPost } from "@/contracts/blog-posts/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { publicProcedure } from "@/server/api/trpc"
import { BlogPostService } from "@/server/services/blog-post.service"
import { and, desc, eq, ne } from "drizzle-orm"
import { z } from "zod"
export const getRecentBlogPostsProcedure = publicProcedure
  .input(z.object({ slug: z.string() }))
  .query(async ({ input }): Promise<BlogPost[]> => {
    const blogPostResult = await db.query.blogPosts.findMany({
      where: and(eq(blogPosts.archived, false), ne(blogPosts.slug, input.slug)),
      orderBy: desc(blogPosts.createdAt),
      limit: 3,
    })

    return blogPostResult.map((blogPost) => new BlogPostService(blogPost).getBlogPost())
  })
