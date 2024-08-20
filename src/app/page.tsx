import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignedIn } from "@clerk/nextjs"
import { faFilePlus, faSearch } from "@fortawesome/pro-light-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { api } from "../trpc/server"

export default async function Home() {
  const blogs = await api.blogPosts.list.query({})

  console.log(blogs)

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 grid md:grid-cols-[2fr_1fr] gap-8">
      <div>
        <div className="grid gap-4">
          {blogs.items.map((blog) => (
            <div className="p-4" key={blog.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    By {blog.author} - {blog.createdAt}
                  </p>
                  <p className="text-muted-foreground text-sm">{blog.summary}</p>
                  {/* <p className="text-sm text-muted-foreground mt-2">{blog.summary}</p> */}
                </div>
                <div className="flex flex-col items-end" />
              </div>
              <div className="mt-2">
                <Link href={`/blog/${blog.slug}`} className="text-primary hover:underline" prefetch={false}>
                  Read more
                </Link>
              </div>
            </div>
          ))}
          {/* {visibleBlogs < blogs.length && ( */}
          <div className="flex justify-center">
            <Button>Load More</Button>
          </div>
          {/* )} */}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <SignedIn>
          <Card>
            <CardHeader>
              <CardTitle>Admin</CardTitle>
              <CardDescription>Administrator tools for managing blog posts.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center">
              <Link href="/blog/new">
                <Button className="ml-2">
                  <FontAwesomeIcon icon={faFilePlus} className="w-5 h-5" />
                  <span className="sr-only">New Blog Post</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </SignedIn>
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>Search for blog posts on the site.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <Input placeholder="Search" className="flex-1" />
            <Button className="ml-2">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
