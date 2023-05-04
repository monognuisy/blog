import * as React from "react"
import ogs from "open-graph-scraper"

import { useState } from "react"

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

  const mouseEnter = () => {
    setOnhover(() => true);
  }

  const mouseLeave = () => {
    setOnhover(() => false);
  }

  const sidenoteStyle = {
    backgroundColor: onhover ? `#ffdc5c` :`#fff9db`,
    padding: `3px`,
    borderRadius: `3px`,
  }
  

  return (
    <span id={`sn-${id}`} style={sidenoteStyle} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      {children}
    </span>
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
