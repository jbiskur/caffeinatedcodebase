import { type SelectItemProps } from "@radix-ui/react-select"
import { type ReactNode, useCallback, useMemo } from "react"

import { SelectItem } from "@/components/ui/select"

export type EnumSelectItemsProps<TEnum extends object> = {
  enumObject: TEnum
  map?: Partial<Record<keyof TEnum, ReactNode>>
} & Omit<SelectItemProps, "value">

export const EnumSelectItems = <TEnum extends object>({ enumObject, map, ...props }: EnumSelectItemsProps<TEnum>) => {
  const enumKeys = useMemo(() => {
    const keys = Object.keys(enumObject) as (keyof TEnum)[]

    if (!map) {
      return keys
    }

    return keys.filter((key) => map[key])
  }, [enumObject, map])

  const getValue = useCallback(
    (key: keyof TEnum): string => {
      const value = enumObject[key]
      if (!value) {
        return "undefined"
      }

      return value.toString()
    },
    [enumObject],
  )

  return enumKeys.map((key) => {
    const keyString = key.toString()
    return (
      <SelectItem key={keyString} value={getValue(key)} {...props}>
        {map ? map[key] : keyString}
      </SelectItem>
    )
  })
}
