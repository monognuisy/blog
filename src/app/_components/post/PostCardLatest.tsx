import { TContentHeader } from '@/lib/type';
import Image from 'next/image';
import Link from 'next/link';
import TagChip from './TagChip';
import TagList from './TagList';

type TPostCardLatestProps = {
  post: TContentHeader;
};

const PostCardLatest = ({ post }: TPostCardLatestProps) => {
  const { title, date, description, categories, tags, slug, category } = post;

  return (
    <div className="my-6">
      <Link href={`/${category}/${slug}`}>
        <div
          className="relative w-full"
          style={{
            aspectRatio: '8 / 5',
          }}
        >
          <Image
            src={'/images/sample-bg.webp'}
            alt={`Cover image of latest post`}
            fill
            className="rounded-2xl object-cover z-[-1]"
          />
          <div className="w-full h-full grid grid-rows-[2fr_1fr]">
            <div></div>
            <div className="w-full h-full bg-white/50 shadow-lg backdrop-blur-sm rounded-2xl rounded-t-none px-6 py-6">
              <TagList tags={tags} />
              <h1 className="huge mt-0">{title}</h1>
              <p className="text-xs mb-4 text-gray-700">
                <b className="text-black">{categories}</b> -{' '}
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
