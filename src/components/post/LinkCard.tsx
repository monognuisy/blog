import { fetchOgTags } from '@/actions/ogTags';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type TLinkCardProps = {
  url: string;
};

const LoadingContent = () => {
  return (
    <div className="animation-pulse flex w-full gap-4">
      <div className="rounded-xl w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-gray-300 animate-pulse flex-shrink-0"></div>
      <div className="w-full flex flex-col gap-4">
        <div className="h-12 bg-gray-300 animate-pulse rounded w-1/2"></div>
        <div className="bg-gray-300 animate-pulse rounded w-full flex-1"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/3"></div>
      </div>
    </div>
  );
};

const LinkCardContent = async ({ url }: { url: string }) => {
  try {
    const metadata = await fetchOgTags(url);

    return (
      <>
        {metadata?.image && (
          <div className="flex shrink-0 items-center">
            <Image
              src={metadata.image}
              alt={metadata.title}
              width={500}
              height={500}
              className="rounded-xl w-[100px] h-[100px] md:w-[150px] md:h-[150px] aspect-square object-cover"
            />
          </div>
        )}
        <div className="flex-shrink max-h-[100px] md:max-h-[150px] flex flex-col">
          <p className="text-base md:text-lg line-clamp-1 font-bold shrink mb-3">
            {metadata?.title || 'No title available'}
          </p>
          <p className="text-gray-500 text-sm md:text-base line-clamp-1 md:line-clamp-3 md:flex-1 mb-0">
            {metadata?.description || 'No description available'}
          </p>
          <p
            className="text-gray-500 text-xs md:text-sm line-clamp-1 mt-1 shrink"
            style={{
              marginBottom: `0`,
            }}
          >
            {metadata?.siteName || 'Unknown site'}
          </p>
        </div>
      </>
    );
  } catch {
    return (
      <div className="flex w-full gap-4">
        <div className="w-full flex flex-col gap-4">
          <p className="text-base md:text-lg line-clamp-1 font-bold shrink mb-3">
            Failed to load link preview
          </p>
          <p className="text-gray-500 text-sm md:text-base line-clamp-1 md:line-clamp-3 md:flex-1 mb-0">
            Could not fetch metadata for this URL
          </p>
        </div>
      </div>
    );
  }
};

const LinkCardServerComponent = ({ url }: TLinkCardProps) => {
  return (
    <Link
      href={url}
      rel="noopener noreferrer"
      target="_blank"
      className="link-card mb-8 rounded-xl border p-2 flex gap-4"
    >
      <Suspense fallback={<LoadingContent />}>
        <LinkCardContent url={url} />
      </Suspense>
    </Link>
  );
};

export default LinkCardServerComponent;
