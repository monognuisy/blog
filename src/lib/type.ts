import { TFrontmatter } from '@/types/post';

type TContentHeader = {
  id: string;
  category: string;
  slug: string;
} & TFrontmatter;

type TBlogURLParam = {
  category: string;
  slug: string;
};

export type { TContentHeader, TBlogURLParam };
