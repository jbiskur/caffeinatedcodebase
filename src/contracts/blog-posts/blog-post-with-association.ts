import { z } from "zod"

import { BlogPostDto } from "@/contracts/blog-posts/blog-post"

export const BlogPostWithAssociationDto = BlogPostDto.extend({
  association: z.object({}).nullish(),
})

export type BlogPostWithAssociation = z.infer<typeof BlogPostWithAssociationDto>
