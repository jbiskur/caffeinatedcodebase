import { FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export const Blockquote: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <blockquote className={twMerge("mt-6 border-l-2 pl-6 italic text-muted-foreground", className)}>
      {children}
    </blockquote>
  )
}