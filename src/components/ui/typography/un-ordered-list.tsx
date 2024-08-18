import { FC, PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export const Ul: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <ul className={twMerge("my-6 ml-6 list-disc [&>li]:mt-2 text-primary", className)}>
      {children}
    </ul>
  )
}

export const Li: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return <li className={className}>{children}</li>
}