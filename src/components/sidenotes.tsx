import React, { FC, useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"

type sidenotesType = {
  id: number,
  content: string
}

type sidenotesRecType = {
  sidenotesRecord: sidenotesType[]
}

const Sidenotes = ({ sidenotesRecord }: sidenotesRecType) => {  
  const [positions, setPositions] = useState([]);

  console.log(sidenotesRecord);

  useEffect(() => {
    sidenotesRecord.forEach(e => {
      const key = e.id;
      const pos = document.querySelector(`#sn-${key}`).getBoundingClientRect();
      const res = pos.top + window.scrollY;

      setPositions((positions) => {
        return ([...positions, {
        pos: res,
        content: e.content,
      }])});
    })
  }, [])




  type positionType = {
    pos: number,
    content: string,
  }

  return (
    <div className="sidenotes-wrapper">
      {positions.map((e, index) => {
        const { pos, content }: positionType = e;
        const id = `sn-ref-${index}`;

        return (
          <Note id={id} pos={pos}>
            {content}
          </Note>
        )
      })}
    </div>
  )
}

const Note = ({ pos, id, children }) => {
  const [onhover, setOnhover] = useState(false);

  const mouseEnter = () => {
    setOnhover(() => true);
  }

  const mouseLeave = () => {
    setOnhover(() => false);
  }

  const sidenoteStyle = {
    top: 0,
    position: `absolute`, 
    boxShadow: `rgba(0, 0, 0, 0.01) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px`,
    padding: `10px`,
    width: `300px`,
    borderRadius: `5px`,  
    backgroundColor: onhover ? `#eeeeee` : `#ffffff`,
  }

  return (
    <div 
      style={{
        ...sidenoteStyle,
        top: pos,
      }} 
      id={id}
      key={id}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      >
      <span>
        {children}
      </span>
    </div>
  )
}

export default Sidenotes