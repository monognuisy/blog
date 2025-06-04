import { cn } from '@/lib/styles';
import { TContentHeader } from '@/lib/type';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

type TAdjacentPostLinksProps = {
  prev: TContentHeader | null;
  next: TContentHeader | null;
};

const AdjacentPostLinks = ({ prev, next }: TAdjacentPostLinksProps) => {
  return (
    <div className="flex items-center gap-4 py-8 mt-8 border-t flex-wrap">
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
        'flex flex-col border rounded-md p-3 w-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors duration-300 no-underline text-gray-700 dark:text-gray-300 min-w-[300px] flex-1',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 w-full',
          next ? 'justify-end' : 'justify-start',
        )}
      >
        {!next && <ArrowLeftIcon className="w-4 h-4" strokeWidth={2} />}
        <span className="text-sm text-gray-500 block">{label}</span>
        {next && <ArrowRightIcon className="w-4 h-4" strokeWidth={2} />}
      </div>
      <span className="w-full font-semibold block whitespace-nowrap overflow-hidden text-ellipsis">
        {post.title}
      </span>
    </Link>
  );
};

export default AdjacentPostLinks;
