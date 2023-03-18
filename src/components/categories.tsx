import React, { FC } from "react"
import { graphql, PageProps } from "gatsby"
// import { CategoriesQuery } from "graphql-types"

// type CategoriesQuery = { site?: { siteMetadata?: { title?: string | null } | null } | null, allMarkdownRemark: { nodes: Array<{ excerpt?: string | null, fields?: { slug?: string | null } | null, frontmatter?: { date?: any | null, title?: string | null, description?: string | null, categories?: string | null } | null }>, group: Array<{ fieldValue?: string | null, totalCount: number, edges: Array<{ node: { id: string } }> }> } };
// Catefories:FC<PageProps<CategoriesQuery>>

const Categories = ({ data, onChangeCategory, filteredCategory }) => {
  const group = data.allMdx.nodes
  const categorySet:Set<string> = new Set()
  group.forEach(prop => {
    categorySet.add(prop.frontmatter.categories)
  });

  const clickHandler = (event) => {
    onChangeCategory(event.target.innerText)
  }
  return (
    <div className="category-wrapper">
      <hr/>
      <h2>Categories</h2>
      <ol className="category-box">
        <li
          key={"All"}
          className="categories"
          onClick={clickHandler}
          onKeyPress={clickHandler}
          role="presentation"
          is-selected={(`All` === filteredCategory).toString()}
        >
          All
        </li>
        {[...categorySet].map((fieldValue: string) => {
          // const fieldValue = prop.frontmatter.categories
          return (
            <li
              key={fieldValue}
              className="categories"
              onClick={clickHandler}
              onKeyPress={clickHandler}
              role="presentation"
              is-selected={(fieldValue === filteredCategory).toString()}
            >
              {fieldValue}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
export default Categories

export const pageQuery = graphql`
  query Categories {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
          categories
        }
      }
      group(field: frontmatter___categories) {
        edges {
          node {
            id
          }
        }
        fieldValue
        totalCount
      }
    }
  }
`