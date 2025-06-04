export type TFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  categories: string;
  cover?: string;
  draft?: boolean;
};

export type TMetadata = {
  title: string;
  description: string;
  image: string;
  siteName: string;
};
