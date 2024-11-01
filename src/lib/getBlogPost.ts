import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import { TContentHeader } from './type';
import { serialize } from 'next-mdx-remote/serialize';

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

// TODO: Optimize for pagination.
/**
 * Return list of all blog posts' data
 */
const getSortedPostList = () => {
  const fileNames = getAllPostPaths();

  const contents = fileNames.map((fullPath) => {
    const fullNameSplit = fullPath.split('/');
    const category = fullNameSplit[fullNameSplit.length - 2];
    const fileName = fullNameSplit[fullNameSplit.length - 1];

    // Make id by eliminating extensions.
    const id = `${category}-${fileName.replace(/\.mdx$/, '')}`;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  }) as TContentHeader[];

  // Sort posts in ascending order.
  const sortedContents = contents.toSorted((a, b) => {
    if (a.date > b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return sortedContents;
};

/**
 * Generate post data from category and slug.
 */
const getPostData = async (category: string, slug: string) => {
  const filePath = getPostPath(category, slug);
  const fileContents = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContents);
  const mdxSource = await serialize(content);

  return {
    data,
    mdxSource,
  };
};

export { getPostPath, getAllPostPaths, getSortedPostList, getPostData };
