import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase"
import tagColor from "../utils/tagColor";


const TagBox = ({ tagName }) => {
  return (
      <Link style={{
        border: `none`,
        borderRadius: `24px`,
        padding: `0.5rem 1rem`,
        boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
        color: `black`,
        backgroundColor: tagColor(tagName),
        textDecoration: `none`,
      }} to={`/tags/${kebabCase(tagName)}/`}>{tagName}</Link>
  )
};

export default TagBox;