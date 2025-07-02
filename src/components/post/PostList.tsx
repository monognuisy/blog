import {
  getAllTags,
  getSortedPostList,
  getSortedPostListByTag,
} from '@/lib/getBlogPost';
import PostCard from './PostCard';
import PostCardLatest from './PostCardLatest';
import TagList from './TagList';

interface PostListProps {
  tag?: string;
}

const PostList = ({ tag }: PostListProps) => {
  // TODO: Apply pagination

  const postInfos = tag ? getSortedPostListByTag(tag) : getSortedPostList();
  const tags = getAllTags();

  if (postInfos.length === 0) {
    return (
      <div>
        <h1 className="mt-8 text-3xl md:mt-20 md:text-4xl">최근 글</h1>
        <TagList tags={tags} />
        <div className="py-8 text-center text-gray-500">
          {tag ? `"${tag}" 태그가 있는 글이 없습니다.` : '글이 없습니다.'}
        </div>
      </div>
    );
  }

  const latestPost = postInfos[0];

  return (
    <div>
      <PostCardLatest post={latestPost} />
      <h1 className="mt-8 text-3xl md:mt-20 md:text-4xl">최신 글</h1>
      <TagList tags={tags} />
      <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
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
