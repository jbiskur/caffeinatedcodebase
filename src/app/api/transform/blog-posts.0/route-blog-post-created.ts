import { eq } from "drizzle-orm"

import { BlogPostEventCreatedPayload } from "@/contracts/events/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"
import { type EventMetdata } from "@flowcore/sdk-transformer-core"

export default async function blogPostCreated(payload: unknown, metadata?: EventMetdata) {
  console.log("Got blog post created event", payload)
  const parsedPayload = BlogPostEventCreatedPayload.parse(payload)
  const exists = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, parsedPayload.id),
  })
  if (exists) {
    return
  }
  await db.insert(blogPosts).values({
    id: parsedPayload.id,
    title: parsedPayload.title,
    summary: parsedPayload.summary,
    content: parsedPayload.content,
    slug: parsedPayload.slug,
    tags: parsedPayload.tags.join(","),
    published: parsedPayload.published,
    publishedAt: parsedPayload.published ? metadata?.validTime : null,
    createdAt: metadata?.validTime,
    author: parsedPayload.author,
  })
}
