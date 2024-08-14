import { useRouter } from "next/navigation"
import { type FC } from "react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Translated } from "../../../components/ui/translation/translated"
import { type BlogPost } from "../../../contracts/blog-posts/blog-post"

export const BlogPostCard: FC<{
  blogPost: BlogPost
}> = ({ blogPost }) => {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blogPost.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{blogPost.createdAt}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => void router.push(`/blog-posts/${blogPost?.id}`)}>
          <Translated path={"button.view"} />
        </Button>
      </CardFooter>
    </Card>
  )
}
