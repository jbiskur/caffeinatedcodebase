import { getBlogPostListProcedure } from "@/server/api/routers/blog-posts/blog-post-paginated.procedure"
import { getBlogPostCountProcedure } from "@/server/api/routers/blog-posts/blog-post-total-count.procedure"
import { createTRPCRouter } from "@/server/api/trpc"

import { archiveBlogPostProcedure } from "./blog-post-archive.procedure"
import { getBlogPostBySlugProcedure } from "./blog-post-by-slug.procedure"
import { createBlogPostProcedure } from "./blog-post-create.procedure"
import { getRecentBlogPostsProcedure } from "./blog-post-recent.procedure"
import { updateBlogPostProcedure } from "./blog-post-update.procedure"

export const BlogPostsRouter = createTRPCRouter({
  list: getBlogPostListProcedure,
  count: getBlogPostCountProcedure,
  bySlug: getBlogPostBySlugProcedure,
  recent: getRecentBlogPostsProcedure,
  create: createBlogPostProcedure,
  update: updateBlogPostProcedure,
  archive: archiveBlogPostProcedure,
})
