import { archiveBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { sendBlogPostArchivedEvent } from "@/contracts/events/blog-post"
import { protectedProcedure } from "@/server/api/trpc"

export const archiveBlogPostProcedure = protectedProcedure
  .input(archiveBlogPostSchema)
  .mutation(async ({ input, ctx }) => {
    await ctx.auditWebhook(sendBlogPostArchivedEvent, {
      id: input.id,
    })
  })
