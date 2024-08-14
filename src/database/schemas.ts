import { text, timestamp } from "drizzle-orm/pg-core"
import { createTable } from "./utils"

export * from "./utils"

export const auditLogs = createTable("audit_logs", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  remoteIp: text("remote_ip"),
  data: text("data"),
  timestamp: timestamp("timestamp", { mode: "string" }),
})

export * from "./blog-post.schema"
