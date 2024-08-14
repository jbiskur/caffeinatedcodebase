import { z } from "zod"

export const createBlogPostSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional(),
  //fill in the rest of the fields that are required to create a new Blog Post
})

export const updateBlogPostSchema = createBlogPostSchema.partial().extend({
  id: z.string().min(1),
})


export const archiveBlogPostSchema = z.object({
  id: z.string().min(1),
})

export type CreateBlogPost = z.infer<typeof createBlogPostSchema>
export type UpdateBlogPost = z.infer<typeof updateBlogPostSchema>
export type ArchiveBlogPost = z.infer<typeof archiveBlogPostSchema>
