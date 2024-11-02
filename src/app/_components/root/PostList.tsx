import { getSortedPostList } from '@/lib/getBlogPost';
import PostCard from './PostCard';

const PostList = () => {
  // TODO: Apply pagination

  const postInfos = getSortedPostList();

  console.log(postInfos);

  return (
    <div>
      {postInfos.map(({ id, ...frontmatter }) => (
        <PostCard key={id} frontmatter={frontmatter} />
      ))}
    </div>
  );
};

export default PostList;
