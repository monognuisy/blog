import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';

type THighlightProps = {
  color: 'blue' | 'red' | 'yellow';
  children: React.ReactNode;
};
const Highlight = ({ color = 'blue', children }: THighlightProps) => {
  return <span className={`mdx highlight ${color}`}>{children}</span>;
};

/**
 * Custom MDX components
 * Including Highlight
 */
const CustomMDXComponents = (
  category: string,
  slug: string,
): React.ComponentProps<typeof MDXProvider>['components'] => ({
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 className="font-bold" {...props} />,
  img: (props) => (
    <>
      {props.src && (
        <Image
          {...props}
          alt={props.alt || ''}
          src={`/images/post/${category}/${slug}/${props.src}`}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto mx-auto"
        />
      )}
    </>
  ),
  Highlight,
});

export default CustomMDXComponents;
