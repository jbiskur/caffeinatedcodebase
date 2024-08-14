import { eq } from "drizzle-orm"

import { BlogPostEventArchivedPayload } from "@/contracts/events/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"

export default async function blogPostArchived(payload: unknown) {
  console.log("Got archive event", payload)
  const parsedPayload = BlogPostEventArchivedPayload.parse(payload)
  const blogPost = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, parsedPayload.id),
  })

  if (!blogPost) {
    console.warn(`blogPost ${parsedPayload.id} not found`)
    return
  }

  await db.update(blogPosts).set({ archived: true }).where(eq(blogPosts.id, parsedPayload.id))
}
