import { z } from "zod"

export const createBlog PostSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1).optional(),
  //fill in the rest of the fields that are required to create a new Blog Post
})

export const updateBlog PostSchema = createBlog PostSchema.partial().extend({
  id: z.string().min(1),
})


export const archiveBlog PostSchema = z.object({
  id: z.string().min(1),
})

export type CreateBlog Post = z.infer<typeof createBlog PostSchema>
export type UpdateBlog Post = z.infer<typeof updateBlog PostSchema>
export type ArchiveBlog Post = z.infer<typeof archiveBlog PostSchema>
