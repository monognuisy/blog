'use client';

import { TBlogURLParam } from '@/lib/type';
import { useParams, useRouter } from 'next/navigation';

const SlugPath = () => {
  const { category, slug } = useParams<TBlogURLParam>();
  const router = useRouter();

  const isRoot = !category && !slug;
  const isCategory = !!category && !slug;
  const isSlug = !!slug;

  const fontWeight = (bool: boolean) => (bool ? 'bold' : 'normal');

  return (
    <div className="text-2xl tracking-tight">
      <span
        className={'cursor-pointer ' + (isRoot ? `text-highlight` : '')}
        style={{
          fontWeight: fontWeight(isRoot),
          color: 'gray',
        }}
        onClick={() => router.push('/')}
      >
        / blog{' '}
      </span>
      {category && (
        <span
          className={'cursor-pointer ' + (isCategory ? `text-highlight` : '')}
          style={{
            fontWeight: fontWeight(isCategory),
            color: 'gray',
          }}
          onClick={() => router.push(`/${category}`)}
        >
          / {category}{' '}
        </span>
      )}
      {slug && (
        <span
          className={'cursor-pointer ' + (isSlug ? `text-highlight` : '')}
          style={{
            fontWeight: fontWeight(isSlug),
            color: 'gray',
          }}
          onClick={() => router.push(`/${category}/${slug}`)}
        >
          / {slug}{' '}
        </span>
      )}
    </div>
  );
};

export default SlugPath;
