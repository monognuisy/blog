type TBlogPostLayoutProps = {
  children: React.ReactNode;
};

const BlogPostLayout = ({ children }: TBlogPostLayoutProps) => {
  return <div className="max-w-[768px] mx-auto post-wrapper">{children}</div>;
};

export default BlogPostLayout;
