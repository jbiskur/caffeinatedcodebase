import z from "zod"

import { PaginationResult } from "@/contracts/pagination/pagination"
import { BlogPostDto } from "@/contracts/blog-posts/blog-post"

export const PagedBlogPostDto = PaginationResult.extend({
  items: z.array(BlogPostDto),
})

export type PagedBlogPostResult = z.infer<typeof PagedBlogPostDto>
