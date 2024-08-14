import { createBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { protectedProcedure } from "@/server/api/trpc"
import { sendCreateBlogPostFlow } from "@/server/services/flows/create-blog-post-flow"

export const createBlogPostProcedure = protectedProcedure
  .input(createBlogPostSchema)
  .mutation(async ({ input, ctx }) => {
    return sendCreateBlogPostFlow(ctx, input)
  })
