import React, { FC, useEffect, useState } from "react"
import { graphql, PageProps } from "gatsby"

type sidenotesType = {
  id: string,
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
      const pos = document.querySelector(`#${key}`).getBoundingClientRect();
      const res = pos.top + window.scrollY;

      setPositions((positions) => {
        return ([...positions, {
        pos: res,
        content: e.content,
      }])});
    })
  }, [])

  console.log(positions);

  return (
    <div>
      {positions.map((e, index) => {
        const { pos, content } = e;
        const id = `sn-ref-${index}`;
        return (
          <p 
            style={{position:`absolute`, top:pos}} 
            id={id}
            key={id}
          >
            {content}
          </p>
        )
      })}
    </div>
  )
}

const findLocation = (key) => {
  let ret = 0;
  useEffect(() => {
    const target = document.querySelector(`#${key}`);
    const pos = target.getBoundingClientRect();
    
    // console.log(pos.top + window.scrollY);
    ret = pos.top + window.scrollY;
  });

  return ret;
}

export default Sidenotes