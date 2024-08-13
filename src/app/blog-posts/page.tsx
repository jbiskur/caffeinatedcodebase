"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

import { Blog PostsList } from "@/components/organisms/list/blogPosts/blogPosts-list"
import { Translated } from "@/components/ui/translation/translated"

export default function Blog PostsPage() {
  const search = useSearchParams()

  const page = useMemo(() => parseInt(search.get("page") ?? "1"), [search])

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">
          <Translated path="blogPosts.title" />
        </h1>
      </div>
      <Blog PostsList currentPage={page} canCreate={true} />
    </div>
  )
}
