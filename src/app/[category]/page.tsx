import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getAllCategories,
  getSortedPostListByCategory,
} from '@/lib/getBlogPost';
import CategoryPostCard from '../../components/post/CategoryPostCard';
import PostCard from '../../components/post/PostCard';

type TCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

const generateMetadata = async ({ params }: TCategoryPageProps) => {
  const { category } = await params;
  const contents = getSortedPostListByCategory(category);
  const categoryName = contents?.[0]?.categories ?? category;

  const title = `${categoryName}`;
  const description = `${categoryName} posts`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_URI}/${category}`,
      siteName: 'monognuisy blog',
      images: [
        {
          url: `/images/cover/blog-cover.webp`,
          width: 1200,
          height: 630,
        },
      ],
    },
  } satisfies Metadata;
};

const generateStaticParams = async () => {
  const categories = getAllCategories();
  return categories.map(category => ({
    category,
  })) as Awaited<TCategoryPageProps['params']>[];
};

const CategoryPage = async ({ params }: TCategoryPageProps) => {
  const { category } = await params;
  const contents = getSortedPostListByCategory(category);

  if (!contents || contents.length === 0) {
    notFound();
  }

  const categoryName = contents[0]?.categories ?? category;

  return (
    <div className="mx-auto max-w-[1200px] px-4">
      <h1 className="my-2 text-[2rem] md:my-12 md:text-[2.5rem]">
        {`${categoryName}`} 카테고리의 글
      </h1>
      <div className="hidden border-l md:flex md:flex-col md:gap-12">
        {contents.map(post => (
          <CategoryPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex flex-col gap-0 md:hidden">
        {contents.map(post => (
          <PostCard
            key={post.id}
            frontmatter={post}
            category={post.category}
            slug={post.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
export { generateStaticParams, generateMetadata };
