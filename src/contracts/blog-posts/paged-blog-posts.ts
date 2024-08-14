import z from "zod"

import { BlogPostDto } from "@/contracts/blog-posts/blog-post"
import { PaginationResult } from "@/contracts/pagination/pagination"

export const PagedBlogPostDto = PaginationResult.extend({
  items: z.array(BlogPostDto),
})

export type PagedBlogPostResult = z.infer<typeof PagedBlogPostDto>
