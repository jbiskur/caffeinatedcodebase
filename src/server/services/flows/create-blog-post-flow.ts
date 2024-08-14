import shortUUID from "short-uuid"

import { sendBlogPostArchivedEvent, sendBlogPostCreatedEvent } from "@/contracts/events/blog-post"
import { type CreateBlogPost } from "@/contracts/blog-posts/mutate-blog-posts"
import { readError } from "@/lib/read-error"
import { type RequestContext } from "@/server/api/trpc"

export const sendCreateBlogPostFlow = async (ctx: RequestContext, input: CreateBlogPost) => {
  const id = shortUUID.generate()
  
  try {
    await ctx.auditWebhook(sendBlogPostCreatedEvent, {
      id,
      name: input.name ?? "",
    })
  } catch (error) {
    console.error("Error sending blogPost created event", error)

    const message = readError(error)

    await sendBlogPostArchivedEvent({
      id,
      _reason: `rollback: ${message}`,
    })

    throw new Error(`Failed to create the blogPost - ${message}`)
  }
}
