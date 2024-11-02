import { TFrontmatter } from '@/app/_types/post';
import TagChip from '../common/TagChip';

type TPostCardProps = {
  frontmatter: TFrontmatter;
};

const PostCard = ({ frontmatter }: TPostCardProps) => {
  const { title, date, description, tags, categories } = frontmatter;
  return (
    <div className="my-4">
      <p>{categories}</p>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="flex justify-between">
        <p>{date}</p>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
