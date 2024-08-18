import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SignedIn } from "@clerk/nextjs"
import { FilePlusIcon, SearchIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const blogs = [
    {
      id: 1,
      title: "Minimalism and Mental Health",
      author: "John Doe",
      description: "How decluttering can improve well-being",
      summary:
        "This blog post explores the connection between minimalism and mental health, highlighting how decluttering can lead to improved well-being.",
      date: "May 20, 2023",
    },
    {
      id: 2,
      title: "The Joy of Capsule Wardrobes",
      author: "Jane Smith",
      description: "Building a minimalist closet",
      summary:
        "In this post, we discuss the benefits of adopting a capsule wardrobe and provide tips for building a minimalist closet.",
      date: "May 10, 2023",
    },
    {
      id: 3,
      title: "Minimalist Living on a Budget",
      author: "Michael Johnson",
      description: "Saving money while embracing minimalism",
      summary:
        "This blog post offers practical advice on how to embrace minimalism while staying on a budget, helping you save money and live more intentionally.",
      date: "April 28, 2023",
    },
    {
      id: 4,
      title: "The Art of Decluttering",
      author: "Sarah Lee",
      description: "Tips and tricks for a clutter-free home",
      summary:
        "Discover the art of decluttering with this blog post, which provides tips and tricks for creating a clutter-free home and maintaining a minimalist lifestyle.",
      date: "April 15, 2023",
    },
    {
      id: 5,
      title: "Minimalism for Families",
      author: "David Kim",
      description: "Adapting minimalism with kids",
      summary:
        "This blog post explores how families can adapt minimalism to their lifestyle, offering strategies for embracing a minimalist mindset while raising children.",
      date: "March 30, 2023",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 grid md:grid-cols-[2fr_1fr] gap-8">
      <div>
        <div className="grid gap-4">
          {blogs.slice(0, blogs.length).map((blog) => (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    By {blog.author} - {blog.date}
                  </p>
                  <p className="text-muted-foreground text-sm">{blog.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">{blog.summary}</p>
                </div>
                <div className="flex flex-col items-end" />
              </div>
              <div className="mt-2">
                <Link href="#" className="text-primary hover:underline" prefetch={false}>
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
                  <FilePlusIcon className="w-5 h-5" />
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
              <SearchIcon className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
