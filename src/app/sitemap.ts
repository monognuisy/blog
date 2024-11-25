import { getSortedPostList } from '@/lib/getBlogPost';
import { MetadataRoute } from 'next';

const defaultSitemap = [
  {
    url: `${process.env.NEXT_PUBLIC_URI}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.7,
  },
  {
    url: `${process.env.NEXT_PUBLIC_URI}/announcement`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.5,
  },
] satisfies MetadataRoute.Sitemap;

const getBlogSitemap = async () => {
  const blogPosts = await getSortedPostList();
  return [
    ...blogPosts.map((post) => ({
      url: `${process.env.NEXT_PUBLIC_URI}/${post.category}/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'daily',
      priority: 1,
    })),
  ];
};

const sitemap = async () => {
  return [...defaultSitemap, ...(await getBlogSitemap())];
};

export default sitemap;
