import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { type Blog PostWithAssociation } from "@/contracts/blogPosts/blogPost-with-association"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { protectedProcedure } from "@/server/api/trpc"
import { Blog PostService } from "@/server/services/blogPost.service"

const inputSchema = z.object({
  id: z.string(),
})

export const getBlog PostIndividualProcedure = protectedProcedure
  .input(inputSchema)
  .query(async ({ input }): Promise<Blog PostWithAssociation> => {
    const blogPostResult = await db.query.blogPosts.findFirst({
      where: and(eq(blogPosts.id, input.id), eq(blogPosts.archived, false)),
    })

    if (!blogPostResult) {
      throw new Error(`No blogPost found with the provided ID: ${input.id}`)
    }

    const blogPost = new Blog PostService(blogPostResult)

    return blogPost.getBlog Post()
  })
