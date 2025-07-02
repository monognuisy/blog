import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { TFrontmatter } from '@/types/post';
import { ascendingSortFn } from './function';
import type { TContentHeader } from './type';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// 캐시 변수들 - 빌드 후 포스트가 변경되지 않으므로 단순 메모리 캐싱
let allPostsCache: TContentHeader[] | null = null;
let allCategoriesCache: string[] | null = null;
let allTagsCache: string[] | null = null;

const getPostPath = (category: string, slug: string) => {
  return path.join(postsDirectory, category, `${slug}.mdx`);
};

/**
 * Return absolute path for every original file of blog post
 */
const getAllPostPaths = () => {
  // Find mdx file recursively.
  const categories = fs.readdirSync(postsDirectory);
  const fileNames = categories.flatMap(category => {
    const filePath = path.join(postsDirectory, category);

    // Add categories at the front of each file name.
    const names = fs
      .readdirSync(filePath)
      .map(name => path.join(postsDirectory, category, name));

    return names;
  });

  return fileNames;
};

const getAllCategories = () => {
  if (allCategoriesCache) {
    return allCategoriesCache;
  }

  const categories = fs.readdirSync(postsDirectory);
  allCategoriesCache = categories;
  return categories;
};

// TODO: Optimize for pagination.
/**
 * Return list of all blog posts' data
 */
const getSortedPostList = (sortFn = ascendingSortFn) => {
  // 캐시된 데이터가 있으면 정렬만 다시 해서 반환
  if (allPostsCache) {
    return allPostsCache.toSorted((a, b) => sortFn(a.date, b.date));
  }

  // 캐시가 없으면 파일에서 로드하고 캐시에 저장
  const fileNames = getAllPostPaths();

  const contents = fileNames
    .map(fullPath => {
      const fullNameSplit = fullPath.split('/');
      const category = fullNameSplit[fullNameSplit.length - 2];
      const fileName = fullNameSplit[fullNameSplit.length - 1];
      const slug = fileName.replace(/\.mdx$/, '');

      // Make id by eliminating extensions.
      const id = `${category}-${slug}`;

      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        category,
        slug,
        ...matterResult.data,
      } as TContentHeader;
    })
    .filter(post => {
      return !post.draft;
    });

  // 캐시에 저장 (정렬하지 않은 원본 데이터)
  allPostsCache = contents;

  // Sort posts in ascending order.
  const sortedContents = contents.toSorted((a, b) => sortFn(a.date, b.date));

  return sortedContents;
};

const getSortedPostListByCategory = (
  category: string,
  sortFn = ascendingSortFn,
) => {
  const allCategories = getAllCategories();
  if (!allCategories.includes(category)) {
    return [];
  }

  // 전체 포스트 캐시를 활용해서 카테고리별 필터링
  const allPosts = getSortedPostList(); // 이미 캐시된 데이터 사용
  const categoryPosts = allPosts.filter(post => post.category === category);

  // 다시 정렬 (다른 정렬 함수가 전달될 수 있으므로)
  return categoryPosts.toSorted((a, b) => sortFn(a.date, b.date));
};

/**
 * Generate post data from category and slug.
 */
const getPostData = (category: string, slug: string) => {
  const filePath = getPostPath(category, slug);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const data = matter(fileContents);

  const frontmatter = data.data as TFrontmatter;
  const content = data.content;

  // const mdxSource = await serialize(content);

  return {
    frontmatter,
    content,
  };
};

export const getAdjacentPosts = (category: string, slug: string) => {
  const posts = getSortedPostList();
  const currentIndex = posts.findIndex(
    post => post.slug === slug && post.category === category,
  );

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
};

/**
 * Return list of all unique tags from all posts
 */
const getAllTags = () => {
  // 태그 캐시가 있으면 반환
  if (allTagsCache) {
    return allTagsCache;
  }

  const posts = getSortedPostList(); // 캐시된 포스트 데이터 사용
  const tags = posts.flatMap(post => post.tags);

  const tagsWithCount = tags.reduce(
    (acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const sortedTags = Object.entries(tagsWithCount)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  // 태그 캐시에 저장
  allTagsCache = sortedTags;
  return sortedTags;
};

/**
 * Return list of posts filtered by tag
 */
const getSortedPostListByTag = (tag: string, sortFn = ascendingSortFn) => {
  const posts = getSortedPostList(sortFn); // 캐시된 데이터 사용
  return posts.filter(post => post.tags.includes(tag));
};

export {
  getPostPath,
  getAllPostPaths,
  getAllCategories,
  getSortedPostList,
  getSortedPostListByCategory,
  getPostData,
  getAllTags,
  getSortedPostListByTag,
};
