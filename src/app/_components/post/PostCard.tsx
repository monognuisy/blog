import { TFrontmatter } from '@/app/_types/post';
import Link from 'next/link';
import TagList from './TagList';
import CardImage from './CardImage';

type TPostCardProps = {
  frontmatter: TFrontmatter;
  category: string;
  slug: string;
};

const PostCard = ({ frontmatter, category, slug }: TPostCardProps) => {
  const { title, date, description, tags, categories, cover } = frontmatter;
  return (
    <div className="my-6 min-w-full md:min-w-[32%] md:first:hidden">
      <Link href={`/${category}/${slug}`}>
        <div>
          <div className="relative w-full aspect-video mb-5">
            <CardImage
              cover={cover}
              alt={`Cover image of ${slug}`}
              className="rounded-2xl object-cover"
            />
          </div>
          <TagList tags={tags} />
          <h3 className="mb-1 text-2xl">{title}</h3>
          <p className="text-xs mb-4 text-gray-500 dark:text-gray-400">
            <b>{categories}</b> -{' '}
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
