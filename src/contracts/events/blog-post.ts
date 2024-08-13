import { z } from "zod"

import { webhookClient } from "@/app/api/transform/flowcore-clients"

import { type TrackedMetadata } from "../../lib/events/tracked-webhook"

export const blogPost = {
  flowType: "blogPost.0",
  eventType: {
    created: "blogPost.created.0",
    updated: "blogPost.updated.0",
    archived: "blogPost.archived.0",
  },
} as const

export const Blog PostEventCreatedPayload = z.object({
  id: z.string(),
  name: z.string(),
  //Fill in the fields that are required to create a new Blog Post
})

export const Blog PostEventUpdatedPayload = Blog PostEventCreatedPayload.partial().required({
    id: true,
  })

export const Blog PostEventArchivedPayload = z.object({
  id: z.string(),
  _reason: z.string().optional(),
})

export type Blog PostEventCreated = z.infer<typeof Blog PostEventCreatedPayload>
export type Blog PostEventUpdated = z.infer<typeof Blog PostEventUpdatedPayload>
export type Blog PostEventArchived = z.infer<typeof Blog PostEventArchivedPayload>

export const sendBlog PostCreatedEvent = webhookClient<z.infer<typeof Blog PostEventCreatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.created,
)

export const sendBlog PostUpdatedEvent = webhookClient<z.infer<typeof Blog PostEventUpdatedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.updated,
)

export const sendBlog PostArchivedEvent = webhookClient<z.infer<typeof Blog PostEventArchivedPayload>, TrackedMetadata>(
  blogPost.flowType,
  blogPost.eventType.archived,
)
