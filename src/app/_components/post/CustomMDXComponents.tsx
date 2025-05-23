import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import LinkCard from './LinkCard';
import Pre, { TPreProps } from './codeblock/Pre';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/styles';

type THighlightProps = {
  color: 'blue' | 'red' | 'yellow';
  children: React.ReactNode;
};
const Highlight = ({ color = 'blue', children }: THighlightProps) => {
  return <span className={`mdx highlight ${color}`}>{children}</span>;
};

// 텍스트에서 ID 생성 함수
const generateIdFromText = (text: string | React.ReactNode): string => {
  const defaultRandomId =
    'header-' + Math.random().toString(36).substring(2, 9);
  if (!text) return defaultRandomId;

  const generator = (text: string | React.ReactNode): string => {
    // ReactNode인 경우 문자열로 변환 시도
    let textContent = '';
    if (typeof text === 'string') {
      textContent = text;
    } else if (Array.isArray(text)) {
      textContent = text.map((item) => generateIdFromText(item)).join('');
    } else if (typeof text === 'object' && text !== null) {
      // 간단한 텍스트 추출 로직
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        textContent = generateIdFromText((text as any).props.children);
      } catch {
        textContent = defaultRandomId;
      }
    }

    return (
      textContent
        .toLowerCase()
        .replace(/\s+/g, '-') // 공백을 대시로 변환
        .replace(/--+/g, '-') // 여러 대시를 하나로 압축
        .trim() || defaultRandomId
    ); // 빈 문자열이면 랜덤 ID 생성
  };

  return generator(text);
};

/**
 * Custom MDX components
 * Including Highlight
 */
const CustomMDXComponents = (
  category: string,
  slug: string,
): React.ComponentProps<typeof MDXProvider>['components'] => {
  return {
    h1: (props) => {
      const id = props.id || generateIdFromText(props.children);
      return <h1 id={id} className="text-3xl font-bold mt-6 mb-4" {...props} />;
    },
    h2: (props) => {
      const id = props.id || generateIdFromText(props.children);
      return (
        <div className="*:text-2xl *:font-bold mt-8 mb-4 pt-6 border-t border-gray-200 dark:border-gray-700 relative group">
          <HeaderAnchor level={2} id={id} className="top-6" />
          <h2 id={id} className="m-0 p-0" {...props} />
        </div>
      );
    },
    h3: (props) => {
      const id = props.id || generateIdFromText(props.children);
      return (
        <div className="*:text-xl *:font-semibold mt-6 mb-3 pt-4 relative group">
          <HeaderAnchor level={3} id={id} className="top-4" />
          <h3 id={id} className="m-0 p-0" {...props} />
        </div>
      );
    },
    h4: (props) => {
      const id = props.id || generateIdFromText(props.children);
      return (
        <div className="*:text-lg *:font-medium mt-4 mb-2 relative group">
          <HeaderAnchor level={4} id={id} className="top-0" />
          <h4 id={id} className="m-0 p-0" {...props} />
        </div>
      );
    },
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
  };
};

export default CustomMDXComponents;

interface IHeaderAnchorProps {
  id: string;
  level: 2 | 3 | 4;
  className?: string;
}

const HeaderAnchor = ({ level, id, className }: IHeaderAnchorProps) => {
  return (
    <Link
      href={`#${id}`}
      className={cn(
        'group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out absolute text-right -left-2 -translate-x-full cursor-pointer',
        className,
      )}
    >
      {`#`.repeat(level - 1)}
    </Link>
  );
};
