import { getSortedPostList } from '@/lib/getBlogPost';
import PostCard from './PostCard';
import Link from 'next/link';
import PostCardLatest from './PostCardLatest';

const PostList = () => {
  // TODO: Apply pagination

  const postInfos = getSortedPostList();
  const latestPost = postInfos[0];

  return (
    <div>
      <PostCardLatest post={latestPost} />
      <h1 className="text-[2rem] md:text-[3rem] mt-12">All Posts 🡫</h1>
      <div className="flex justify-between flex-wrap gap-5">
        {postInfos.map(({ id, category, slug, ...frontmatter }) => (
          <PostCard
            key={id}
            frontmatter={frontmatter}
            category={category}
            slug={slug}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
