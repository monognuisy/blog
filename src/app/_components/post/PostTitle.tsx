import { TFrontmatter } from '@/app/_types/post';
import Image from 'next/image';
import TagList from './TagList';

type TPostTitleProps = {
  post: TFrontmatter;
};

const PostTitle = ({ post }: TPostTitleProps) => {
  const { title, date, categories, tags } = post;

  return (
    <div className="w-full overflow-hidden fixed top-0 left-0 h-dvh -z-10">
      <div className="absolute left-0 w-full h-full">
        <Image
          src={`/images/sample-bg.webp`}
          alt={`Cover image of latest post`}
          fill
          sizes="100%"
          className="object-cover"
        />
        <div className="relative flex flex-col justify-end w-full h-full z-[2]">
          <div className="w-full bg-white/50 shadow-lg backdrop-blur-sm py-16">
            <div className="max-w-[1200px] mx-auto px-4">
              <TagList tags={tags} />
              <h1 className="huge mt-0">{title}</h1>
              <p
                className="text-sm text-gray-700"
                style={{
                  marginBottom: 0,
                }}
              >
                <b className="text-black">{categories}</b> -{' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTitle;
