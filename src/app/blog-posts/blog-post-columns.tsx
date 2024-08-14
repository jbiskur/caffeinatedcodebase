"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type ReactNode } from "react"

import { Translated } from "@/components/ui/translation/translated"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { type Translations } from "@/types/translations"

const translatedColumn = (columnId: string) => <Translated path={`blogPosts.blogPost.${columnId}` as keyof Translations} />

export type BlogPostColumnsInput = {
  onEdit?: (area: BlogPost) => ReactNode
  onArchive?: (area: BlogPost) => ReactNode
}

export const blogPostColumns: (input?: BlogPostColumnsInput) => ColumnDef<BlogPost>[] = (input) => {
  const cell = ({ row }: { row: { original: BlogPost } }) => {
    return (
      <div style={{ textAlign: "right" }}>
        {input?.onEdit?.(row.original)}
        {input?.onArchive?.(row.original)}
      </div>
    )
  }

  return [
    
    { accessorKey: "name", header: () => translatedColumn("name"), },
    
    {
      accessorKey: "createdAt",
      header: () => translatedColumn("createdAt"),
    },
    ...(input && (input.onArchive ?? input.onEdit)
      ? [
          {
            header: () => <span style={{ textAlign: "right", display: "block" }}></span>,
            accessorKey: "actions",
            enableHiding: false,
            enableSorting: false,
            cell,
          },
        ]
      : []),
  ]
}
