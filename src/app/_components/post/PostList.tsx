import { getSortedPostList } from '@/lib/getBlogPost';
import PostCard from './PostCard';
import PostCardLatest from './PostCardLatest';

const PostList = () => {
  // TODO: Apply pagination

  const postInfos = getSortedPostList();
  const latestPost = postInfos[0];

  return (
    <div>
      <PostCardLatest post={latestPost} />
      <h1 className="text-[2rem] md:text-[3rem] mt-8 md:mt-12">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-5">
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
