type TBlogPostLayoutProps = {
  children: React.ReactNode;
};

// max-w-[768px]
const BlogPostLayout = ({ children }: TBlogPostLayoutProps) => {
  return <section className="mx-auto">{children}</section>;
};

export default BlogPostLayout;
