import * as React from "react"
import { Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { blogHeader, blogFooter } from "./staticObjects"

import Bio from "../components/bio"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const Layout = ({ location, title, children }: any) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="most-outer-wrapper">
      {blogHeader}
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        {/* {!isRootPath && <div className="table-of-contents"></div>} */}
        <main>
          {children}
          <Bio />
        </main>
        {/* {!isRootPath && <div className="sidenote-wrapper"></div>} */}
      </div>
      {blogFooter}
    </div>
  )
}

export default Layout
