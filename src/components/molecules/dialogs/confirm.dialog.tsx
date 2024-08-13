import { Loader2Icon } from "lucide-react"
import { type ReactNode, useCallback, useMemo, useState } from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Translated } from "@/components/ui/translation/translated"

export interface ConfirmDialogProps {
  children: ReactNode
  title: string
  description: string
  content?: ReactNode
  disabled?: boolean
  onConfirm: () => Promise<void>
}

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const canConfirm = useMemo(() => !loading && !props.disabled, [loading, props.disabled])

  const confirm = useCallback(async () => {
    setLoading(true)
    await props.onConfirm().finally(() => setLoading(false))
    setOpen(false)
  }, [props])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{props.children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        {props.content && <div>{props.content}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            <Translated path={"button.cancel"} />
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!canConfirm}
            onClick={async (e) => {
              e.preventDefault()
              await confirm()
            }}
          >
            {loading && (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              </>
            )}
            <Translated path={"button.confirm"} />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
