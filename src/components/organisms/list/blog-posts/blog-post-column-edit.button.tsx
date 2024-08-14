import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { EditIcon } from "lucide-react"
import { type FC } from "react"
import { toast } from "sonner"

import EditBlogPostDialog from "./edit-blog-post.dialog"

export const BlogPostColumnEditButton: FC<{
  blogPost: BlogPost
  refetch: () => void
}> = ({ blogPost, refetch }) => {
  const { translator } = useTranslation()

  return (
    <EditBlogPostDialog
      blogPost={blogPost}
      onDone={(data) => {
        if (!data.success) {
          toast.error(translator("blogPosts.blogPost.update.error"), {
            closeButton: true,
          })
          return
        }

        refetch()
      }}
    >
      <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <EditIcon className={"h-4 w-4"} />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                <Translated path={"blogPosts.blogPost.update.title"} />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </EditBlogPostDialog>
  )
}
