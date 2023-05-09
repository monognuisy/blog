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
  const [waiter, setWaiter] = useState(false);

  const primaryColor = `#ffffff`;
  const dimmedColor = `#eeeeee`;

  useEffect(() => {
    const sidekey = `sn-ref-${id}`
    const docElement = document.querySelector(`#${sidekey}`)

    setSideElement(() => docElement)
  }, [onhover])

  const mouseEnter = () => {
    setOnhover(() => true);

    if (sideElement) sideElement.style.backgroundColor = dimmedColor
  }

  const mouseLeave = () => {
    setOnhover(() => false);

    if (sideElement && !waiter) 
      sideElement.style.backgroundColor = primaryColor
  }

  
  const mouseClick = (i) => {
    console.log(i);

    sideElement.style.backgroundColor = dimmedColor
    setWaiter(() => true);

    setTimeout(() => setWaiter(false), 1000);
    setTimeout(() => (sideElement.style.backgroundColor = primaryColor), 1000);
  }

  const sidenoteStyle = {
    backgroundColor: onhover ? `#ffdc5c` :`#fff9db`,
    padding: `3px`,
    borderRadius: `3px`,
    textDecoration: `none`,
    color: `#2e353f`,
    transition: `0.2s`,
  }
  

  return (
    <Link 
      to={`./#sn-ref-${id}`}
      id={`sn-${id}`} 
      style={sidenoteStyle} 
      onMouseEnter={mouseEnter} 
      onMouseLeave={mouseLeave}
      onClick={mouseClick}
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
