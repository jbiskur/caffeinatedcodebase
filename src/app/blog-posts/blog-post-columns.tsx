"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { type ReactNode } from "react"

import { Translated } from "@/components/ui/translation/translated"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { type Translations } from "@/types/translations"

const translatedColumn = (columnId: string) => <Translated path={`blogPosts.blogPost.${columnId}` as keyof Translations} />

export type Blog PostColumnsInput = {
  onEdit?: (area: Blog Post) => ReactNode
  onArchive?: (area: Blog Post) => ReactNode
}

export const blogPostColumns: (input?: Blog PostColumnsInput) => ColumnDef<Blog Post>[] = (input) => {
  const cell = ({ row }: { row: { original: Blog Post } }) => {
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
