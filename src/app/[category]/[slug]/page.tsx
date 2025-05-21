import {
  getAllPostPaths,
  getPostData,
  getPostPath,
  getAdjacentPosts,
} from '@/lib/getBlogPost';
import fs from 'fs';
import CustomMDXComponents from '@/app/_components/post/CustomMDXComponents';
import { TFrontmatter } from '@/app/_types/post';
import Comment from '@/app/_components/utterance/Comment';
import { Metadata } from 'next';
import PostTitle from '@/app/_components/post/PostTitle';
import AdjacentPostLinks from '@/app/_components/post/AdjacentPostLinks';
import customMDX from '@/lib/mdxCompiler';
import { notFound } from 'next/navigation';

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
    const { title, description, cover } = frontmatter;
    const imgPath = cover
      ? `${process.env.NEXT_PUBLIC_URI}/images/cover/${cover}.webp`
      : `${process.env.NEXT_PUBLIC_URI}/images/cover/blog-cover.webp`;
    const url = `${process.env.NEXT_PUBLIC_URI}/${category}/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        url,
        siteName: 'monognuisy blog',
        images: {
          url: imgPath,
          alt: title,
        },
      },
    } satisfies Metadata;
  } catch {
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
    const { content, frontmatter } = await customMDX<TFrontmatter>({
      source: postFile,
      components: CustomMDXComponents(category, slug),
    });

    const { prev, next } = getAdjacentPosts(category, slug);

    return (
      <>
        <div className="relative">
          <PostTitle post={frontmatter} />
          <div className="bg-white dark:bg-dark-bg translate-y-[100vh]">
            <div className="post-wrapper relative mx-auto pt-20 max-w-[1024px] px-4">
              {content}
              <AdjacentPostLinks prev={prev} next={next} />
              <Comment />
            </div>
          </div>
        </div>
      </>
    );
  } catch {
    // 못 찾았을 시 404 페이지로 이동
    notFound();
  }
};

export { generateStaticParams, generateMetadata };

export default PostPage;
