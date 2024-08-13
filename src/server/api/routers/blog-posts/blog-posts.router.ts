import { getBlog PostListProcedure } from "@/server/api/routers/blogPosts/blogPost-paginated.procedure"
import { getBlog PostCountProcedure } from "@/server/api/routers/blogPosts/blogPost-total-count.procedure"
import { createTRPCRouter } from "@/server/api/trpc"

import { archiveBlog PostProcedure } from "./blogPost-archive.procedure"
import { createBlog PostProcedure } from "./blogPost-create.procedure"
import { getBlog PostIndividualProcedure } from "./blogPost-individual.procedure"
import { updateBlog PostProcedure } from "./blogPost-update.procedure"

export const Blog PostsRouter = createTRPCRouter({
  list: getBlog PostListProcedure,
  count: getBlog PostCountProcedure,
  individual: getBlog PostIndividualProcedure,
  create: createBlog PostProcedure,
  update: updateBlog PostProcedure,
  archive: archiveBlog PostProcedure,
})
