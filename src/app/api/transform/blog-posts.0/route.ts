import { eventTransformClient } from "@/app/api/transform/flowcore-clients"
import blogPostCreated from "@/app/api/transform/blog-posts.0/route-blog-post-created"
import { blogPost } from "@/contracts/events/blog-post"

import blogPostArchived from "./route-blog-post-archived"
import blogPostUpdated from "./route-blog-post-updated"

const eventTransformer = eventTransformClient(blogPost, {
  created: blogPostCreated,
  updated: blogPostUpdated,
  archived: blogPostArchived,
})

export const POST = eventTransformer.post.bind(eventTransformer)
