'use client';

import { TMetadata } from '@/app/_types/post';
import { ogTagsQuery } from '@/app/_utils/posts/query';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TLinkCardProps = {
  url: string;
};

const LoadingCard = () => {
  return (
    <div className="border-2 rounded-xl p-2 flex gap-4 mb-8 animation-pulse">
      <div className="rounded-xl w-[200px] h-[200px] bg-gray-300 animate-pulse flex-shrink-0"></div>
      <div className="w-full flex flex-col gap-4">
        <div className="h-12 bg-gray-300 animate-pulse rounded w-1/2"></div>
        <div className="bg-gray-300 animate-pulse rounded w-full flex-1"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/3"></div>
      </div>
    </div>
  );
};

const LinkCard = ({ url }: TLinkCardProps) => {
  const [metadata, setMetadata] = useState<TMetadata>();
  const { data, isLoading } = useQuery(ogTagsQuery(url));

  useEffect(() => {
    if (data) {
      setMetadata(data);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingCard />;
  }

  return (
    <Link
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="link-card"
    >
      <div className="rounded-xl border-2 p-2 flex gap-4 mb-8">
        {metadata?.image && (
          <Image
            src={metadata?.image}
            alt={metadata?.title}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-xl w-[200px] h-[200px] aspect-square object-cover flex-shrink-0"
          />
        )}
        <div className="flex-shrink max-h-[200px] flex flex-col">
          <h3 className="line-clamp-1">
            {metadata?.title || 'No title available'}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-500 flex-1">
            {metadata?.description || 'No description available'}
          </p>
          <p
            className="line-clamp-1 text-sm text-gray-500"
            style={{
              marginBottom: `0`,
            }}
          >
            {metadata?.siteName || 'Unknown site'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LinkCard;
