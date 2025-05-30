'use client';

import { TMetadata } from '@/types/post';
import { ogTagsQuery } from '@/utils/posts/query';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type TLinkCardProps = {
  url: string;
};

const LoadingCard = () => {
  return (
    <div className="border rounded-xl p-2 flex gap-4 mb-8 animation-pulse">
      <div className="rounded-xl w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-gray-300 animate-pulse flex-shrink-0"></div>
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
      <div className="rounded-xl border p-2 flex gap-4 mb-8">
        {metadata?.image && (
          <div className="flex shrink-0 items-center">
            <Image
              src={metadata?.image}
              alt={metadata?.title}
              width={500}
              height={500}
              className="rounded-xl w-[100px] h-[100px] md:w-[150px] md:h-[150px] aspect-square object-cover"
            />
          </div>
        )}
        <div className="flex-shrink max-h-[100px] md:max-h-[150px] flex flex-col">
          <h3 className="text-base md:text-xl line-clamp-1">
            {metadata?.title || 'No title available'}
          </h3>
          <p
            className="text-gray-500 text-sm md:text-base line-clamp-1 md:line-clamp-3 md:flex-1"
            style={{
              marginBottom: `0`,
            }}
          >
            {metadata?.description || 'No description available'}
          </p>
          <p
            className="text-gray-500 text-xs md:text-sm line-clamp-1"
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
