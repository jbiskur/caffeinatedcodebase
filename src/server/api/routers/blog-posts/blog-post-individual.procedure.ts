import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { type BlogPostWithAssociation } from "@/contracts/blog-posts/blog-post-with-association"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { protectedProcedure } from "@/server/api/trpc"
import { BlogPostService } from "@/server/services/blog-post.service"

const inputSchema = z.object({
  id: z.string(),
})

export const getBlogPostIndividualProcedure = protectedProcedure
  .input(inputSchema)
  .query(async ({ input }): Promise<BlogPostWithAssociation> => {
    const blogPostResult = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.id, input.id), eq(blogPosts.archived, false)),
    })

    if (!blogPostResult) {
      throw new Error(`No blogPost found with the provided ID: ${input.id}`)
    }

    const blogPost = new BlogPostService(blogPostResult)

    return blogPost.getBlogPost()
  })
