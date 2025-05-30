type THighlightProps = {
  color: 'blue' | 'red' | 'yellow';
  children: React.ReactNode;
};
const Highlight = ({ color = 'blue', children }: THighlightProps) => {
  return <span className={`mdx highlight ${color}`}>{children}</span>;
};

export default Highlight;
