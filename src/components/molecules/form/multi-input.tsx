import { CirclePlusIcon, CircleXIcon } from "lucide-react"
import React, { type PropsWithChildren, useCallback, useContext, useMemo } from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { useFormField } from "@/components/ui/form"
import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type MultiInputControl = {
  addInput: () => void
  removeInput: (itemId: number) => void
  updateInput: (itemId: number, value: string) => void
}

export type MultiInputProps = Omit<InputProps, "value"> &
  PropsWithChildren<{
    value: undefined | string[]
    onChange: (values: string[]) => void
    renderItems: (props: { value: string; itemId: number }) => React.ReactNode
  }>

export const MultiInputContext = React.createContext<MultiInputControl>({
  addInput: () => {
    throw new Error("MultiInputControl is not provided")
  },
  removeInput: () => {
    throw new Error("MultiInputControl is not provided")
  },
  updateInput: () => {
    throw new Error("MultiInputControl is not provided")
  },
})

const MultiInput = React.forwardRef<HTMLInputElement, MultiInputProps>(
  ({ value: values = [], onChange, className, children, ...props }, ref) => {
    const updateInput = useCallback(
      (index: number, value: string) => {
        const newValues = [...values]
        newValues[index] = value
        onChange(newValues)
      },
      [onChange, values],
    )

    const addInput = useCallback(() => {
      onChange([...values, ""])
    }, [onChange, values])

    const removeInput = useCallback(
      (index: number) => {
        if (values.length === 1) {
          onChange([])
          return
        }

        const newValues = [...values]
        newValues.splice(index, 1)
        onChange(newValues)
      },
      [onChange, values],
    )

    return (
      <MultiInputContext.Provider value={{ addInput, removeInput, updateInput }}>
        <div ref={ref} className={cn("flex flex-col justify-start gap-y-2", className)}>
          {values.map((value, index) => (
            <div key={index}>{props.renderItems({ value, itemId: index })}</div>
          ))}
          <div>{children}</div>
        </div>
      </MultiInputContext.Provider>
    )
  },
)

MultiInput.displayName = "MultiInput"

export type MultiInputItemProps = {
  itemId: number
} & InputProps

const MultiInputItem = React.forwardRef<HTMLInputElement, MultiInputItemProps>(({ itemId, ...props }, ref) => {
  const controls = useContext(MultiInputContext)

  return (
    <div className="flex items-center">
      <Input ref={ref} onChange={(e) => controls.updateInput(itemId, e.target.value)} {...props} />
      <Button type="button" onClick={() => controls.removeInput(itemId)} variant={"ghost"} size={"sm"}>
        <CircleXIcon />
      </Button>
    </div>
  )
})

MultiInputItem.displayName = "MultiInputItem"

const MultiInputAddItem = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const controls = useContext(MultiInputContext)

  return (
    <Button
      ref={ref}
      type="button"
      onClick={controls.addInput}
      variant="ghost"
      size="sm"
      {...props}
      rhs={<CirclePlusIcon />}
    />
  )
})

MultiInputAddItem.displayName = "MultiInputAddItem"

export type MultiInputMessageProps = {
  itemId: number
  className?: string
}

function MultiInputMessage({ className, itemId }: MultiInputMessageProps) {
  const field = useFormField()

  const errorMessage = useMemo<string | null>(() => {
    if (!field) {
      return null
    }

    const errorAsList = field.error as unknown as { message: string }[]
    if (!errorAsList) {
      return null
    }

    const message = errorAsList[itemId]?.message

    if (!message) {
      return null
    }

    return message
  }, [field, itemId])

  return <p className={cn("text-[0.8rem] font-medium text-destructive", className)}>{errorMessage}</p>
}

MultiInputMessage.displayName = "MultiInputMessage"

export { MultiInput, MultiInputAddItem, MultiInputItem, MultiInputMessage }
