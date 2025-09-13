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
    <section className="hidden md:block">
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
            sizes="(max-width: 1024px) 100vw, (max-width: 1300px) 60w, (max-width: 1536px) 862px, 1000px"
            priority
            fetchPriority="high"
          />
          <div className="absolute top-4 left-4 z-10 bg-white/50 backdrop-blur-sm dark:bg-black/50 rounded-md px-2 py-1">
            <h2 className="text-xl font-bold my-0 text-black dark:text-white py-0">
              최신 포스트
            </h2>
          </div>
          <div className="grid h-full w-full grid-rows-[2fr_1fr]">
            <div></div>
            <div className="h-full w-full rounded-2xl rounded-t-none bg-white/50 px-6 py-6 shadow-lg backdrop-blur-sm dark:bg-black/50">
              <Tags tags={tags} />
              <h3 className="mt-0 text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem]">
                {title}
              </h3>
              <p className="mb-4 text-gray-700 text-xs dark:text-gray-300">
                <b>{categories}</b> -{' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-sm line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default PostCardLatest;
