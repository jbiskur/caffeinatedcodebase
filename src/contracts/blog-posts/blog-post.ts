import z from "zod"

export const BlogPostDto = z.object({
  id: z.string().min(1),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  published: z.boolean(),
  publishedAt: z.string().optional(),
  author: z.string(),
  archived: z.boolean().default(false),
})

export type BlogPost = z.infer<typeof BlogPostDto>
