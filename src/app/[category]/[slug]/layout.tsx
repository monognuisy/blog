type TBlogPostLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const BlogPostLayout = ({ children }: TBlogPostLayoutProps) => {
  return <div className="mx-auto">{children}</div>;
};

export default BlogPostLayout;
