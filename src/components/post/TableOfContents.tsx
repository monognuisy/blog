'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export type TocItem = {
  id: string; // 헤더 요소의 ID
  text: string; // 헤더 텍스트
  level: number; // 헤더 레벨 (1, 2, 3)
};

interface TableOfContentsProps {
  toc?: TocItem[]; // 서버에서 전달된 목차 (선택적)
}

const TableOfContents = ({ toc: initialToc = [] }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const [toc, setToc] = useState<TocItem[]>(initialToc);

  // 클라이언트 측에서 헤더 추출
  useEffect(() => {
    const extractTocFromDOM = () => {
      // h2, h3, h4 헤더만 선택
      const headings = document.querySelectorAll('h2, h3, h4');
      const newToc: TocItem[] = [];

      headings.forEach((heading) => {
        const id = heading.id;
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.charAt(1), 10);

        if (id && text) {
          newToc.push({ id, text, level });
        }
      });

      setToc(newToc);
    };

    // DOM이 완전히 로드된 후 목차 추출
    extractTocFromDOM();
  }, []);

  // 스크롤에 따른 현재 섹션 표시
  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66%' },
    );

    // 헤더 요소들 관찰 시작
    toc.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  // 스크롤 오프셋 계산 함수 (헤더 높이를 고려)
  const scrollToHeader = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 120; // 헤더 높이 + 여유 공간
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <aside className="toc-container sticky mt-20 top-20 z-10 w-64 h-fit p-4 hidden lg:block text-sm">
      <nav>
        <ul className="space-y-2">
          {toc.map(({ id, text, level }) => {
            // 레벨에 따른 들여쓰기 및 스타일 적용 (h2부터 시작하므로 조정)
            const indentClass =
              level === 2 ? '' : level === 3 ? 'ml-3' : 'ml-6';
            const fontSize = level === 2 ? 'text-sm' : 'text-xs';

            return (
              <li key={id} className={`toc-item ${indentClass}`}>
                <Link
                  href={`#${id}`}
                  className={`block ${fontSize} pb-1 hover:text-primary dark:hover:text-primary-dark transition-colors ${
                    activeId === id
                      ? 'text-primary dark:text-primary-dark font-bold '
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToHeader(id); // 커스텀 스크롤 함수 사용
                  }}
                >
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default TableOfContents;
