import fs from 'node:fs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdjacentPostLinks from '@/components/post/AdjacentPostLinks';
import CustomMDXComponents from '@/components/post/CustomMDXComponents';
import PostTitle from '@/components/post/PostTitle';
import TableOfContentsWrapper from '@/components/post/TableOfContents';
import Comment from '@/components/utterance/Comment';
import {
  getAdjacentPosts,
  getAllPostPaths,
  getPostData,
  getPostPath,
} from '@/lib/getBlogPost';
import customMDX from '@/lib/mdxCompiler';
import type { TFrontmatter } from '@/types/post';

type TPostPageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

const generateMetadata = async ({
  params,
}: TPostPageProps): Promise<Metadata> => {
  const { category, slug } = await params;

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
        images: [
          {
            url: imgPath,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imgPath],
      },
    } satisfies Metadata;
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'monognuisy blog',
      description:
        'Technical blog about web development, programming, and more.',
    };
  }
};

// Note: Need to return `Promise<params[]>` for PostPage
const generateStaticParams = async () => {
  const fullPaths = getAllPostPaths();

  return fullPaths.map(fullPath => {
    const splited = fullPath.split('/');

    const category = splited[splited.length - 2];
    const slug = splited[splited.length - 1].replace(/\.mdx$/, ''); // omit extension

    return {
      category,
      slug,
    };
  }) satisfies Awaited<TPostPageProps['params']>[];
};

const PostPage = async ({ params }: TPostPageProps) => {
  const { category, slug } = await params;
  const fullPath = getPostPath(category, slug);

  try {
    const postFile = fs.readFileSync(fullPath);
    const { content, frontmatter } = await customMDX<TFrontmatter>({
      source: postFile,
      components: CustomMDXComponents(category, slug),
    });

    const { prev, next } = getAdjacentPosts(category, slug);

    return (
      <div>
        <div>
          <PostTitle post={frontmatter} />
        </div>

        <div className="items-start bg-white dark:bg-dark-bg">
          {/* 목차 사이드바 */}
          <div className="mx-auto w-full max-w-[1200px] lg:flex lg:gap-20">
            <div className="post-wrapper relative max-w-[800px] px-4 pt-10">
              {content}
              <AdjacentPostLinks prev={prev} next={next} />
              <Comment />
            </div>
            <div className="hidden lg:block">
              <TableOfContentsWrapper />
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    // 못 찾았을 시 404 페이지로 이동
    notFound();
  }
};

export { generateStaticParams, generateMetadata };

export default PostPage;
