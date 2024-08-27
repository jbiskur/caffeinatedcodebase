import MarkdownViewer from "@/components/md-viewer"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { api } from "@/trpc/server"
import { BookOpenIcon } from "lucide-react"
import Link from "next/link"
import { ShareBlog } from "./share-blog.component"
import { env } from "@/env"

export default async function SignInPage({ params }: { params: { slug: string } }) {
  const blogPost = await api.blogPosts.bySlug.query({ slug: params.slug })

  if (!blogPost) {
    return <div>The blog post you are looking for does not exist.</div>
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 grid md:grid-cols-[2fr_1fr] gap-8">
      <article className="prose prose-gray mx-auto max-w-3xl dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{blogPost.title}</h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6 rounded-full">
                {/* <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" /> */}
                <AvatarFallback>JB</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Julius á Rógvi Biskopstø</span>
            </div>
            <span className="text-sm">{new Date(blogPost.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <MarkdownViewer source={blogPost.content} />
        <ShareBlog blogPost={blogPost} siteUrl={env.SITE_URL} />
      </article>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <BookOpenIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Recent Posts</h2>
        </div>
        <span />
        <Card className="p-4">
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-top gap-2">
                <div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Minimalism and Mental Health</h3>
                    <span className="text-sm text-muted-foreground opacity-70">May 20, 2023</span>
                  </div>
                  <p className="text-muted-foreground text-sm">How decluttering can improve well-being</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">The Joy of Capsule Wardrobes</h3>
                    <span className="text-sm text-muted-foreground opacity-70">May 10, 2023</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Building a minimalist closet</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Minimalist Living on a Budget</h3>
                    <span className="text-sm text-muted-foreground opacity-70">April 28, 2023</span>
                  </div>
                  <p className="text-muted-foreground text-sm">Saving money while embracing minimalism</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Link href="/" className="text-muted-foreground hover:underline" prefetch={false}>
              View all blog posts
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
