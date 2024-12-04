'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

type THeadingData = {
  id: string;
  text: string;
  level: number;
  tag: string;
  ref: Element;
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<THeadingData[]>([]);
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('h2, h3, h4, h5'),
    );

    const headingNumberTree = [
      {
        depth: 0,
        level: parseInt(headingElements[0].tagName[1]),
        parentIndex: -1,
      },
    ];

    for (let i = 1; i < headingElements.length; i++) {
      const currLevel = parseInt(headingElements[i].tagName[1]);

      let assumedParentIndex = i - 1;
      while (assumedParentIndex !== -1) {
        // 부모가 현재 레벨보다 작은지 확인 -> 그러면 valid 한 중첩
        if (headingNumberTree[assumedParentIndex].level < currLevel) {
          break;
        }

        // 아니면, 계속 부모로 이동
        assumedParentIndex = headingNumberTree[assumedParentIndex].parentIndex;
      }

      // 부모가 없으면 depth 0
      const depth =
        assumedParentIndex == -1
          ? 0
          : headingNumberTree[assumedParentIndex].depth + 1;

      headingNumberTree.push({
        depth,
        level: currLevel,
        parentIndex: assumedParentIndex,
      });
    }

    const depthFlag: number[] = [];

    const headings = headingNumberTree.map(({ depth }, index) => {
      const element = headingElements[index];

      if (depthFlag[depth] === undefined) {
        depthFlag[depth] = 1;
      } else {
        depthFlag[depth]++;

        depthFlag.length = depth + 1;
      }

      const tag = depthFlag.join('.') + '.';
      const id = `h-${tag}`;
      element.id = id;

      return {
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName[1]),
        tag,
        ref: element,
      };
    });

    setHeadings(headings);

    const positions: number[] = [];

    for (let i = 0; i < headingElements.length; i++) {
      const element = headingElements[i];

      let validPositon =
        ((document.documentElement.clientHeight +
          (element as HTMLElement).offsetTop) /
          document.body.scrollHeight) *
        document.documentElement.clientHeight;

      if (i === 0) {
        const minPosition = 80;
        positions.push(Math.max(validPositon, minPosition));
        continue;
      }

      const positionDiff = validPositon - positions[positions.length - 1];
      const margin = 30;

      if (positionDiff < margin) {
        validPositon = positions[positions.length - 1] + margin;
      }

      positions.push(validPositon);
    }

    setPositions(positions);
  }, []);

  useEffect(() => {
    console.log(headings);
  }, [headings]);

  return (
    <nav className="fixed top-0 right-0 bottom-0 z-30 h-full w-[200px] group">
      <ul className="relative h-full w-full list-inside">
        {headings.map(({ id, text, tag, ref }, index) => {
          const validPosition = positions[index];

          const scrollToElement = () => {
            const position =
              (ref as HTMLElement).offsetTop +
              document.documentElement.clientHeight -
              30;

            window.scrollTo({
              top: position,
              behavior: 'smooth',
            });
          };

          return (
            <li
              key={id}
              style={{
                position: 'absolute',
                right: 0,
                top: `${validPosition}px`,
              }}
            >
              <div className="flex items-center mr-2 gap-2">
                <button
                  className="rounded-md border py-1 px-2 text-xs bg-white dark:bg-dark-bg dark:border-gray-700 invisible group-hover:visible transition-opacity ease-in-out duration-500"
                  onClick={scrollToElement}
                >
                  {tag} {text}
                </button>
                <div className="w-1 h-1 rounded-full bg-black/30 dark:bg-white/30"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
