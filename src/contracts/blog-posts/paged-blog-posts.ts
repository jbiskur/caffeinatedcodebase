import z from "zod"

import { PaginationResult } from "@/contracts/pagination/pagination"
import { Blog PostDto } from "@/contracts/blogPosts/blogPost"

export const PagedBlog PostDto = PaginationResult.extend({
  items: z.array(Blog PostDto),
})

export type PagedBlog PostResult = z.infer<typeof PagedBlog PostDto>
