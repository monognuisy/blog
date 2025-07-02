import type { MDXProvider } from '@mdx-js/react';
import { LucideLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { cn } from '@/lib/styles';
import Pre, { type TPreProps } from './codeblock/Pre';
import Highlight from './custom/Highlight';
import Note from './custom/Note';
import LinkCard from './LinkCard';

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
        textContent = text.map(item => generator(item)).join('');
      } else if (typeof text === 'object' && text !== null) {
        // 간단한 텍스트 추출 로직
        try {
          // biome-ignore lint/suspicious/noExplicitAny: <>
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
    h1: props => {
      const id = props.id || generateIdFromText(props.children, 1);
      return <h1 id={id} className="mt-6 mb-4 font-bold text-3xl" {...props} />;
    },
    h2: props => {
      const id = props.id || generateIdFromText(props.children, 2);
      return (
        <div className="group relative mt-8 mb-4 flex items-center gap-2 border-gray-200 border-t pt-6 *:font-bold *:text-2xl dark:border-gray-700">
          <h2 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
        </div>
      );
    },
    h3: props => {
      const id = props.id || generateIdFromText(props.children, 3);
      return (
        <div className="group relative mt-6 mb-3 flex items-center gap-2 pt-4 *:font-bold *:text-xl">
          <h3 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
        </div>
      );
    },
    h4: props => {
      const id = props.id || generateIdFromText(props.children, 4);
      return (
        <div className="group relative mt-4 mb-2 flex items-center gap-2 *:font-semibold *:text-lg">
          <h4 id={id} className="m-0 p-0" {...props} />
          <HeaderAnchor id={id} />
        </div>
      );
    },
    h5: props => {
      const id = props.id || generateIdFromText(props.children, 5);
      return (
        <div className="group relative mt-4 mb-2 flex items-center gap-2 *:font-semibold *:text-base">
          <h5 id={id} className="m-0 p-0" {...props} />
        </div>
      );
    },
    img: props => (
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
                className="mx-auto h-auto w-full max-w-[768px]"
              />
            </Link>
            <em className="image-caption mt-2 inline-block">{props.alt}</em>
          </>
        )}
      </>
    ),
    a: props => (
      <Link href={props.href ?? ''} {...props}>
        {props.children}
        <sup className="outer-link text-xs">↗</sup>
      </Link>
    ),
    pre: props => <Pre {...(props as TPreProps)} />,
    table: props => (
      <div className="my-6 overflow-x-auto">
        <table
          className="min-w-full border-collapse overflow-hidden rounded-lg border border-gray-200 text-sm shadow-sm dark:border-neutral-700"
          {...props}
        />
      </div>
    ),
    thead: props => (
      <thead className="bg-gray-50 dark:bg-neutral-800" {...props} />
    ),
    tbody: props => (
      <tbody
        className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900"
        {...props}
      />
    ),
    tr: props => (
      <tr
        className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
        {...props}
      />
    ),
    th: props => (
      <th
        className="border-gray-200 border-b px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase tracking-wider dark:border-neutral-700 dark:text-neutral-300"
        {...props}
      />
    ),
    td: props => (
      <td
        className="border-gray-200 border-b px-4 py-3 text-gray-900 text-sm dark:border-neutral-700 dark:text-neutral-100"
        {...props}
      />
    ),
    IntraContentAnchor,
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
        'cursor-pointer text-gray-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:text-gray-400',
        className,
      )}
    >
      <LucideLink className="h-4 w-4" />
    </Link>
  );
};

interface IIntraContentAnchorProps {
  name: string;
}

const IntraContentAnchor = ({ name }: IIntraContentAnchorProps) => {
  // HTML5에서는 id 사용이 권장되지만, name 속성을 사용하려면 아래와 같이 처리
  return (
    <a
      id={name}
      style={{ scrollMarginTop: '100px' }}
      {...({ name } as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
    />
  );
};
