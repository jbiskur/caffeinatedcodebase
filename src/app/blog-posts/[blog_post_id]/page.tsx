"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArchiveIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import ConfirmInputDialog from "@/components/molecules/dialogs/confirm-input.dialog"
import { Button } from "@/components/ui/button"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { updateBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { api } from "@/trpc/react"

import { BlogPostForm } from "../../../components/organisms/list/blog-posts/blog-post.form"

export default function BlogPostPage({ params }: { params: { blog_post_id: string } }) {
  const { translator } = useTranslation()
  const router = useRouter()

  const { data, error, isLoading } = api.blogPosts.individual.useQuery({
    id: params.blog_post_id,
  })

  const form = useForm<BlogPost>({
    defaultValues: {
      id: params.blog_post_id,
    },
  })

  const blogPostUpdater = api.blogPosts.update.useMutation({
    onSuccess: () => {
      toast.success(translator("blogPosts.blogPost.update.success", { name: params.blog_post_id }))
    },
    onError: () => {
      toast.error(translator("blogPosts.blogPost.update.error", { name: params.blog_post_id }))
    },
  })

  const blogPostArchiver = api.blogPosts.archive.useMutation({
    onSuccess: () => {
      toast.success(translator("blogPosts.blogPost.archive.success", { name: params.blog_post_id }))
      void router.push("/blogPosts")
    },
    onError: () => {
      toast.error(translator("blogPosts.blogPost.archive.error", { name: params.blog_post_id }))
    },
  })

  useEffect(() => {
    if (data) {
      form.reset(data)
    }
  }, [data, form])

  const updateBlogPost = (values: BlogPost) => {
    blogPostUpdater.mutate(values)
  }
  const archiveBlogPost = async () => {
    await blogPostArchiver.mutateAsync({ id: params.blog_post_id })
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <BlogPostForm value={data} onSubmit={updateBlogPost} resolver={zodResolver(updateBlogPostSchema)}>
        <>
          <ConfirmInputDialog
            title={translator("blogPosts.blogPost.archive.title")}
            description={translator("blogPosts.blogPost.archive.confirmation", { name: params.blog_post_id })}
            matchValue={params.blog_post_id}
            onConfirm={archiveBlogPost}
          >
            <Button
              variant="destructive"
              loading={blogPostArchiver.isLoading}
              rhs={<ArchiveIcon className="h-4 w-4" />}
            >
              <Translated path="blogPosts.blogPost.archive.button" />
            </Button>
          </ConfirmInputDialog>
          <Button type="submit" loading={blogPostUpdater.isLoading}>
            <Translated path="blogPosts.blogPost.update.button" />
          </Button>
        </>
      </BlogPostForm>
    </>
  )
}
