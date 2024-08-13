import {type PropsWithChildren} from "react";
import {twMerge} from "tailwind-merge";


export function TypographyH3({ className, children }: PropsWithChildren & HTMLElement) {
  return (
    <h3 className={twMerge("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}
