'use client';

import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import useMediaQuery from '@/hooks/useMediaQuery';
import ScrollableMask from '../common/ScrollableMask';

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
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    isAtTop: true,
    isAtBottom: false,
  });

  // 클라이언트 측에서 헤더 추출
  useEffect(() => {
    const extractTocFromDOM = () => {
      // h2, h3, h4 헤더만 선택
      const headings = document.querySelectorAll('h2, h3, h4');
      const newToc: TocItem[] = [];

      headings.forEach((heading) => {
        const text = heading.textContent || '';
        const level = parseInt(heading.tagName.charAt(1), 10);
        const id = heading.id;

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

  // 페이지 스크롤에 따른 목차 자동 스크롤
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const scrollPortion =
        Math.max(currentScrollY - innerHeight, 0) /
        (scrollHeight - 2 * innerHeight);

      if (tocContainerRef.current) {
        const container = tocContainerRef.current;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        container.scrollTo({
          top: scrollPortion * (scrollHeight - clientHeight),
        });

        // 목차 컨테이너의 스크롤 상태 확인
        const containerScrollTop = container.scrollTop;
        const containerScrollHeight = container.scrollHeight;
        const containerClientHeight = container.clientHeight;

        const newScrollState = {
          isAtTop: containerScrollTop <= 5,
          isAtBottom:
            containerScrollTop + containerClientHeight >=
            containerScrollHeight - 5,
        };

        // 상태가 실제로 변경되었을 때만 업데이트
        if (
          newScrollState.isAtTop !== scrollState.isAtTop ||
          newScrollState.isAtBottom !== scrollState.isAtBottom
        ) {
          setScrollState(newScrollState);
        }
      }
    };

    // requestAnimationFrame을 사용한 쓰로틀링으로 성능 최적화
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    if (window) {
      window.addEventListener('scroll', throttledScrollHandler, {
        passive: true,
      });
    }

    return () => {
      if (window) {
        window.removeEventListener('scroll', throttledScrollHandler);
      }
    };
  }, [scrollState]);

  // 스크롤 오프셋 계산 함수 (헤더 높이를 고려)
  const scrollToHeader = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const headerOffset = 80; // 헤더 높이 + 여유 공간
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }, []);

  if (toc.length === 0) {
    return null;
  }

  return (
    <>
      <aside
        // ref={tocContainerRef}
        className={`sticky mt-20 top-20 z-10 w-full scrollbar-hide`}
      >
        <ScrollableMask
          ref={tocContainerRef as React.RefObject<HTMLDivElement>}
          direction="vertical"
          className="h-fit max-h-[calc(100vh-120px)] overflow-y-auto p-4 text-sm scrollbar-hide"
          maskSize={30}
        >
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
        </ScrollableMask>
      </aside>
    </>
  );
};

const TableOfContentsWrapper = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  if (isMobile) {
    return null;
  }

  return <TableOfContents />;
};

export default TableOfContentsWrapper;
