import { eq } from "drizzle-orm"

import { BlogPostEventCreatedPayload } from "@/contracts/events/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { type EventMetdata } from "@flowcore/sdk-transformer-core"

export default async function blogPostCreated(payload: unknown, metadata?: EventMetdata) {
  console.log("Got created event", payload)
  const parsedPayload = BlogPostEventCreatedPayload.parse(payload)
  const exists = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, parsedPayload.id),
  })
  if (exists) {
    return
  }
  await db.insert(blogPosts).values({
    id: parsedPayload.id,
    name: parsedPayload.name,
    createdAt: metadata?.validTime,
  })
}
