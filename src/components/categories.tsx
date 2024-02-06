import React from "react"
import { graphql } from "gatsby"

const Categories = ({ data, onChangeCategory, filteredCategory }) => {
  const group = data.allMdx.nodes
  const categorySet: Set<string> = new Set()
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
        {Array.from(categorySet).sort().map((fieldValue: string) => {
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