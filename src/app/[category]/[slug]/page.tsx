import { getAllPostPaths, getPostData } from '@/lib/getBlogPost';
import { MDXRemote } from 'next-mdx-remote';
import fs from 'fs';
import path from 'path';

type TPostPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Note: Need to return `Promise<params[]>` for PostPage
const generateStaticParams = async () => {
  const fullPaths = getAllPostPaths();

  return fullPaths.map((fullPath) => {
    const splited = fullPath.split('/');

    const category = splited[splited.length - 2];
    const slug = splited[splited.length - 1].replace(/\.mdx$/, ''); // omit extension

    return {
      category,
      slug,
    };
  }) satisfies TPostPageProps['params'][];
};

const PostPage = async ({ params }: TPostPageProps) => {
  const { category, slug } = params;

  // TODO: Handle 404
  const { data, mdxSource } = await getPostData(category, slug);

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <MDXRemote {...mdxSource} />
    </div>
  );
};

export { generateStaticParams };
export default PostPage;
