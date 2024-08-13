import type { InferSelectModel } from "drizzle-orm"

import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { type Blog PostWithAssociation } from "@/contracts/blogPosts/blogPost-with-association"
import { blogPosts } from "@/database/schemas"

export class Blog PostService {
  private readonly blogPost: Blog PostWithAssociation

  constructor(private readonly row: InferSelectModel<typeof blogPosts>) {
    this.blogPost = this.rowToBlog Post(row)
  }

  getBlog Post(): Blog PostWithAssociation {
    return this.blogPost
  }

  getRow(): InferSelectModel<typeof blogPosts> {
    return this.row
  }

  private rowToBlog Post(row: InferSelectModel<typeof blogPosts>): Blog Post {
    
    return {
      id: row.id,
      name: row.name ?? "",
      createdAt: row.createdAt ?? "",
    }
  }
}
