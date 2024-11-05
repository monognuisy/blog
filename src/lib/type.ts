import { TFrontmatter } from '@/app/_types/post';

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
