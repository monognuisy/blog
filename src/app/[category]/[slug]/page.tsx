import { getAllPostPaths, getPostPath } from '@/lib/getBlogPost';
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import remarkGfm from 'remark-gfm';
import CustomMDXComponents from '@/app/_components/post/CustomMDXComponents';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { TFrontmatter } from '@/app/_types/post';
import rehypePrism from 'rehype-prism-plus';

type TPostPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

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
  const fullPath = getPostPath(category, slug);
  const postFile = fs.readFileSync(fullPath);

  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source: postFile,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex, rehypePrism],
      },
    },
    components: CustomMDXComponents,
  });

  return (
    <>
      <h1>{frontmatter.title}</h1>
      {content}
    </>
  );
};

export { generateStaticParams };
export default PostPage;