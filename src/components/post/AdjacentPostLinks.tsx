import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/styles';
import type { TContentHeader } from '@/lib/type';

type TAdjacentPostLinksProps = {
  prev: TContentHeader | null;
  next: TContentHeader | null;
};

const AdjacentPostLinks = ({ prev, next }: TAdjacentPostLinksProps) => {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 border-t py-8">
      {prev ? <PostLink post={prev} className="mr-auto text-left" /> : <div />}
      {next ? (
        <PostLink post={next} next className="ml-auto text-right" />
      ) : (
        <div />
      )}
    </div>
  );
};

const PostLink = ({
  post,
  next = false,
  className,
}: {
  post: TContentHeader;
  next?: boolean;
  className: string;
}) => {
  const label = next ? '다음 글' : '이전 글';
  return (
    <Link
      href={`/${post.category}/${post.slug}`}
      className={cn(
        'flex w-full min-w-[300px] flex-1 flex-col rounded-md border p-3 text-gray-700 no-underline transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-800',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-full items-center gap-2',
          next ? 'justify-end' : 'justify-start',
        )}
      >
        {!next && <ArrowLeftIcon className="h-4 w-4" strokeWidth={2} />}
        <span className="block text-gray-500 text-sm">{label}</span>
        {next && <ArrowRightIcon className="h-4 w-4" strokeWidth={2} />}
      </div>
      <span className="block w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
        {post.title}
      </span>
    </Link>
  );
};

export default AdjacentPostLinks;
