import { TFrontmatter } from '@/types/post';
import Link from 'next/link';
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
    <div className="my-6 min-w-full md:min-w-[32%] md:first:hidden border border-gray-200 dark:border-neutral-800 rounded-xl hover:shadow-md transition-shadow duration-300 group">
      <Link href={`/${category}/${slug}`}>
        <div>
          <div className="relative w-full aspect-video mb-4 overflow-hidden rounded-t-xl">
            <CardImage
              cover={cover}
              alt={`Cover image of ${slug}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-xl rounded-b-none object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 mt-0">
            <Tags tags={tags} />
            <h3 className="mb-1 text-xl">{title}</h3>
            <p className="text-xs mb-4 text-gray-500 dark:text-gray-400">
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
