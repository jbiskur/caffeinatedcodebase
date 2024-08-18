import dynamic from "next/dynamic"
import { useState } from "react"

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

export default function MDEditorComponent({ markdown }: { markdown: string }) {
  const [value, setValue] = useState(markdown)
  return (
    <div>
      <MDEditor value={value} onChange={(value) => setValue(value || "")} />
    </div>
  )
}
