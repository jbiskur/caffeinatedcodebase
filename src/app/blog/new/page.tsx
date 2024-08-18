"use client"

import { useAuth } from "@clerk/nextjs"
// import Markdown from "react-markdown"
import Loading from "../../loading"
import MDEditorComponent from "../editor.component"

// import remarkGfm from "remark-gfm"

const markdown = `
Hello **world**!
`

export default function NewBlogPage() {
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) return <Loading />

  if (!userId) {
    return <div>You are not authorized to view this page.</div>
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown> */}
      <MDEditorComponent markdown={markdown} />
    </div>
  )
}
