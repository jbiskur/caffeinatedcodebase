import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { EditIcon } from "lucide-react"
import { type FC } from "react"
import { toast } from "sonner"

import EditBlog PostDialog from "./edit-blogPost.dialog"

export const Blog PostColumnEditButton: FC<{
  blogPost: Blog Post
  refetch: () => void
}> = ({ blogPost, refetch }) => {
  const { translator } = useTranslation()

  return (
    <EditBlog PostDialog
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
                <Translated
                  path={"blogPosts.blogPost.update.title"}
                />
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </EditBlog PostDialog>
  )
}
