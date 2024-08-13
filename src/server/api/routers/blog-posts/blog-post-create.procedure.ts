import { createBlog PostSchema } from "@/contracts/blogPosts/mutate-blogPosts"
import { protectedProcedure } from "@/server/api/trpc"
import { sendCreateBlog PostFlow } from "@/server/services/flows/create-blogPost-flow"

export const createBlog PostProcedure = protectedProcedure.input(createBlog PostSchema).mutation(async ({ input, ctx }) => {
  return sendCreateBlog PostFlow(ctx, input)
})
