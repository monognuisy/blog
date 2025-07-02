type TTagChipProps = {
  tag: string;
};

const TagChip = ({ tag }: TTagChipProps) => {
  return (
    <p className="w-fit rounded-2xl bg-black/10 px-2 py-0.5 font-medium text-black/50 text-xs dark:bg-white/10 dark:text-white/50">
      {tag}
    </p>
  );
};

export default TagChip;
