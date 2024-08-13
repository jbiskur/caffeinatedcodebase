import { eq } from "drizzle-orm"

import { type AuditLog } from "../../../../contracts/audit/audit-log"
import {
  type Blog PostEventArchived,
  type Blog PostEventCreated,
  type Blog PostEventUpdated,
  blogPost,
} from "../../../../contracts/events/blogPost"
import { EventDataDto, type SourceEvent } from "../../../../contracts/events/source-event"
import { db } from "../../../../database"
import { auditLogs } from "../../../../database/schemas"

export const blogPostRoute = async (
  event: SourceEvent,
  options: {
    userId?: string
    remoteIp?: string
  },
) => {
  if (await db.query.auditLogs.findFirst({ where: eq(auditLogs.id, event.eventId) })) {
    return Response.json({ success: true })
  }

  let auditLog: AuditLog | undefined

  switch (event.eventType) {
    case blogPost.eventType.created:
      const created = EventDataDto<Blog PostEventCreated>(event)

      auditLog = {
        id: created.eventId,
        userId: options.userId,
        action: "Blog Post created",
        entity: blogPost.flowType,
        entityId: created.payload.id,
        data: JSON.stringify(created.payload),
        timestamp: created.validTime,
        remoteIp: options.remoteIp,
      }
      break
    case blogPost.eventType.updated:
      const updated = EventDataDto<Blog PostEventUpdated>(event)

      auditLog = {
        id: updated.eventId,
        userId: options.userId,
        action: "Blog Post updated",
        entity: blogPost.flowType,
        entityId: updated.payload.id,
        data: JSON.stringify(updated.payload),
        timestamp: updated.validTime,
        remoteIp: options.remoteIp,
      }
      break
    case blogPost.eventType.archived:
      const archived = EventDataDto<Blog PostEventArchived>(event)
      auditLog = {
        id: archived.eventId,
        userId: options.userId,
        action: "Blog Post archived",
        entity: blogPost.flowType,
        entityId: archived.payload.id,
        data: JSON.stringify(archived.payload),
        timestamp: archived.validTime,
        remoteIp: options.remoteIp,
      }
      break
  }

  if (!auditLog) {
    throw new Error(`Failed to create audit log with event data ${JSON.stringify(event)}`)
  }

  await db.insert(auditLogs).values(auditLog).execute()

  return Response.json({ success: true })
}
