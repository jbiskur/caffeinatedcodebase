import { z } from "zod"

import { Blog PostDto } from "@/contracts/blogPosts/blogPost"

export const Blog PostWithAssociationDto = Blog PostDto.extend({
  association: z.object({}).nullish(),
})

export type Blog PostWithAssociation = z.infer<typeof Blog PostWithAssociationDto>
