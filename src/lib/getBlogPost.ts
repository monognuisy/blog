import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { TContentHeader } from './type';
import { serialize } from 'next-mdx-remote/serialize';
import { ascendingSortFn } from './function';
import { TFrontmatter } from '@/app/_types/post';

const postsDirectory = path.join(process.cwd(), 'content/blog');

const getPostPath = (category: string, slug: string) => {
  return path.join(postsDirectory, category, `${slug}.mdx`);
};

/**
 * Return absolute path for every original file of blog post
 */
const getAllPostPaths = () => {
  // Find mdx file recursively.
  const categories = fs.readdirSync(postsDirectory);
  const fileNames = categories.flatMap((category) => {
    const filePath = path.join(postsDirectory, category);

    // Add categories at the front of each file name.
    const names = fs
      .readdirSync(filePath)
      .map((name) => path.join(postsDirectory, category, name));

    return names;
  });

  return fileNames;
};

const getAllCategories = () => {
  const categories = fs.readdirSync(postsDirectory);
  return categories;
};

// TODO: Optimize for pagination.
/**
 * Return list of all blog posts' data
 */
const getSortedPostList = (sortFn = ascendingSortFn) => {
  const fileNames = getAllPostPaths();

  const contents = fileNames.map((fullPath) => {
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
    };
  }) as TContentHeader[];

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

  const categoryPath = path.join(postsDirectory, category);
  const fileNames = fs.readdirSync(categoryPath);

  const contents = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(categoryPath, fileName);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id: `${category}-${slug}`,
      category,
      slug,
      ...matterResult.data,
    };
  }) as TContentHeader[];

  // Sort posts in ascending order.
  const sortedContents = contents.toSorted((a, b) => sortFn(a.date, b.date));

  return sortedContents;
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
    (post) => post.slug === slug && post.category === category,
  );

  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
};

export {
  getPostPath,
  getAllPostPaths,
  getAllCategories,
  getSortedPostList,
  getSortedPostListByCategory,
  getPostData,
};
