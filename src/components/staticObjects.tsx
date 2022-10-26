import * as React from "react"
import { Link, PageProps } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

export const blogHeader = (
  <div>
    <hr className="gh-hr hr-1"/>
    <hr className="gh-hr hr-2"/>
    <header className="global-header">
      <div className="gh-inner">
        <div className="gh-inner-brand">
          <Link className="gh-inner-logo" to="/">
          <StaticImage
            className="logo-avatar"
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
  </div>
);

export const blogFooter = (
  <footer className="gh-footer-wrapper">
    <div className="gh-footer">
      <p className="gh-footer-items gh-footer-copyright">
        © {new Date().getFullYear()}. monognuisy. <br/> All Rights Reserved.
      </p>
      <p className="gh-footer-items gh-footer-contact">
        Contact
      </p>
      <p className="gh-footer-items gh-footer-source">
        Site source
      </p>
    </div>
  </footer>
)
