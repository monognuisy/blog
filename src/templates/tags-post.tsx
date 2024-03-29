import React from "react"
import PropTypes from "prop-types"
// Components
import { Link, graphql } from "gatsby"
import { blogFooter, blogHeader } from "../components/staticObjects"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  return (
    <div className="most-outer-wrapper">
      {blogHeader}
      <div className="global-wrapper" data-is-root-path={true}>
        <main>
          
          <h1 style={{
            gridColumn: `1 / 3`,
          }}>{tagHeader}</h1>
          <ol style={{
            gridColumn: `1 / 3`, 
            listStyle: `none`
          }}>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const { title } = node.frontmatter
              console.log(node)
              return (
                <li key={slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={slug} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{node.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: node.frontmatter.description || node.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
          {/*
                  This links to a page that does not yet exist.
                  You'll come back to it!
                */}
          <Link to="/tags">↑ All tags</Link>
        </main>
      </div>
      {blogFooter}
    </div>
  )
}
Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`
