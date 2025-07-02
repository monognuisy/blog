import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { TContentHeader } from '@/lib/type';
import CardImage from './CardImage';
import Tags from './Tags';

type TCategoryPostCardProps = {
  post: TContentHeader;
};

const CategoryPostCard = ({ post }: TCategoryPostCardProps) => {
  const { title, description, date, tags, cover } = post;
  return (
    <div className="flex gap-10">
      <header className="sticky top-20 flex h-min w-[400px] grow flex-col pl-6 will-change-transform">
        <div className="relative">
          <div className="category-dot absolute top-[8px] left-[-28px] aspect-square w-2 rounded-full bg-black dark:bg-dark-text"></div>
          {date}
        </div>
        <h3>{title}</h3>
        <Tags tags={tags} />
      </header>
      <div className="flex w-[200px] grow flex-col gap-4">
        <div className="relative aspect-video w-full">
          <CardImage
            cover={cover}
            alt={`Cover image of ${title}`}
            className="rounded-2xl object-cover"
          />
        </div>
        <div>
          <p className="mb-2 text-sm">{description}</p>
          <Link
            href={`/${post.category}/${post.slug}`}
            className="flex items-center justify-end gap-2 font-semibold text-highlight hover:underline"
          >
            읽어보기 <ArrowRight className="inline h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPostCard;
