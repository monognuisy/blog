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
            <li className="nav-home">
              <Link to="/">HOME</Link>
            </li>
            <li className="nav-about">
              <a href="https://monognuisy.github.io/">ABOUT</a>
            </li>
            <li className="nav-donation">
              <a href="https://toss.me/monognuisy/3000">DONATION</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
);

export const blogFooter = (
  <footer className="gh-footer-wrapper">
    <ul className="gh-footer">
      <li className="gh-footer-items gh-footer-copyright">
        © {new Date().getFullYear()} monognuisy
      </li>
      <li className="gh-footer-items gh-footer-contact">
        <a href="mailto:ysmsmart1@gmail.com">Contact</a>
      </li>
      <li className="gh-footer-items gh-footer-source">
        <a href="https://github.com/monognuisy/blog">Site source</a>
      </li>
    </ul>
  </footer>
)
