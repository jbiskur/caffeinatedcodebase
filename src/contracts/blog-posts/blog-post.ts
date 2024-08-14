import z from "zod"

export const BlogPostDto = z.object({
  id: z.string().min(1),
  name: z.string(),
  createdAt: z.string(),
})

export type BlogPost = z.infer<typeof BlogPostDto>
