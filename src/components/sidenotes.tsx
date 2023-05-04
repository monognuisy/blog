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
  const [docElement, setDocElement] = useState([]);

  useEffect(() => {
    sidenotesRecord?.forEach(e => {
      const key = e.id;
      const ele = document.querySelector(`#sn-${key}`);
      const pos = ele.getBoundingClientRect();
      const res = pos.top + window.scrollY;

      setPositions((positions) => {
        return ([...positions, {
          pos: res,
          content: e.content,
      }])});

      setDocElement((elements) => {
        return ([...elements, ele])
      });

    })
  }, [])

  sidenotesRecord?.forEach((e, index) => {
    if (index < positions.length - 1) {
      const currpos = positions[index].pos;
      const nextpos = positions[index + 1].pos;
      const currheight = (Math.ceil(getByte(e.content) * 7.8 / 269))*(24) - 5;

      console.log(currheight);
      console.log(nextpos);

      if (currpos + currheight >= nextpos) {
        positions[index + 1].pos = currpos + currheight + 45;
      }
    }
  })

  type positionType = {
    pos: number,
    content: string,
  }

  return (
    <div className="sidenotes-wrapper">
      {positions.map((e, index) => {
        const { pos, content }: positionType = e;
        const id = `sn-ref-${index + 1}`;

        return (
          <Note id={index} pos={pos} key={id} elements={docElement}>
            {content}
          </Note>
        )
      })}
    </div>
  )
}

const Note = ({ pos, id, elements, children }) => {
  const [onhover, setOnhover] = useState(false);

  const mouseEnter = (i) => {
    setOnhover(() => true);
    
    elements[i].style.backgroundColor = `#ffdc5c`
  }

  const mouseLeave = (i) => {
    setOnhover(() => false);

    elements[i].style.backgroundColor = `#fff9db`
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
      id={`sn-ref-${id + 1}`}
      onMouseEnter={() => mouseEnter(id)}
      onMouseLeave={() => mouseLeave(id)}
    >
      <span>
        {children}
      </span>
    </div>
  )
}

const getByte = (str) => {
  return str
    .split('') 
    .map(s => s.charCodeAt(0))
    .reduce((prev, c) => (prev + ((c === 10) ? 1.8 : ((c >> 7) ? 1.8 : 1))), 0);
}

export default Sidenotes