import TagChip from './TagChip';

type TTagListProps = {
  tags: string[];
};

const TagList = ({ tags }: TTagListProps) => {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <TagChip key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default TagList;
