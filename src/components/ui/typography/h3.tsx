import {FC, type PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


export const H3: FC<PropsWithChildren & { className?:string }> = ({ children, className }) => {
  return (
    <h3 className={twMerge("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}
