type TTagChipProps = {
  tag: string;
};

const TagChip = ({ tag }: TTagChipProps) => {
  const tagColor = '#9933f8'; // TODO: replace to random-pick function in utils
  const tagBgColor = '#ffffff'; // TODO: replace to random-pick function in utils

  return (
    <p
      className="text-xs font-semibold rounded-2xl border-2 py-1 px-3 w-fit"
      style={{
        // Is this the best way to handle dynamic color?
        background: 'transparent',
        borderColor: tagColor,
        color: tagColor,
      }}
    >
      {tag}
    </p>
  );
};

export default TagChip;
