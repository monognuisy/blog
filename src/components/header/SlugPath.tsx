'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

const SlugPath = () => {
  const pathname = usePathname();
  const pathnameArray = pathname.split('/').slice(1);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="text-sm tracking-tight md:text-base" ref={containerRef}>
      {pathnameArray[0] ? (
        pathnameArray.map((path, index) => {
          const isLast = index === pathnameArray.length - 1;
          return (
            <Link
              href={`/${pathnameArray.slice(0, index + 1).join('/')}`}
              key={index}
            >
              <span
                className={
                  'cursor-pointer ' +
                  (isLast ? `text-primary dark:text-primary-dark` : '')
                }
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
          className="cursor-pointer text-primary dark:text-primary-dark"
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
