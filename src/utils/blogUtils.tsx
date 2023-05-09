import * as React from "react"
import ogs from "open-graph-scraper"

import { useEffect, useState } from "react"
import { Link } from "gatsby"

export const LinkBox = ({ urlValue }) => {
  return <div>{urlValue}</div>
}

export const Code = ({ language = "text", children }) => {
  return <code className={`language-` + language}>{children}</code>
}

export const Highlight = ({ color = textHighlightBlue, children}) => {
  return <span style={color}>{children}</span>
}

export const Sidenote = ({ id, children }) => {
  const [onhover, setOnhover] = useState(false);
  const [sideElement, setSideElement] = useState(null);

  useEffect(() => {
    const sidekey = `sn-ref-${id}`
    const docElement = document.querySelector(`#${sidekey}`)

    setSideElement(() => docElement)
  }, [onhover])

  const mouseEnter = () => {
    setOnhover(() => true);

    if (sideElement) sideElement.style.backgroundColor = `#eeeeee`
  }

  const mouseLeave = () => {
    setOnhover(() => false);

    if (sideElement) sideElement.style.backgroundColor = `#ffffff`
  }

  const sidenoteStyle = {
    backgroundColor: onhover ? `#ffdc5c` :`#fff9db`,
    padding: `3px`,
    borderRadius: `3px`,
    textDecoration: `none`,
    color: `#2e353f`,
  }
  

  return (
    <Link 
      to={`./#sn-ref-${id}`}
      id={`sn-${id}`} 
      style={sidenoteStyle} 
      onMouseEnter={mouseEnter} 
      onMouseLeave={mouseLeave}
    >
      <span >
        {children}
      </span>
    </Link>
  )
}

export const textHighlightBlue = {
  backgroundColor: `#aff0ef`,
  padding: `3px`,
  borderRadius: `3px`,
}

export const textHighlightYellow = {
  backgroundColor: `#fff9db`,
  padding: `3px`,
  borderRadius: `3px`,
}
