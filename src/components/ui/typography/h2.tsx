import {FC, type PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


export const H2: FC<PropsWithChildren & { className?:string }> = ({ children, className }) => {
  return (
    <h2 className={twMerge("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  )
}
