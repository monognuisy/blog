import { TContentHeader } from '@/lib/type';
import Link from 'next/link';
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
          className="relative w-full overflow-hidden rounded-2xl group hover:shadow-md transition-shadow duration-300"
          style={{
            aspectRatio: '8 / 5',
          }}
        >
          <CardImage
            cover={cover}
            alt={`Cover image of latest post`}
            className="rounded-2xl object-cover z-[0] group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="w-full h-full grid grid-rows-[2fr_1fr]">
            <div></div>
            <div className="w-full h-full bg-white/50 dark:bg-black/50 shadow-lg backdrop-blur-sm rounded-2xl rounded-t-none px-6 py-6">
              <Tags tags={tags} />
              <h1 className="text-[1.5rem] md:text-[3rem] lg:text-[3.5rem] mt-0">
                {title}
              </h1>
              <p className="text-xs mb-4 text-gray-700 dark:text-gray-300">
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
