import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import LinkCard from './LinkCard';
import Pre, { TPreProps } from './codeblock/Pre';
import Link from 'next/link';

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
        <>
          <Link href={`/images/post/${category}/${slug}/${props.src}`}>
            <Image
              {...props}
              alt={props.alt || ''}
              src={`/images/post/${category}/${slug}/${props.src}`}
              width={1024}
              height={1024}
              className="w-full max-w-[768px] h-auto mx-auto"
            />
          </Link>
          <em className="inline-block mt-2 image-caption">{props.alt}</em>
        </>
      )}
    </>
  ),
  a: (props) => <Link href={props.href ?? ''} {...props} />,
  pre: (props) => <Pre {...(props as TPreProps)} />,
  Highlight,
  LinkCard,
});

export default CustomMDXComponents;
