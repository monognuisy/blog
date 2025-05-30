import { TContentHeader } from '@/lib/type';
import TagList from './TagList';
import Link from 'next/link';
import CardImage from './CardImage';
import { ArrowRight } from 'lucide-react';

type TCategoryPostCardProps = {
  post: TContentHeader;
};

const CategoryPostCard = ({ post }: TCategoryPostCardProps) => {
  const { title, description, date, tags, cover } = post;
  return (
    <div className="flex gap-10">
      <header className="sticky top-20 flex flex-col grow pl-6 w-[400px] will-change-transform h-min">
        <div className="relative">
          <div className="absolute left-[-28px] top-[8px] aspect-square rounded-full w-2 bg-black dark:bg-dark-text category-dot"></div>
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <h3>{title}</h3>
        <TagList tags={tags} />
      </header>
      <div className="grow max-w-[600px] flex flex-col gap-4">
        <div className="relative w-full aspect-video">
          <CardImage
            cover={cover}
            alt={`Cover image of ${title}`}
            className="rounded-2xl object-cover"
          />
        </div>
        <div>
          <p className="mb-2">{description}</p>
          <Link
            href={`/${post.category}/${post.slug}`}
            className="font-bold text-highlight hover:underline text-xl"
          >
            Read more <ArrowRight className='inline' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPostCard;
