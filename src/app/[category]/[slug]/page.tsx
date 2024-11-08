import { getAllPostPaths, getPostPath } from '@/lib/getBlogPost';
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import remarkGfm from 'remark-gfm';
import CustomMDXComponents from '@/app/_components/post/CustomMDXComponents';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { TFrontmatter } from '@/app/_types/post';
import rehypePrism from 'rehype-prism-plus';
import Image from 'next/image';
import TagList from '@/app/_components/post/TagList';

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
    components: CustomMDXComponents(category, slug),
  });

  const { title, date, tags, categories } = frontmatter;

  return (
    <>
      <div className="w-full h-[80%] overflow-hidden">
        <div className="absolute left-0 w-full">
          <Image
            src={'/images/sample-bg.webp'}
            alt={`Cover image of latest post`}
            fill
            sizes="100%"
            className="object-cover"
          />
          <div className="w-full grid grid-rows-[2fr_1fr]">
            <div></div>
            <div className="w-full  bg-white/50 shadow-lg backdrop-blur-sm px-6 py-6">
              <TagList tags={tags} />
              <h1 className="huge mt-0">{title}</h1>
              <p className="text-xs mb-4 text-gray-700">
                <b className="text-black">{categories}</b> -{' '}
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 'calc(80% + 12rem)',
        }}
      >
        {content}
      </div>
    </>
  );
};

export { generateStaticParams };
export default PostPage;
