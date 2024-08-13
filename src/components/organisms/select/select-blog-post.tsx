import { PlusCircleIcon } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { CreateBlog PostDialog } from "@/components/organisms/list/blogPosts/create-blogPost.dialog"
import { Button } from "@/components/ui/button"
import { ComboBox, type ComboBoxOption } from "@/components/ui/combo-box"
import { Translated } from "@/components/ui/translation/translated"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { api } from "@/trpc/react"

type SelectBlog PostProps = {
  value?: string
  onChange: (value?: string) => void
  placeholder?: string
  clearable?: boolean
  className?: string
} & ComboBoxOption

export default function SelectBlog Post({ value, placeholder, onChange, clearable, className }: SelectBlog PostProps) {
  const [query, setQuery] = useState<string>("")
  const [options, setOptions] = useState<ComboBoxOption[]>([])

  const { data: searchResults } = api.blogPosts.list.useInfiniteQuery({ limit: 100, searchTerm: query })

  const { data: blogPost, refetch } = api.blogPosts.individual.useQuery({ id: value }, { enabled: !!value })
  const valueLabel = useMemo(() => `${blogPost?.createdAt}`, [blogPost])

  useEffect(() => {
    if (!searchResults?.pages) {
      setOptions([])
      return
    }

    setOptions(
      searchResults.pages.flatMap<ComboBoxOption>((page) =>
        page.items.map((result) => ({
          label: `${result.createdAt}`,
          value: result.id,
        })),
      ),
    )
  }, [searchResults])

  const select = useCallback(
    (value?: string) => {
      onChange(value?.toString())
    },
    [onChange],
  )

  const added = useCallback(
    (result: Blog Post) => {
      onChange(result.id)
      void refetch()
    },
    [onChange, refetch],
  )

  return (
    <ComboBox
      className={className}
      clearable={clearable}
      placeholder={placeholder}
      options={options}
      value={value}
      valueLabel={valueLabel}
      onChange={select}
      onQueryChange={setQuery}
    >
      <CreateBlog PostDialog onDone={added}>
        <Button variant="ghost" rhs={<PlusCircleIcon className="h-4 w-4" />}>
          <Translated path="blogPosts.blogPost.create.title" />
        </Button>
      </CreateBlog PostDialog>
    </ComboBox>
  )
}
