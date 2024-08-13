import { type SortingState, flexRender } from "@tanstack/react-table"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { type FC, useState } from "react"

import { blogPostColumns } from "@/app/blogPosts/blogPost-columns"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data/data-table"
import { Translated } from "@/components/ui/translation/translated"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { api } from "@/trpc/react"

import { type ListControlProps } from "../list-control.type"
import { CreateBlog PostDialog } from "./create-blogPost.dialog"
import { Blog PostColumnEditButton } from "./blogPost-column-edit.button"

export type Blog PostsListProps = {
  currentPage: number
} & ListControlProps<Blog Post>

export const Blog PostsList: FC<Blog PostsListProps> = ({ asRoute, onSelect, canCreate }) => {
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
          <CreateBlog PostDialog
            onDone={() => {
              void refetch()
            }}
          >
            <Button rhs={<PlusIcon />}>
              <Translated path="blogPosts.blogPost.create.button" />
            </Button>
          </CreateBlog PostDialog>
        </div>
      )}

      <DataTable
        columns={blogPostColumns({
          onEdit: (blogPost: Blog Post) => <Blog PostColumnEditButton blogPost={blogPost} refetch={refetch} />,
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
