import { BlogPost } from "@/contracts/blog-posts/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { protectedProcedure } from "@/server/api/trpc"
import { BlogPostService } from "@/server/services/blog-post.service"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

const inputSchema = z.object({
  slug: z.string(),
})

export const getBlogPostBySlugProcedure = protectedProcedure
  .input(inputSchema)
  .query(async ({ input }): Promise<BlogPost> => {
    const blogPostResult = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.slug, input.slug), eq(blogPosts.archived, false)),
    })

    if (!blogPostResult) {
      throw new Error(`No blogPost found with the provided slug: ${input.slug}`)
    }

    const blogPost = new BlogPostService(blogPostResult)

    return blogPost.getBlogPost()
  })
