import type { TFrontmatter } from '@/types/post';

type BlogPostingSchema = {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description?: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified?: string;
  image?: {
    '@type': 'ImageObject';
    url: string;
    width?: number;
    height?: number;
  };
  keywords?: string[];
  articleSection?: string;
  url: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
  inLanguage: 'ko-KR';
};

type BlogSchema = {
  '@context': 'https://schema.org';
  '@type': 'Blog';
  name: string;
  description: string;
  url: string;
  author: {
    '@type': 'Person';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  inLanguage: 'ko-KR';
};

type CollectionPageSchema = {
  '@context': 'https://schema.org';
  '@type': 'CollectionPage';
  name: string;
  description: string;
  url: string;
  mainEntity: {
    '@type': 'ItemList';
    numberOfItems: number;
    itemListElement: Array<{
      '@type': 'ListItem';
      position: number;
      item: {
        '@type': 'BlogPosting';
        headline: string;
        url: string;
        datePublished: string;
        author: {
          '@type': 'Person';
          name: string;
        };
      };
    }>;
  };
  inLanguage: 'ko-KR';
};

interface BlogPostingStructuredDataProps {
  frontmatter: TFrontmatter;
  category: string;
  slug: string;
}

interface CollectionPageStructuredDataProps {
  category: string;
  posts: Array<{
    title: string;
    slug: string;
    category: string;
    date: string;
  }>;
}

/**
 * 개별 블로그 포스트를 위한 JSON-LD 구조화 데이터
 */
export const BlogPostingStructuredData = ({
  frontmatter,
  category,
  slug,
}: BlogPostingStructuredDataProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_URI || 'https://monognuisy.vercel.app';
  const postUrl = `${baseUrl}/${category}/${slug}`;
  const coverImageUrl = frontmatter.cover
    ? `${baseUrl}/images/cover/${frontmatter.cover}.webp`
    : `${baseUrl}/images/cover/blog-cover.webp`;

  const schema: BlogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    author: {
      '@type': 'Person',
      name: 'monognuisy',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'monognuisy blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/favicon-32x32.png`,
      },
    },
    datePublished: frontmatter.date,
    dateModified: frontmatter.date, // 수정일 필드가 없으므로 발행일과 동일하게 설정
    image: {
      '@type': 'ImageObject',
      url: coverImageUrl,
      width: 1200,
      height: 630,
    },
    keywords: frontmatter.tags,
    articleSection: frontmatter.categories,
    url: postUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    inLanguage: 'ko-KR',
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: necessary
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

/**
 * 블로그 메인 페이지를 위한 JSON-LD 구조화 데이터
 */
export const BlogStructuredData = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_URI || 'https://monognuisy.vercel.app';

  const schema: BlogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'monognuisy blog',
    description: 'Technical blog about web development, programming, and more.',
    url: baseUrl,
    author: {
      '@type': 'Person',
      name: 'monognuisy',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'monognuisy blog',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/favicon-32x32.png`,
      },
    },
    inLanguage: 'ko-KR',
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: necessary
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};

/**
 * 카테고리 페이지를 위한 JSON-LD 구조화 데이터
 */
export const CollectionPageStructuredData = ({
  category,
  posts,
}: CollectionPageStructuredDataProps) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_URI || 'https://monognuisy.vercel.app';
  const categoryUrl = `${baseUrl}/${category}`;

  const schema: CollectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} - monognuisy blog`,
    description: `${category} 카테고리의 블로그 포스트 목록`,
    url: categoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          url: `${baseUrl}/${post.category}/${post.slug}`,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: 'monognuisy',
          },
        },
      })),
    },
    inLanguage: 'ko-KR',
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: necessary
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
};
