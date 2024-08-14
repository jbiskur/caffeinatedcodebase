import type { InferSelectModel } from "drizzle-orm"

import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { type BlogPostWithAssociation } from "@/contracts/blog-posts/blog-post-with-association"
import { blogPosts } from "@/database/schemas"

export class BlogPostService {
  private readonly blogPost: BlogPostWithAssociation

  constructor(private readonly row: InferSelectModel<typeof blogPosts>) {
    this.blogPost = this.rowToBlogPost(row)
  }

  getBlogPost(): BlogPostWithAssociation {
    return this.blogPost
  }

  getRow(): InferSelectModel<typeof blogPosts> {
    return this.row
  }

  private rowToBlogPost(row: InferSelectModel<typeof blogPosts>): BlogPost {
    return {
      id: row.id,
      name: row.name ?? "",
      createdAt: row.createdAt ?? "",
    }
  }
}
