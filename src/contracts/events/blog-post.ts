import { z } from "zod"

import { webhookClient } from "@/app/api/transform/flowcore-clients"

import { type TrackedMetadata } from "../../lib/events/tracked-webhook"

export const blogPost = {
  flowType: "blog.post.0",
  eventType: {
    created: "blog.post.created.0",
    updated: "blog.post.updated.0",
    archived: "blog.post.archived.0",
  },
} as const

export const BlogPostEventCreatedPayload = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  slug: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  published: z.boolean().default(false),
  author: z.string(),
  archived: z.boolean().default(false),
})

export const BlogPostEventUpdatedPayload = BlogPostEventCreatedPayload.partial().required({
  id: true,
})

export const BlogPostEventArchivedPayload = z.object({
  id: z.string(),
  _reason: z.string().optional(),
})

export type BlogPostEventCreated = z.infer<typeof BlogPostEventCreatedPayload>
export type BlogPostEventUpdated = z.infer<typeof BlogPostEventUpdatedPayload>
export type BlogPostEventArchived = z.infer<typeof BlogPostEventArchivedPayload>

export const sendBlogPostCreatedEvent = webhookClient<z.infer<typeof BlogPostEventCreatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.created,
)

export const sendBlogPostUpdatedEvent = webhookClient<z.infer<typeof BlogPostEventUpdatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.updated,
)

export const sendBlogPostArchivedEvent = webhookClient<z.infer<typeof BlogPostEventArchivedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.archived,
)
