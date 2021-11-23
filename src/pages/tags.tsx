import React from "react"
import PropTypes from "prop-types"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import TagBox from "../components/tag"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <div className="global-wrapper">
    <Helmet title={title} />
    <Link className="header-link-home" to="/">
        {title}
    </Link>
    <div>
      <h1>All Tags.</h1>
      <ul 
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `flex-start`,
          listStyle: `none`,
          padding: 0,
        }}>
        {group.map(tag => (
          <li key={tag.fieldValue} style={{ marginRight: `1rem` }}>
            <TagBox tagName={tag.fieldValue} />
          </li>
        ))}
      </ul>
    </div>
  </div>
)
TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
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
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`