import { sendBlog PostUpdatedEvent } from "@/contracts/events/blogPost"
import { updateBlog PostSchema } from "@/contracts/blogPosts/mutate-blogPosts"
import { protectedProcedure } from "@/server/api/trpc"

export const updateBlog PostProcedure = protectedProcedure.input(updateBlog PostSchema).mutation(async ({ input, ctx }) => {
  await ctx.auditWebhook(sendBlog PostUpdatedEvent, {
    id: input.id,
    
  })
})
