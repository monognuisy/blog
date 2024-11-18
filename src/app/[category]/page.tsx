import {
  getAllCategories,
  getSortedPostListByCategory,
} from '@/lib/getBlogPost';
import CategoryPostCard from '../_components/post/CategoryPostCard';
import PostCard from '../_components/post/PostCard';

type TCategoryPageProps = {
  params: {
    category: string;
  };
};

const generateStaticParams = async () => {
  const categories = getAllCategories();
  return categories.map((category) => ({
    category,
  })) as TCategoryPageProps['params'][];
};

const CategoryPage = ({ params }: TCategoryPageProps) => {
  const { category } = params;
  const contents = getSortedPostListByCategory(category);

  const categoryName = contents[0].categories;

  return (
    <div className="max-w-[1200px] mx-auto mt-[90px] px-4">
      <h1 className="my-12 text-[2rem] md:text-[2.5rem]">
        Posts in {`"${categoryName}"`}
      </h1>
      <div className="border-l hidden md:flex md:flex-col md:gap-12">
        {contents.map((post) => (
          <CategoryPostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex flex-col gap-5 md:hidden">
        {contents.map((post) => (
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
export { generateStaticParams };
