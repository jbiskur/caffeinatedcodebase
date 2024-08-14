import { eq } from "drizzle-orm"

import { BlogPostEventUpdatedPayload } from "@/contracts/events/blog-post"
import { db } from "@/database"
import { blogPosts } from "@/database/schemas"

export default async function blogPostUpdated(payload: unknown) {
  console.log("Got updated event", payload)
  const parsedPayload = BlogPostEventUpdatedPayload.parse(payload)
  const blogPost = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.id, parsedPayload.id),
  })

  if (!blogPost) {
    console.warn(`blogPost ${parsedPayload.id} not found`)
    return
  }

  // await db
  //   .update(blogPosts)
  //   .set({
  //     externalId: parsedPayload.externalId,
  //   })
  //   .where(eq(blogPosts.id, parsedPayload.id))
}
