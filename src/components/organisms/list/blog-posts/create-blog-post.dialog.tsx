import { zodResolver } from "@hookform/resolvers/zod"
import { type PropsWithChildren, useCallback, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { createBlog PostSchema } from "@/contracts/blogPosts/mutate-blogPosts"
import { api } from "@/trpc/react"

import { Blog PostForm } from "./blogPost.form"

export type CreateBlog PostDialogProps = {
  onDone: (result: Blog Post) => void
}

export function CreateBlog PostDialog({ children, onDone }: PropsWithChildren<CreateBlog PostDialogProps>) {
  const [opened, setOpened] = useState(false)
  const { translator } = useTranslation()

  const blogPostsCreator = api.blogPosts.create.useMutation()

  const cancel = useCallback(() => {
    setOpened(false)
  }, [])

  const onCreate = async (value: Blog Post) => {
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
          <Blog PostForm onSubmit={onCreate} className="max-h-96" resolver={zodResolver(createBlog PostSchema)}>
            <>
              <Button onClick={cancel} variant={"secondary"}>
                <Translated path={"button.cancel"} />
              </Button>
              <Button type="submit" value={"Submit"} loading={blogPostsCreator.isLoading}>
                <Translated path={"button.create"} />
              </Button>
            </>
          </Blog PostForm>
        </div>
      </DialogContent>
    </Dialog>
  )
}
