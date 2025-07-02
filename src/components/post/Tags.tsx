import TagChip from './TagChip';

interface TagsProps {
  tags: string[];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <TagChip key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default Tags;
