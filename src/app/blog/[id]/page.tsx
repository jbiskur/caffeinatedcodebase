import { BookOpenIcon, ShareIcon } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter } from "../../../components/ui/card"

export default async function SignInPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 grid md:grid-cols-[2fr_1fr] gap-8">
      <article className="prose prose-gray mx-auto max-w-3xl dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            The Art of Minimalist Living {params.id}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6 rounded-full">
                {/* <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" /> */}
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">Samantha Chen</span>
            </div>
            <span className="text-sm">May 15, 2023</span>
          </div>
        </div>
        <p>
          In a world filled with constant distractions and material excess, the concept of minimalist living has gained
          significant traction. At its core, minimalism is about intentionally focusing on what truly matters, and
          letting go of the unnecessary clutter that can weigh us down both physically and mentally.
        </p>
        <p>
          By embracing a minimalist lifestyle, we can create a sense of tranquility and clarity in our lives. It's about
          finding joy in the essentials, and cultivating a deep appreciation for the simple things. Whether it's
          decluttering our living spaces, curating a wardrobe of timeless pieces, or simplifying our daily routines, the
          benefits of minimalism are far-reaching.
        </p>
        <p>
          One of the key principles of minimalist living is the idea of "less is more." By paring down our possessions
          and focusing on quality over quantity, we can free up mental and physical space to pursue our passions,
          nurture meaningful relationships, and ultimately, live more intentionally.
        </p>
        <p>
          It's important to note that minimalism is not a one-size-fits-all approach. Each individual's journey towards
          a minimalist lifestyle will be unique, shaped by their personal preferences, needs, and circumstances. The
          beauty of minimalism lies in its adaptability, allowing us to tailor it to our own lives and find the balance
          that works best for us.
        </p>
        <p>
          As we embark on this journey of minimalist living, we may encounter challenges and resistance, both from
          within and from the external world. However, by staying true to our values and embracing the process with
          patience and self-compassion, we can unlock a newfound sense of freedom, clarity, and contentment.
        </p>
        <p>
          In the end, the art of minimalist living is not about depriving ourselves, but about cultivating a life of
          intentionality, gratitude, and simplicity. It's a path that invites us to let go of the unnecessary, and to
          embrace the beauty that lies in the essential.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button variant="ghost" size="icon">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShareIcon className="w-5 h-5" />
            <span className="sr-only">Share via Email</span>
          </Button>
        </div>
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
