import { FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export const P: FC<PropsWithChildren & { className?:string }> = ({ children, className }) => {
  return (
    <p className={twMerge("leading-7 [&:not(:first-child)]:mt-6 text-primary", className)}>
      {children}
    </p>
  )
}