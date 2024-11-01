import { getAllPostPaths, getPostPath } from '@/lib/getBlogPost';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import remarkGfm from 'remark-gfm';
import CustomMDXComponents from '@/app/_components/mdx/CustomMDXComponents';

type TPostPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

type TFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string;
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
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
      },
    },
    components: CustomMDXComponents,
  });

  return (
    <div>
      <h1>{frontmatter.title}</h1>
      {content}
    </div>
  );
};

export { generateStaticParams };
export default PostPage;
