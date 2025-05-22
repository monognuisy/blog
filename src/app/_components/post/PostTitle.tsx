import { TFrontmatter } from '@/app/_types/post';
import TagList from './TagList';
import CardImage from './CardImage';

type TPostTitleProps = {
  post: TFrontmatter;
};

const PostTitle = ({ post }: TPostTitleProps) => {
  const { title, date, categories, tags, cover } = post;

  return (
    <div className="w-full overflow-hidden fixed top-0 left-0 h-[100vh]">
      <div className="absolute left-0 w-full h-full">
        <CardImage
          cover={cover}
          alt={`Cover image of latest post`}
          className="object-cover"
          priority
        />
        <div className="relative flex flex-col justify-end w-full h-full z-[2]">
          <div className="w-full bg-white/50 dark:bg-black/50 shadow-lg backdrop-blur-sm py-16">
            <div className="max-w-[1200px] mx-auto px-4">
              {tags && <TagList tags={tags} />}
              <h1 className="lg:text-[3.5rem] mt-0">{title}</h1>
              <p
                className="text-sm text-gray-700 dark:text-gray-300"
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
