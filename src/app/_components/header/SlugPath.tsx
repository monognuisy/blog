'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const SlugPath = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/').slice(1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="text-md md:text-xl tracking-tight" ref={containerRef}>
      {pathnameArray[0] ? (
        pathnameArray.map((path, index) => {
          const isLast = index === pathnameArray.length - 1;
          return (
            <Link
              href={`/${pathnameArray.slice(0, index + 1).join('/')}`}
              key={index}
            >
              <span
                className={'cursor-pointer ' + (isLast ? `text-highlight` : '')}
                style={{
                  fontWeight: isLast ? 'bold' : 'normal',
                  color: 'gray',
                }}
              >
                {`/ ${path} `}
              </span>
            </Link>
          );
        })
      ) : (
        <span
          className="cursor-pointer text-highlight"
          style={{
            fontWeight: 'bold',
            color: 'gray',
          }}
        >
          blog
        </span>
      )}
    </div>
  );
};

export default SlugPath;
