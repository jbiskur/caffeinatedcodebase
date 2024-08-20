"use client"
import MarkdownView from "@uiw/react-markdown-preview"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { Blockquote, H1, H2, H3, H4, Li, P, Ul } from "./ui/typography"

export const markdownComponents: Components = {
  a: (props) => (
    <Link className="!text-primary !underline" href={props.href ?? "#"}>
      {props.children}
    </Link>
  ),
  h1: (props) => <H1>{props.children}</H1>,
  h2: (props) => <H2>{props.children}</H2>,
  h3: (props) => <H3>{props.children}</H3>,
  h4: (props) => <H4>{props.children}</H4>,
  p: (props) => <P>{props.children}</P>,
  li: (props) => <Li>{props.children}</Li>,
  ul: (props) => <Ul>{props.children}</Ul>,
  blockquote: (props) => <Blockquote className="!border-muted !border-l-2">{props.children}</Blockquote>,
}

const espressoMarkdownStyles = {
  background: "transparent",
}

export default function MarkdownViewer({
  source,
  className,
}: {
  source: string
  className?: string
}) {
  return (
    <div className={cn("markdown-body", className)}>
      <MarkdownView
        source={source}
        style={espressoMarkdownStyles}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[]}
        components={markdownComponents}
      />
    </div>
  )
}
