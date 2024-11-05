import { TContentHeader } from '@/lib/type';
import TagList from './TagList';
import Image from 'next/image';
import Link from 'next/link';

type TCategoryPostCardProps = {
  post: TContentHeader;
};

const CategoryPostCard = ({ post }: TCategoryPostCardProps) => {
  const { title, description, date, tags } = post;
  return (
    <div className="flex gap-10">
      <header className="sticky top-0 flex flex-col pl-6 w-[400px] will-change-transform h-min">
        <div className="relative">
          <div
            className="absolute left-[-28px] top-[8px] aspect-square rounded-full w-2 bg-black"
            style={{
              boxShadow: '0 0 0 4px #00000011, 0 0 0 8px white',
            }}
          ></div>
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <h3>{title}</h3>
        <TagList tags={tags} />
      </header>
      <div className="flex-grow flex flex-col gap-4">
        <div className="relative w-full aspect-video">
          <Image
            src={'/images/sample-bg.webp'}
            alt={`Cover image of ${title}`}
            fill
            sizes="100%"
            className="rounded-2xl object-cover"
          />
        </div>
        <div>
          <p className="mb-2">{description}</p>
          <Link
            href={`/${post.category}/${post.slug}`}
            className="font-bold text-highlight hover:underline"
          >
            Read more 🡪
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPostCard;
