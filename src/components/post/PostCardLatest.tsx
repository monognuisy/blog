import Link from 'next/link';
import type { TContentHeader } from '@/lib/type';
import CardImage from './CardImage';
import Tags from './Tags';

type TPostCardLatestProps = {
  post: TContentHeader;
};

const PostCardLatest = ({ post }: TPostCardLatestProps) => {
  const { title, date, description, categories, tags, slug, category, cover } =
    post;

  return (
    <div className="my-6 hidden md:block">
      <Link href={`/${category}/${slug}`}>
        <div
          className="group relative w-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-md"
          style={{
            aspectRatio: '8 / 5',
          }}
        >
          <CardImage
            cover={cover}
            alt={`Cover image of latest post`}
            className="z-[0] rounded-2xl object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="grid h-full w-full grid-rows-[2fr_1fr]">
            <div></div>
            <div className="h-full w-full rounded-2xl rounded-t-none bg-white/50 px-6 py-6 shadow-lg backdrop-blur-sm dark:bg-black/50">
              <Tags tags={tags} />
              <h1 className="mt-0 text-[1.5rem] md:text-[3rem] lg:text-[3.5rem]">
                {title}
              </h1>
              <p className="mb-4 text-gray-700 text-xs dark:text-gray-300">
                <b>{categories}</b> -{' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCardLatest;
