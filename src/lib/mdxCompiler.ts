import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { mathMacros } from './constants';
import {
  rehypeCodePostProcess,
  rehypeCodePreProcess,
} from './plugins/rehype-pre-raw';

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
        rehypeCodePreProcess,
        [
          rehypeKatex,
          {
            macros: mathMacros,
            strict: false,
          },
        ],
        rehypePrism,
        rehypeCodePostProcess,
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
