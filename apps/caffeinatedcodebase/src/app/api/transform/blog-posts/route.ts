import blogPostArchived from "./route-blog-post-archived"
import blogPostCreated from "./route-blog-post-created"
import blogPostUpdated from "./route-blog-post-updated"
import { blogPost } from "../../../../contracts/events/blog-post"
import { eventTransformClient } from "../flowcore-clients"

const eventTransformer = eventTransformClient(blogPost, {
  created: blogPostCreated,
  updated: blogPostUpdated,
  archived: blogPostArchived,
})

export const POST = eventTransformer.post.bind(eventTransformer)
