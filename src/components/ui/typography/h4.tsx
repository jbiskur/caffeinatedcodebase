import {type PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


export function TypographyH4({ className, children }: PropsWithChildren & HTMLElement) {
  return (
    <h4 className={twMerge("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  )
}
