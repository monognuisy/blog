import { TFrontmatter } from '@/app/_types/post';
import TagChip from '../post/TagChip';
import Link from 'next/link';
import Image from 'next/image';

type TPostCardProps = {
  frontmatter: TFrontmatter;
  category: string;
  slug: string;
};

const PostCard = ({ frontmatter, category, slug }: TPostCardProps) => {
  const { title, date, description, tags, categories } = frontmatter;
  return (
    <div className="my-6 flex-1 min-w-[32%]">
      <Link href={`/${category}/${slug}`}>
        <div>
          <div className="relative w-full aspect-video mb-5">
            <Image
              src={'/images/sample-bg.webp'}
              alt={`Cover image of ${slug}`}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
          <div className="flex gap-2">
            {tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
          <h3 className="mb-1 text-2xl">{title}</h3>
          <p className="text-xs mb-4 text-gray-400">
            <b className="text-black">{categories}</b> -{' '}
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
