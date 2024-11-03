import { getSortedPostList } from '@/lib/getBlogPost';
import PostCard from './PostCard';
import Link from 'next/link';

const PostList = () => {
  // TODO: Apply pagination

  const postInfos = getSortedPostList();

  return (
    <div>
      {postInfos.map(({ id, category, slug, ...frontmatter }) => (
        <Link key={id} href={`/${category}/${slug}`}>
          <PostCard frontmatter={frontmatter} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;
