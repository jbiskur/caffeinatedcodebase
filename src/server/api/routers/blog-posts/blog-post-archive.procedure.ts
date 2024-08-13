import { sendBlog PostArchivedEvent } from "@/contracts/events/blogPost"
import { archiveBlog PostSchema } from "@/contracts/blogPosts/mutate-blogPosts"
import { protectedProcedure } from "@/server/api/trpc"

export const archiveBlog PostProcedure = protectedProcedure.input(archiveBlog PostSchema).mutation(async ({ input, ctx }) => {
  await ctx.auditWebhook(sendBlog PostArchivedEvent, {
    id: input.id,
  })
})
