import { type SortingState, flexRender } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { type FC, useState } from "react"

import { blogPostColumns } from "@/app/blog-posts/blog-post-columns"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data/data-table"
import { Translated } from "@/components/ui/translation/translated"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { api } from "@/trpc/react"

import { type ListControlProps } from "../list-control.type"
import { CreateBlogPostDialog } from "./create-blog-post.dialog"
import { BlogPostColumnEditButton } from "./blog-post-column-edit.button"

export type BlogPostsListProps = {
  currentPage: number
} & ListControlProps<BlogPost>

export const BlogPostsList: FC<BlogPostsListProps> = ({ asRoute, onSelect, canCreate }) => {
  const [value, setValue] = useState("")
  const [sort, setSort] = useState<SortingState>([])

  const { data, isLoading, refetch, fetchNextPage } = api.blogPosts.list.useInfiniteQuery(
    { limit: 20, searchTerm: value, sort },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  )

  const blogPosts = data?.pages.flatMap((page) => page.items) ?? []

  return (
    <div>
      {canCreate && (
        <div className="flex w-[100%] justify-end">
          <CreateBlogPostDialog
            onDone={() => {
              void refetch()
            }}
          >
            <Button rhs={<PlusIcon />}>
              <Translated path="blogPosts.blogPost.create.button" />
            </Button>
          </CreateBlogPostDialog>
        </div>
      )}

      <DataTable
        columns={blogPostColumns({
          onEdit: (blogPost: BlogPost) => <BlogPostColumnEditButton blogPost={blogPost} refetch={refetch} />,
        })}
        data={blogPosts}
        isLoading={isLoading}
        searchValue={value}
        onSearchValueChange={setValue}
        onSortChange={setSort}
        cellNode={(row, cell) =>
          asRoute ? (
            <Link href="/" as={`/blogPosts/${row.original.id}`} passHref>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Link>
          ) : (
            <div onClick={() => onSelect?.(row.original)}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          )
        }
      />
      {!!data?.pages[data.pages.length - 1]?.nextCursor && (
        <div>
          <Button
            variant={`outline`}
            onClick={async () => {
              await fetchNextPage()
            }}
            className="mt-8 w-48"
          >
            Load more...
          </Button>
        </div>
      )}
    </div>
  )
}
