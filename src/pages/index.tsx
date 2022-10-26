import * as React from "react"
import { Link, graphql, useStaticQuery, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

interface PostNode {
  excerpt: string
  fields: {
    slug: string
  }
  frontmatter: {
    date: string
    title: string
    description: string
    tags: string[]
  }
}

interface BlogIndexQueryData {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    nodes: PostNode[]
  }
}

const BlogIndex = ({ location }: PageProps) => {
  const data: BlogIndexQueryData = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. 
        </p>
      </Layout>
    )
  }
  
  const firstElement = posts[0];
  const firstTitle = firstElement.frontmatter.title || firstElement.fields.slug

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="article-first">
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <header>
            <h1>
              <Link to={firstElement.fields.slug} itemProp="url">
                <span itemProp="headline">{firstTitle}</span>
              </Link>
            </h1>
            <small><span className="text-accent">Latest Post</span> - {firstElement.frontmatter.date}</small>
          </header>
          <section>
            <p
              dangerouslySetInnerHTML={{
                __html: firstElement.frontmatter.description || firstElement.excerpt,
              }}
              itemProp="description"
            />
          </section>
        </article>
      </div>
      <ol style={{ listStyle: `none` }}>
        <hr/>
        {posts.slice(1).map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <Bio />
    </Layout>
  )
}

export default BlogIndex
