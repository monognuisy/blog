import * as React from "react"
import { useState } from "react"
import { Link, graphql, useStaticQuery, PageProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Categories from "../components/categories"

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

type CategoriesQuery = { site?: { siteMetadata?: { title?: string | null } | null } | null, allMarkdownRemark: { nodes: Array<{ excerpt?: string | null, fields?: { slug?: string | null } | null, frontmatter?: { date?: any | null, title?: string | null, description?: string | null, categories?: string | null } | null }>, group: Array<{ fieldValue?: string | null, totalCount: number, edges: Array<{ node: { id: string } }> }> } };

const BlogIndex = ({ location }: PageProps) => {
  const data: CategoriesQuery = useStaticQuery(graphql`
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
            categories
          }
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const [filteredCategory, setFilteredCategory] = useState('All')
  const filteredCategoryHandler = (selected) => {
    setFilteredCategory(selected)
  }

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

  if (filteredCategory === `All`) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
          {postLists(posts)}
        <Categories data={data} onChangeCategory={filteredCategoryHandler} />
      </Layout>
    )
  } 
  else {
    const filteredPosts = posts.filter(post => (post.frontmatter.categories === filteredCategory))
    const seoTitle = `Posts in ${filteredCategory}`
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={seoTitle} />
          {postLists(filteredPosts)}
        <Categories data={data} onChangeCategory={filteredCategoryHandler} />
      </Layout>
    )
  }
}

const postLists = (posts) => {
  const firstElement = posts[0];
  const firstTitle = firstElement.frontmatter.title || firstElement.fields.slug

  return (
    <>
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
            <small><span className="text-accent">Latest Post</span> in <b>{firstElement.frontmatter.categories}</b> - {firstElement.frontmatter.date}</small>
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
      <ol className="other-posts" style={{ listStyle: `none` }}>
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
                  <small>in <b>{post.frontmatter.categories}</b> - {post.frontmatter.date}</small>
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
    </>
  )
}

export default BlogIndex
