import { useCallback, useMemo, useState } from "react"

import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Translated } from "@/components/ui/translation/translated"

import ConfirmDialog, { type ConfirmDialogProps } from "./confirm.dialog"

export type ValidateConfirmDialogProps = {
  matchValue: string
} & ConfirmDialogProps

export default function ConfirmInputDialog({ matchValue, onConfirm, ...props }: ValidateConfirmDialogProps) {
  const [value, setValue] = useState("")

  const enabled = useMemo(() => value === matchValue, [matchValue, value])

  const onValueChanged = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  const onConfirmInterceptor = useCallback(async () => {
    await onConfirm().finally(() => {
      setValue("")
    })
  }, [onConfirm])

  return (
    <ConfirmDialog
      {...props}
      onConfirm={onConfirmInterceptor}
      disabled={!enabled}
      content={
        <FormItem>
          <FormLabel>
            <Translated path={"validation.match.description"} params={{ value: matchValue }} />
          </FormLabel>
          <FormControl>
            <Input placeholder={matchValue} value={value} onChange={(e) => onValueChanged(e.target.value)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      }
    />
  )
}
