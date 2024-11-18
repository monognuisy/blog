import { getAllPostPaths, getPostData, getPostPath } from '@/lib/getBlogPost';
import { compileMDX } from 'next-mdx-remote/rsc';
import fs from 'fs';
import remarkGfm from 'remark-gfm';
import CustomMDXComponents from '@/app/_components/post/CustomMDXComponents';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { TFrontmatter } from '@/app/_types/post';
import rehypePrism from 'rehype-prism-plus';
import { mathMacros } from '@/lib/constants';
import Comment from '@/app/_components/utterance/Comment';
import { Metadata } from 'next';
import PostTitle from '@/app/_components/post/PostTitle';

type TPostPageProps = {
  params: {
    category: string;
    slug: string;
  };
};

const generateMetadata = async ({ params }: TPostPageProps) => {
  const { category, slug } = params;

  try {
    const { frontmatter } = getPostData(category, slug);
    const imgPath = `/images/cover/${category}/${slug}.webp`;

    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: 'article',
        url: `{process.env.NEXT_PUBLIC_URI}/${category}/${slug}`,
        images: {
          url: imgPath,
          alt: frontmatter.title,
        },
      },
    } satisfies Metadata;
  } catch (error) {
    //
  }
  return {};
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

  try {
    const postFile = fs.readFileSync(fullPath);

    const { content, frontmatter } = await compileMDX<TFrontmatter>({
      source: postFile,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            [
              rehypeKatex,
              {
                macros: mathMacros,
              },
            ],
            rehypePrism,
          ],
        },
      },
      components: CustomMDXComponents(category, slug),
    });

    return (
      <>
        <PostTitle post={frontmatter} />
        <div className="post-wrapper bg-white mt-[100dvh] ">
          <div className="relative mx-auto pt-20 max-w-[768px] px-4">
            <div className="">{content}</div>
            <Comment />
          </div>
        </div>
      </>
    );
  } catch (error) {
    return <></>;
  }
};

export { generateStaticParams, generateMetadata };
export default PostPage;
