import { compileMDX, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { TFrontmatter } from '@/app/_types/post';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { mathMacros } from './constants';
import rehypePrism from 'rehype-prism-plus';

type TCustomMDXOptions = {
  source: MDXRemoteProps['source'];
  options?: MDXRemoteProps['options'];
  components?: MDXRemoteProps['components'];
};

const customMDX = <T>({ source, options, components }: TCustomMDXOptions) => {
  const defaultOptions = {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        [
          rehypeKatex,
          {
            macros: mathMacros,
            strict: false,
          },
        ],
        rehypePrism,
      ],
    },
  } satisfies MDXRemoteProps['options'];

  return compileMDX<T>({
    source,
    options: options ?? defaultOptions,
    components,
  });
};

export default customMDX;
