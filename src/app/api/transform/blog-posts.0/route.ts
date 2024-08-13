import { eventTransformClient } from "@/app/api/transform/flowcore-clients"
import blogPostCreated from "@/app/api/transform/blogPosts.0/route-blogPost-created"
import { blogPost } from "@/contracts/events/blogPost"

import blogPostArchived from "./route-blogPost-archived"
import blogPostUpdated from "./route-blogPost-updated"

const eventTransformer = eventTransformClient(blogPost, {
  created: blogPostCreated,
  updated: blogPostUpdated,
  archived: blogPostArchived,
})

export const POST = eventTransformer.post.bind(eventTransformer)
