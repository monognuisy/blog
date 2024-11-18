'use client';

import { TBlogURLParam } from '@/lib/type';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const SlugPath = () => {
  const { category, slug } = useParams() as TBlogURLParam;

  const isRoot = !category && !slug;
  const isCategory = !!category && !slug;
  const isSlug = !!slug;

  const fontWeight = (bool: boolean) => (bool ? 'bold' : 'normal');

  return (
    <div className="text-md md:text-xl tracking-tight">
      {category && (
        <Link href={`/${category}`}>
          <span
            className={'cursor-pointer ' + (isCategory ? `text-highlight` : '')}
            style={{
              fontWeight: fontWeight(isCategory),
              color: 'gray',
            }}
          >
            / {category}{' '}
          </span>
        </Link>
      )}
      {slug && (
        <Link href={`/${category}/${slug}`}>
          <span
            className={'cursor-pointer ' + (isSlug ? `text-highlight` : '')}
            style={{
              fontWeight: fontWeight(isSlug),
              color: 'gray',
            }}
          >
            / {slug}{' '}
          </span>
        </Link>
      )}
    </div>
  );
};

export default SlugPath;
