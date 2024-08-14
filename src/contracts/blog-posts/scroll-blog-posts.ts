import z from "zod"

import { BlogPostDto } from "@/contracts/blog-posts/blog-post"

import { ScrollPaginationResult } from "../pagination/scroll"

export const ScrollBlogPostDto = ScrollPaginationResult.extend({
  items: z.array(BlogPostDto),
})

export type ScrollBlogPostResult = z.infer<typeof ScrollBlogPostDto>
