import shortUUID from "short-uuid"

import { sendBlog PostArchivedEvent, sendBlog PostCreatedEvent } from "@/contracts/events/blogPost"
import { type CreateBlog Post } from "@/contracts/blogPosts/mutate-blogPosts"
import { readError } from "@/lib/read-error"
import { type RequestContext } from "@/server/api/trpc"

export const sendCreateBlog PostFlow = async (ctx: RequestContext, input: CreateBlog Post) => {
  const id = shortUUID.generate()
  
  try {
    await ctx.auditWebhook(sendBlog PostCreatedEvent, {
      id,
      name: input.name ?? "",
    })
  } catch (error) {
    console.error("Error sending blogPost created event", error)

    const message = readError(error)

    await sendBlog PostArchivedEvent({
      id,
      _reason: `rollback: ${message}`,
    })

    throw new Error(`Failed to create the blogPost - ${message}`)
  }
}
