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

  useEffect(() => {
    sidenotesRecord.forEach(e => {
      const key = e.id;
      const pos = document.querySelector(`#${key}`).getBoundingClientRect();
      const res = pos.top + window.scrollY;

      setPositions([...positions, res]);
    })
  }, [])

  console.log(positions);

  return (
    <div>
      {positions.map(pos => {
        return (
          <span style={{position:`absolute`, top:pos}}>this is sample sidenote</span>
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