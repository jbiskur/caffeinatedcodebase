import {type FC, type PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


export const H1: FC<PropsWithChildren & { className?:string }> = ({ children, className }) => {
  return (
    <h1 className={twMerge("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  )
}
