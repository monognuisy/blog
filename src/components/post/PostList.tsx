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
        <h1 className="text-3xl md:text-4xl mt-8 md:mt-20">최근 글</h1>
        <TagList tags={tags} />
        <div className="text-center py-8 text-gray-500">
          {tag ? `"${tag}" 태그가 있는 글이 없습니다.` : '글이 없습니다.'}
        </div>
      </div>
    );
  }

  const latestPost = postInfos[0];

  return (
    <div>
      <PostCardLatest post={latestPost} />
      <h1 className="text-3xl md:text-4xl mt-8 md:mt-20">최신 글</h1>
      <TagList tags={tags} />
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
