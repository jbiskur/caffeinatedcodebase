import { type PropsWithChildren, useEffect } from "react"
import { type Resolver, useForm } from "react-hook-form"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Translated } from "@/components/ui/translation/translated"
import { useTranslation } from "@/components/ui/translation/use-translation"
import { type Blog Post } from "@/contracts/blogPosts/blogPost"
import { cn } from "@/lib/utils"

export type Blog PostFormProps = {
  value ?: Blog Post
    onSubmit: (value: Blog Post) => void
      className ?: string
  resolver: Resolver <Blog Post>
}

export function Blog PostForm(props: PropsWithChildren <Blog PostFormProps >) {
  const { translator } = useTranslation()

  const form = useForm <Blog Post> ({
    resolver: props.resolver,
    defaultValues: {
      id: props.value?.id,
    },
  })

  useEffect(() => {
    if (props.value) {
      form.reset(props.value)
    }
  }, [form, props.value])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)}>
        <div className={cn("space-y-6 overflow-y-auto px-1", props.className)}>

          
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Translated path="blogPosts.blogPost.name" />
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={translator("blogPosts.blogPost.name.placeholderText")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          

        </div>
        <div className="mt-5 flex w-[100] justify-end gap-x-4">{props.children}</div>
      </form>
    </Form>
  )
}