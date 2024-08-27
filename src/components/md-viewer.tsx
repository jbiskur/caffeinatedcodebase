"use client"
import MarkdownView from "@uiw/react-markdown-preview"
import type { Components } from "react-markdown"
import remarkGfm from "remark-gfm"

import { cn } from "@/lib/utils"
import { Blockquote, H1, H2, H3, H4, Li, P, Ul } from "./ui/typography"

export const markdownComponents: Components = {
  h1: (props) => (
    <H1 className="!scroll-m-20 !text-4xl !font-extrabold !tracking-tight !lg:text-5xl !mb-0">{props.children}</H1>
  ),
  h2: (props) => (
    <H2 className="!scroll-m-20 !text-3xl !font-extrabold !tracking-tight !lg:text-4xl !mb-0 !mt-6">
      {props.children}
    </H2>
  ),
  h3: (props) => (
    <H3 className="!scroll-m-20 !text-2xl !font-extrabold !tracking-tight !lg:text-3xl !mb-0">{props.children}</H3>
  ),
  h4: (props) => (
    <H4 className="!scroll-m-20 !text-xl !font-extrabold !tracking-tight !lg:text-2xl !mb-0">{props.children}</H4>
  ),
  p: (props) => <P className="!leading-7 [&:not(:first-child)]:!mt-6 !text-primary !m-0 !p-0">{props.children}</P>,
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
    <div className={cn("markdown-body mt-2", className)}>
      <MarkdownView
        className="[&_h1]:!border-none [&_h2]:!border-none [&_h3]:!border-none [&_h4]:!border-none"
        source={source}
        style={espressoMarkdownStyles}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[]}
        components={markdownComponents}
      />
    </div>
  )
}
