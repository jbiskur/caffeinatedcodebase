import React, { type HTMLProps, type PropsWithChildren, type ReactNode } from "react"
import { useWizard } from "react-use-wizard"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type WizardContainer = HTMLProps<HTMLDivElement>

export function WizardContainer({ className, ...props }: WizardContainer) {
  return <div className={cn("flex flex-col gap-y-4", className)} {...props} />
}

export function WizardControls({ children }: PropsWithChildren) {
  return <div className="flex w-[100%] justify-end gap-x-3">{children}</div>
}

export function WizardPrevious(props: PropsWithChildren<ButtonProps>) {
  const { previousStep, isFirstStep } = useWizard()

  return <Button type="reset" variant="secondary" disabled={isFirstStep} onClick={previousStep} {...props} />
}

export type WizardNextProps = {
  asForm?: boolean
} & ButtonProps

export function WizardNext({ asForm, ...props }: PropsWithChildren<WizardNextProps>) {
  const { nextStep } = useWizard()

  if (asForm) {
    return <Button type="submit" {...props} />
  }

  return <Button onClick={nextStep} {...props} />
}

export type WizardStepsProps = {
  titles: (string | ReactNode)[]
} & React.HTMLProps<HTMLUListElement>

export function WizardSteps({ titles, className, ...props }: WizardStepsProps) {
  const { stepCount, activeStep, goToStep } = useWizard()

  return (
    <ul className={cn("flex flex-wrap justify-evenly py-2", className)} {...props}>
      {Array.from({ length: stepCount }).map((_, index) => (
        <li key={index}>
          <Button
            onClick={() => goToStep(index)}
            variant={"ghost"}
            className="rounded-full"
            disabled={activeStep < index}
          >
            <div
              className={cn(
                "rounded-full px-2",
                activeStep === index ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
              )}
            >
              {index + 1}
            </div>
            <div>{titles[index]}</div>
          </Button>
        </li>
      ))}
    </ul>
  )
}
