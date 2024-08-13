import z from "zod"

import { Blog PostDto } from "@/contracts/blogPosts/blogPost"

import { ScrollPaginationResult } from "../pagination/scroll"

export const ScrollBlog PostDto = ScrollPaginationResult.extend({
  items: z.array(Blog PostDto),
})

export type ScrollBlog PostResult = z.infer<typeof ScrollBlog PostDto>
