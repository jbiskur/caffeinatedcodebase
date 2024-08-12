import { type NextRequest } from "next/server"

import { type AuditMetadata } from "../../../../contracts/audit/audit-log"
import { blogPost } from "../../../../contracts/events/blog-post"
import { EventDataDto, type SourceEvent } from "../../../../contracts/events/source-event"
import { blogPostRoute } from "./route-blog-post"

export const POST = async (req: NextRequest) => {
  if (req.headers.get("X-Secret") !== process.env.TRANSFORMER_SECRET) {
    return Response.json({ success: false }, { status: 401 })
  }

  try {
    const eventData = EventDataDto<unknown, AuditMetadata>((await req.json()) as SourceEvent)

    switch (eventData.aggregator) {
      case blogPost.flowType:
        return await blogPostRoute(eventData, {
          userId: eventData.metadata?.userId,
          remoteIp: eventData.metadata?.remoteIp,
        })
      default:
        return Response.json(
          { success: false, message: `Unknown event ${eventData.aggregator} - ${eventData.eventType}` },
          { status: 400 },
        )
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      return Response.json({ success: false, message: error.message }, { status: 400 })
    }
    return Response.json({ success: false, message: "Failed with unknown error" }, { status: 500 })
  }
}
