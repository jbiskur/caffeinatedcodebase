import { updateBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { sendBlogPostUpdatedEvent } from "@/contracts/events/blog-post"
import { protectedProcedure } from "@/server/api/trpc"

export const updateBlogPostProcedure = protectedProcedure
  .input(updateBlogPostSchema)
  .mutation(async ({ input, ctx }) => {
    await ctx.auditWebhook(sendBlogPostUpdatedEvent, {
      id: input.id,
    })
  })
