import { useRouter } from "next/navigation"
import { type FC } from "react"

import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { SocialSecurityNumber } from "../../../components/ui/social-security-number"
import { Translated } from "../../../components/ui/translation/translated"
import { type Blog Post } from "../../../contracts/blogPosts/blogPost"

export const Blog PostCard: FC<{
  blogPost: Blog Post
}> = ({ blogPost }) => {
  const router = useRouter()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blogPost.firstName + " " + blogPost.lastName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <SocialSecurityNumber socialSecurityNumber={blogPost.socialSecurity} />
        </p>
        <p>{blogPost.city}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => void router.push(`/blogPosts/${blogPost?.id}`)}>
          <Translated path={"button.view"} />
        </Button>
      </CardFooter>
    </Card>
  )
}
