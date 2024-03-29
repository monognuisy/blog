import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Utterances from "../components/Utterances"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import "katex/dist/katex.min.css"
import TagBox from "../components/tag"
import Sidenotes from "../components/sidenotes"
import Toc from "../components/toc"

const BlogPostTemplate = ({ data, location, children }: any) => {
  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const tags = post.frontmatter.tags
  const sidenotes = post.frontmatter.sidenotes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Toc />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `flex-start`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            {tags.map(tag => (
              <li key={tag} style={{ marginRight: `1rem` }}>
                <TagBox tagName={tag} />
              </li>
            ))}
          </ul>
        </header>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
        <section itemProp="articleBody">{children}</section>
        <hr />
        {/* <footer>
          <Bio />
        </footer> */}
      </article>
      <Sidenotes sidenotesRecord={sidenotes} />
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
      <Utterances repo='monognuisy/blog' theme='github-light' />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        sidenotes {
          id
          content
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
