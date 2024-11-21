import { TContentHeader } from '@/lib/type';
import Link from 'next/link';

type TAdjacentPostLinksProps = {
  prev: TContentHeader | null;
  next: TContentHeader | null;
};

const AdjacentPostLinks = ({ prev, next }: TAdjacentPostLinksProps) => {
  return (
    <div className="flex justify-between items-center py-8 mt-8 border-t">
      {prev ? (
        <Link
          href={`/${prev.category}/${prev.slug}`}
          className="flex flex-col items-start mr-4"
        >
          <span className="text-sm text-gray-500">Prev</span>
          <span className="hover:text-highlight">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/${next.category}/${next.slug}`}
          className="flex flex-col items-end ml-4"
        >
          <span className="text-sm text-gray-500">Next</span>
          <span className="hover:text-highlight">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default AdjacentPostLinks;
