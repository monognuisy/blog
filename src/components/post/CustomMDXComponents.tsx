import { MDXProvider } from '@mdx-js/react';
import Image from 'next/image';
import LinkCard from './LinkCard';
import Pre, { TPreProps } from './codeblock/Pre';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/styles';
import Highlight from './custom/Highlight';
import Note from './custom/Note';
import { LucideLink } from 'lucide-react';

// 헤더 ID 생성 함수
const generateId = () => {
  const headers: Record<number, number> = {};

  return (text: string | React.ReactNode, level: number) => {
    headers[level] = (headers[level] || 0) + 1;
    const levelLabel = `${level}-${headers[level]}`;

    const generator = (text: string | React.ReactNode): string => {
      // ReactNode인 경우 문자열로 변환 시도
      let textContent = '';
      if (typeof text === 'string') {
        textContent = text;
      } else if (Array.isArray(text)) {
        textContent = text.map((item) => generator(item)).join('');
      } else if (typeof text === 'object' && text !== null) {
        // 간단한 텍스트 추출 로직
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          textContent = generator((text as any).props.children);
        } catch {
          textContent = '';
        }
      }

      return textContent
        .toLowerCase()
        .replace(/\s+/g, '-') // 공백을 대시로 변환
        .replace(/--+/g, '-') // 여러 대시를 하나로 압축
        .trim();
    };

    const formattedHeadingId = `${levelLabel}-${generator(text)}`;

    return formattedHeadingId;
  };
};

/**
 * Custom MDX components
 * Including Highlight
 */
const CustomMDXComponents = (
  category: string,
  slug: string,
): React.ComponentProps<typeof MDXProvider>['components'] => {
  const generateIdFromText = generateId();

  return {
    h1: (props) => {
      const id = props.id || generateIdFromText(props.children, 1);
      return <h1 id={id} className="text-3xl font-bold mt-6 mb-4" {...props} />;
    },
    h2: (props) => {
      const id = props.id || generateIdFromText(props.children, 2);
      return (
        <div className="*:text-2xl *:font-bold mt-8 mb-4 pt-6 border-t border-gray-200 dark:border-gray-700 relative group flex items-center gap-2">
          <h2 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
        </div>
      );
    },
    h3: (props) => {
      const id = props.id || generateIdFromText(props.children, 3);
      return (
        <div className="*:text-xl *:font-semibold mt-6 mb-3 pt-4 relative group flex items-center gap-2">
          <h3 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
        </div>
      );
    },
    h4: (props) => {
      const id = props.id || generateIdFromText(props.children, 4);
      return (
        <div className="*:text-lg *:font-medium mt-4 mb-2 relative group flex items-center gap-2">
          <h4 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
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
    a: (props) => (
      <Link href={props.href ?? ''} {...props}>
        {props.children}
        <sup className="outer-link text-xs">↗</sup>
      </Link>
    ),
    pre: (props) => <Pre {...(props as TPreProps)} />,
    Highlight,
    LinkCard,
    Note,
  };
};

export default CustomMDXComponents;

interface IHeaderAnchorProps {
  id: string;
  className?: string;
}

const HeaderAnchor = ({ id, className }: IHeaderAnchorProps) => {
  return (
    <Link
      href={`#${id}`}
      className={cn(
        'group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out cursor-pointer text-gray-500 dark:text-gray-400',
        className,
      )}
    >
      <LucideLink className="w-4 h-4" />
    </Link>
  );
};
