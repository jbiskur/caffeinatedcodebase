import { z } from "zod"
import { webhookClient } from "../../app/api/transform/flowcore-clients"
import { TrackedMetadata } from "../../server/lib/events/tracked-webhook"



export const blogPost = {
  flowType: "blog-post.0",
  eventType: {
    created: "blog-post.created.0",
    updated: "blog-post.updated.0",
    archived: "blog-post.archived.0",
  },
} as const

export const BlogPostCreatedPayload = z.object({
  id: z.string(),
  externalId: z.string(),
  companyName: z.string(),
  registrationNumber: z.string(),
  journalNo: z.array(z.string()),
  address: z.string(),
  postalCode: z.string(),
  city: z.string(),
  contactNumbers: z.array(z.string()).optional(),
  emails: z.array(z.string()).optional(),
})

export const BlogPostUpdatedPayload = BlogPostCreatedPayload.omit({
  externalId: true,
})
  .partial()
  .required({
    id: true,
  })

export const BlogPostArchivedPayload = z.object({
  id: z.string(),
  _reason: z.string().optional(),
})

export type BlogPostCreated = z.infer<typeof BlogPostCreatedPayload>
export type BlogPostUpdated = z.infer<typeof BlogPostUpdatedPayload>
export type BlogPostArchived = z.infer<typeof BlogPostArchivedPayload>

export const sendBlogPostCreatedEvent = webhookClient<z.infer<typeof BlogPostCreatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.created,
)

export const sendBlogPostUpdatedEvent = webhookClient<z.infer<typeof BlogPostUpdatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.updated,
)

export const sendBlogPostArchivedEvent = webhookClient<z.infer<typeof BlogPostArchivedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.archived,
)
