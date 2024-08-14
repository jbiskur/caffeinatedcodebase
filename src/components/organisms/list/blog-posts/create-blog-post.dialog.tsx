import { zodResolver } from "@hookform/resolvers/zod"
import { type PropsWithChildren, useCallback, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { createBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { api } from "@/trpc/react"

import { BlogPostForm } from "./blog-post.form"

export type CreateBlogPostDialogProps = {
  onDone: (result: BlogPost) => void
}

export function CreateBlogPostDialog({ children, onDone }: PropsWithChildren<CreateBlogPostDialogProps>) {
  const [opened, setOpened] = useState(false)
  const { translator } = useTranslation()

  const blogPostsCreator = api.blogPosts.create.useMutation()

  const cancel = useCallback(() => {
    setOpened(false)
  }, [])

  const onCreate = async (value: BlogPost) => {
    if (blogPostsCreator.isLoading) {
      return
    }

    await blogPostsCreator
      .mutateAsync(value)
      .then(() => {
        onDone({ ...value })
        toast.success(translator("blogPosts.blogPost.create.success", { name: value.name }))
        setOpened(false)
      })
      .catch((error) => {
        console.error(error)
        toast.error(translator("blogPosts.blogPost.create.error", { name: value.name }))
      })
  }

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Translated path={"blogPosts.blogPost.create.title"} />
          </DialogTitle>
          <DialogDescription>
            <Translated path={"blogPosts.blogPost.create.description"} />
          </DialogDescription>
        </DialogHeader>
        <div>
          <BlogPostForm onSubmit={onCreate} className="max-h-96" resolver={zodResolver(createBlogPostSchema)}>
            <>
              <Button onClick={cancel} variant={"secondary"}>
                <Translated path={"button.cancel"} />
              </Button>
              <Button type="submit" value={"Submit"} loading={blogPostsCreator.isLoading}>
                <Translated path={"button.create"} />
              </Button>
            </>
          </BlogPostForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}
