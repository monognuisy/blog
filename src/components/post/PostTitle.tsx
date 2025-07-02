import type { TFrontmatter } from '@/types/post';
import CardImage from './CardImage';
import Tags from './Tags';

type TPostTitleProps = {
  post: TFrontmatter;
};

const PostTitle = ({ post }: TPostTitleProps) => {
  const { title, date, categories, tags, cover } = post;

  return (
    <div className="w-full">
      <div className="relative h-[calc(100vh-56px)]">
        <CardImage
          cover={cover}
          alt={`Cover image of latest post`}
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="relative z-[2] flex h-full w-full flex-col justify-end">
          <div className="w-full bg-white/50 py-16 backdrop-blur-sm dark:bg-black/50">
            <div className="mx-auto max-w-[1200px] px-4">
              {tags && <Tags tags={tags} />}
              <h1 className="mt-0 lg:text-[3.5rem]">{title}</h1>
              <p
                className="text-gray-700 text-sm dark:text-gray-300"
                style={{
                  marginBottom: 0,
                }}
              >
                {categories && (
                  <>
                    <b>{categories}</b> -{' '}
                  </>
                )}
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
