import { TFrontmatter } from '@/app/_types/post';

type TContentHeader = {
  id: string;
  category: string;
  slug: string;
} & TFrontmatter;

export type { TContentHeader };
