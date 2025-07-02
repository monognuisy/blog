import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchOgTags } from '@/actions/ogTags';

type TLinkCardProps = {
  url: string;
};

const LoadingContent = () => {
  return (
    <div className="animation-pulse flex w-full gap-4">
      <div className="h-[100px] w-[100px] flex-shrink-0 animate-pulse rounded-xl bg-gray-300 md:h-[150px] md:w-[150px]"></div>
      <div className="flex w-full flex-col gap-4">
        <div className="h-12 w-1/2 animate-pulse rounded bg-gray-300"></div>
        <div className="w-full flex-1 animate-pulse rounded bg-gray-300"></div>
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-300"></div>
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
              className="aspect-square h-[100px] w-[100px] rounded-xl object-cover md:h-[150px] md:w-[150px]"
            />
          </div>
        )}
        <div className="flex max-h-[100px] flex-shrink flex-col md:max-h-[150px]">
          <p className="mb-3 line-clamp-1 shrink font-bold text-base md:text-lg">
            {metadata?.title || 'No title available'}
          </p>
          <p className="mb-0 line-clamp-1 text-gray-500 text-sm md:line-clamp-3 md:flex-1 md:text-base">
            {metadata?.description || 'No description available'}
          </p>
          <p
            className="mt-1 line-clamp-1 shrink text-gray-500 text-xs md:text-sm"
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
        <div className="flex w-full flex-col gap-4">
          <p className="mb-3 line-clamp-1 shrink font-bold text-base md:text-lg">
            Failed to load link preview
          </p>
          <p className="mb-0 line-clamp-1 text-gray-500 text-sm md:line-clamp-3 md:flex-1 md:text-base">
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
      className="link-card mb-8 flex gap-4 rounded-xl border p-2"
    >
      <Suspense fallback={<LoadingContent />}>
        <LinkCardContent url={url} />
      </Suspense>
    </Link>
  );
};

export default LinkCardServerComponent;
