import {
  getAllCategories,
  getSortedPostListByCategory,
} from '@/lib/getBlogPost';
import CategoryPostCard from '../_components/post/CategoryPostCard';

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
    <div>
      <h1 className="my-12">Posts in {`"${categoryName}"`}</h1>
      <div className="border-l flex flex-col gap-12 ">
        {contents.map((post) => (
          <CategoryPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
export { generateStaticParams };
