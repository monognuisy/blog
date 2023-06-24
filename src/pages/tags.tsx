import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import TagBox from "../components/tag"
import { blogHeader } from "../components/staticObjects"

const TagsPage = ({
  data: {
    allMdx: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div className="most-outer-wrapper">
    {blogHeader}
    <div className="global-wrapper" data-is-root-path={true}>
      <main>
        <h1>All Tags.</h1>
        <ul 
          style={{
            gridColumn: `1 / 3`,
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `flex-start`,
            listStyle: `none`,
            padding: 0,
          }}>
          {group.map(tag => (
            <li key={tag.fieldValue} 
              style={{ 
                marginRight: `1rem`,
                marginBottom: `2rem`
              }}>
              <TagBox tagName={tag.fieldValue} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  </div>
)
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}
export default TagsPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`