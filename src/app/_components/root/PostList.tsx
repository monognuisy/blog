import { getSortedPostList } from '@/lib/getBlogPost';
import PostCard from './PostCard';
import Link from 'next/link';

const PostList = () => {
  // TODO: Apply pagination

  const postInfos = getSortedPostList();
  const latestPost = postInfos[0];

  return (
    <div>
      {/* <div>
        <PostCard
          frontmatter={latestPost}
          category={latestPost.category}
          slug={latestPost.slug}
        />
      </div> */}
      <div className="flex justify-between flex-wrap gap-5">
        {postInfos.slice(1).map(({ id, category, slug, ...frontmatter }) => (
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
