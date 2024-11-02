type TTagChipProps = {
  tag: string;
};

const TagChip = ({ tag }: TTagChipProps) => {
  const tagColor = '#9fc7c5'; // TODO: replace to random-pick function in utils

  return (
    <p
      className="text-sm rounded-md py-1 px-3"
      style={{
        // Is this the best way to handle dynamic color?
        background: tagColor,
      }}
    >
      {tag}
    </p>
  );
};

export default TagChip;
