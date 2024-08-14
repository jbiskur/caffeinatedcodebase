"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { type ReactNode, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type BlogPost } from "@/contracts/blog-posts/blog-post"
import { type UpdateBlogPost, updateBlogPostSchema } from "@/contracts/blog-posts/mutate-blog-posts"
import { type Translations } from "@/types/translations"

export interface EditBlogPostDialogDialogProps {
  children: ReactNode
  blogPost: BlogPost
  onDone: <TData = unknown>(input: { data?: TData; success: boolean }) => void
}

export default function EditBlogPostDialog({ children, onDone, blogPost }: EditBlogPostDialogDialogProps) {
  const [opened, setOpened] = useState(false)
  const form = useForm<BlogPost>({
    resolver: zodResolver(updateBlogPostSchema),
    defaultValues: {
      id: blogPost.id,
    },
  })

  const { translator } = useTranslation()

  const onSubmit: SubmitHandler<UpdateBlogPost> = async (data) => {
    try {
      onDone({
        ...data,
        success: false,
      })
      setOpened(false)
    } catch (_error) {
      onDone({
        ...data,
        success: false,
      })
      setOpened(false)
    }
  }

  const shownFields: {
    name: keyof BlogPost
    label: keyof Translations
    description: keyof Translations
    placeholder: keyof Translations
    type: "input" | "select"
    values?: { label: string; value: string }[]
  }[] = []

  return (
    <Dialog
      open={opened}
      onOpenChange={(open) => {
        setOpened(open)
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                <Translated path={"blogPosts.blogPost.update.title"} />
              </DialogTitle>
              <DialogDescription>
                <Translated path={"blogPosts.blogPost.update.description"} />
              </DialogDescription>
            </DialogHeader>
            <div className="my-4 space-y-4">
              {shownFields.map((shownField) =>
                shownField.type === "input" ? (
                  <FormField
                    key={shownField.name}
                    control={form.control}
                    name={shownField.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Translated path={shownField.label} />
                        </FormLabel>
                        <FormDescription>
                          <Translated path={shownField.description} />
                        </FormDescription>
                        <FormControl>
                          <Input placeholder={translator(shownField.placeholder)} {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    key={shownField.name}
                    control={form.control}
                    name={shownField.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <Translated path={shownField.label} />
                        </FormLabel>
                        <FormDescription>
                          <Translated path={shownField.description} />
                        </FormDescription>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={Array.isArray(field.value) ? field.value[0] : field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder={shownField.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {shownField.values?.map((value) => (
                                <SelectItem key={value.value} value={value.value}>
                                  {value.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                ),
              )}
            </div>
            <DialogFooter>
              <Button type={"submit"} disabled={true}>
                <Translated path={"blogPosts.blogPost.update.button"} />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
