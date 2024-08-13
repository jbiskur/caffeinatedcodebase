import { Check, ChevronDown, CircleX } from "lucide-react"
import { type ReactNode, useEffect, useRef, useState, PropsWithChildren } from "react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface ComboBoxOption {
  onSelect?: (value: string, option: ComboBoxOption) => void
  label?: string | ReactNode
  value: string
}

export interface ComboBoxProps<T extends ComboBoxOption = ComboBoxOption> {
  value: string | undefined
  valueLabel?: string | ReactNode
  placeholder?: string | ReactNode
  searchPlaceholder?: string
  emptyPlaceholder?: string | ReactNode
  onChange?: (value?: string, option?: T) => void
  options: T[]
  query?: string
  onQueryChange?: (value: string) => void
  filter?: (value: string, search: string) => number
  clearable?: boolean
  disabled?: boolean
  className?: string
}

export function ComboBox<T extends ComboBoxOption = ComboBoxOption>({
  value,
  valueLabel,
  onChange,
  onQueryChange,
  placeholder,
  options,
  emptyPlaceholder,
  searchPlaceholder,
  filter,
  clearable,
  disabled,
  className,
  children,
}: PropsWithChildren<ComboBoxProps<T>>) {
  const timeout = useRef<NodeJS.Timeout>()
  const [query, setQuery] = useState<string>("")
  const [doQuery, setDoQuery] = useState<string>("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current)
    }
  }, [])

  useEffect(() => {
    clearTimeout(timeout.current)
    if (!query.trim() || !onQueryChange) {
      setDoQuery("")
      onQueryChange?.("")
      return
    }
    timeout.current = setTimeout(() => {
      onQueryChange(query.trim())
      setDoQuery(query.trim())
    }, 1000)
  }, [onQueryChange, query])

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(className, "relative flex items-center justify-start")}>
            {clearable && value && (
              <CircleX
                size={16}
                className="mr-2 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onChange?.()
                }}
              />
            )}
            <div className="flex flex-1 text-left">
              {value ? <>{valueLabel ?? value}</> : <div className="opacity-50">{placeholder ?? "Select..."}</div>}
            </div>
            <ChevronDown size={14} className="ml-2 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="popover-content-width-same-as-its-trigger p-0">
          <Command filter={filter ? filter : () => 1} loop>
            <CommandInput placeholder={searchPlaceholder ?? "Search"} value={query} onValueChange={setQuery} />
            {doQuery && <CommandEmpty>{emptyPlaceholder ?? "No results"}</CommandEmpty>}
            <CommandList>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(_currentValue) => {
                      // note: do not use currentValue, as currentValue is converted to all lowercase strings for some reason
                      // https://github.com/pacocoursey/cmdk/issues/150#issuecomment-1794307161
                      setOpen(false)
                      if (option.onSelect) {
                        option.onSelect(option.value, option)
                        return
                      }
                      onChange?.(option.value, option)
                    }}>
                    {option.label ?? option.value}
                    <Check size={14} className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            {children}
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
