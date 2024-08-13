import z from "zod"

export const Blog PostDto = z.object({
  id: z.string().min(1),
  name: z.string(),
  createdAt: z.string(),

})

export type Blog Post = z.infer<typeof Blog PostDto>
