import { boolean, text } from "drizzle-orm/pg-core"
import { createTable } from "./utils"

export const blogPosts = createTable("blogPost", {
  id: text("id").primaryKey(),
  title: text("title"),
  summary: text("summary"),
  content: text("content"),
  tags: text("tags"),
  slug: text("slug"),
  createdAt: text("created_at"),
  updatedAt: text("updated_at"),
  published: boolean("published").default(false),
  publishedAt: text("published_at"),
  archived: boolean("archived").default(false),
  author: text("author"),
})
