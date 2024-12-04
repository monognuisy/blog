import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import LinkCard from './LinkCard';
import Highlight from './Highlight';
import Pre, { TPreProps } from './Pre';
import Link from 'next/link';
import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';

const createHeading = (Tag: 'h2' | 'h3' | 'h4' | 'h5') => {
  const HeadingWrapper = (
    props: DetailedHTMLProps<
      HtmlHTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
  ) => {
    const { children } = props;
    const refId = typeof children === 'string' ? `${children}` : '';
    return (
      <Tag id={refId} {...props} className="scroll-m-24">
        {children}
      </Tag>
    );
  };

  return HeadingWrapper;
};

/**
 * Custom MDX components
 * Including Highlight
 */
const CustomMDXComponents = (
  category: string,
  slug: string,
): React.ComponentProps<typeof MDXProvider>['components'] => {
  const imageURIPrefix =
    category === 'announcement'
      ? `/images/announcement/${slug}`
      : `/images/post/${category}/${slug}`;

  return {
    h2: createHeading('h2'),
    h3: createHeading('h3'),
    h4: createHeading('h4'),
    h5: createHeading('h5'),
    img: (props) => (
      <>
        {props.src && (
          <>
            <Link href={`${imageURIPrefix}/${props.src}`}>
              <Image
                {...props}
                alt={props.alt || ''}
                src={`${imageURIPrefix}/${props.src}`}
                width={0}
                height={0}
                sizes="100%"
                className="w-full h-auto mx-auto"
              />
            </Link>
            <em className="inline-block mt-2 image-caption">{props.alt}</em>
          </>
        )}
      </>
    ),
    pre: (props) => <Pre {...(props as TPreProps)} />,
    Highlight,
    LinkCard,
  };
};

export default CustomMDXComponents;
