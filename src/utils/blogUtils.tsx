import * as React from "react"
import ogs from "open-graph-scraper"

export const LinkBox = ({ urlValue }) => {
  // const ogs = require("open-graph-scraper")
  // const options = { url: `http://ogp.me/` }
  // ogs(options).then(data => {
  //   const { error, result, response } = data
  //   console.log("error:", error) // This returns true or false. True if there was an error. The error itself is inside the results object.
  //   console.log("result:", result) // This contains all of the Open Graph results
  //   console.log("response:", response) // This contains the HTML of page
  // })

  return <div>{urlValue}</div>
}

export const Code = ({ language = "text", children }) => {
  return <code className={`language-` + language}>{children}</code>
}

export const textHighlightBlue = {
  backgroundColor: `#aff0ef`,
  padding: `3px`,
  borderRadius: `3px`,
}
