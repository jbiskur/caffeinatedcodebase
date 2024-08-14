import { boolean, text } from "drizzle-orm/pg-core"
import { createTable } from "./utils"

export const blogPosts = createTable("blogPost", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: text("created_at"),
  archived: boolean("archived").default(false),
})
