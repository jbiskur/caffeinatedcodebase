import { FC, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";


export const H4: FC<PropsWithChildren & { className?:string }> = ({ children, className }) => {
  return (
    <h4 className={twMerge("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  )
}
