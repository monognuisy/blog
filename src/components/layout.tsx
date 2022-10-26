import * as React from "react"
import { Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader"
deckDeckGoHighlightElement()

const Layout = ({ location, title, children }: any) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  header = (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  )

  return (
    <div className="most-outer-wrapper">
      <hr className="gh-hr hr-1"/>
      <hr className="gh-hr hr-2"/>
      <header className="global-header">
        <div className="gh-inner">
          <div className="gh-inner-brand">
            <Link className="gh-inner-logo" to="/">
            <StaticImage
              className="logo-avatar"
              // layout="fixed" 
              formats={["auto", "webp", "avif"]}
              src="../images/logo_trans_squareBlue.webp"
              width={50}
              height={50}
              quality={100}
              alt="Profile picture"
            />
            </Link>
          </div>
          <nav className="gh-inner-menus">
            <ul className="nav">
              <li className="nav-home">HOME</li>
              <li className="nav-about">ABOUT</li>
              <li className="nav-donation">DONATION</li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        {/* <header className="global-header">{header}</header> */}
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, monognuisy, All Rights Reserved.
        </footer>
      </div>
    </div>
  )
}

export default Layout
