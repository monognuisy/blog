type TTagChipProps = {
  tag: string;
};

const TagChip = ({ tag }: TTagChipProps) => {
  return (
    <p className="text-xs font-medium text-black/50 dark:text-white/50 rounded-2xl py-0.5 px-2 w-fit bg-black/10 dark:bg-white/10">
      {tag}
    </p>
  );
};

export default TagChip;
