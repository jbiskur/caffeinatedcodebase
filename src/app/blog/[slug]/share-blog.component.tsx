"use client"
import { BlogPost } from "@/contracts/blog-posts/blog-post"
import { faFacebook, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton } from "react-share"

export const ShareBlog: React.FC<{ blogPost: BlogPost; siteUrl: string }> = ({ blogPost, siteUrl }) => {
  const url = `${siteUrl}/blog/${blogPost.slug}`

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <TwitterShareButton title={`${blogPost.title}`} url={url}>
        <FontAwesomeIcon icon={faTwitter} className="w-5 h-5" />
        <span className="sr-only">Share on Twitter</span>
      </TwitterShareButton>
      <FacebookShareButton title={`${blogPost.title}`} url={url}>
        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
        <span className="sr-only">Share on Facebook</span>
      </FacebookShareButton>
      <LinkedinShareButton title={`${blogPost.title}`} summary={blogPost.summary} source={siteUrl} url={url}>
        <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
        <span className="sr-only">Share on LinkedIn</span>
      </LinkedinShareButton>
    </div>
  )
}
