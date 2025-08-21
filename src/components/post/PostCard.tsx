import Link from 'next/link';
import type { TFrontmatter } from '@/types/post';
import CardImage from './CardImage';
import Tags from './Tags';

type TPostCardProps = {
  frontmatter: TFrontmatter;
  category: string;
  slug: string;
};

const PostCard = ({ frontmatter, category, slug }: TPostCardProps) => {
  const { title, date, description, tags, categories, cover } = frontmatter;
  return (
    <div className="group my-6 min-w-full rounded-xl border border-gray-200 transition-shadow duration-300 hover:shadow-md md:min-w-[32%] dark:border-neutral-800">
      <Link href={`/${category}/${slug}`}>
        <div>
          <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-t-xl">
            <CardImage
              cover={cover}
              alt={`Cover image of ${slug}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-xl rounded-b-none object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-0 p-4">
            <Tags tags={tags} />
            <h3 className="mb-1 text-xl">{title}</h3>
            <p className="mb-4 text-gray-500 text-xs dark:text-gray-400">
              <b>{categories}</b> - {date}
            </p>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
