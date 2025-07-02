'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollState {
  // 세로 스크롤 상태
  isAtTop: boolean;
  isAtBottom: boolean;
  // 가로 스크롤 상태
  isAtLeft: boolean;
  isAtRight: boolean;
}

interface ScrollableMaskProps {
  children: ReactNode;
  className?: string;
  direction?: 'vertical' | 'horizontal' | 'both';
  maskSize?: number; // 마스크 크기 (px)
  ref?: React.RefObject<HTMLDivElement>;
}

const ScrollableMask = ({
  children,
  className = '',
  direction = 'vertical',
  maskSize = 20,
  ref,
}: ScrollableMaskProps) => {
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = ref || innerContainerRef;
  const [scrollState, setScrollState] = useState<ScrollState>({
    isAtTop: true,
    isAtBottom: false,
    isAtLeft: true,
    isAtRight: false,
  });

  useEffect(() => {
    // 스크롤 상태 확인 함수
    const checkScrollState = (container: HTMLDivElement): ScrollState => {
      const threshold = 5; // 스크롤 끝 판정 임계값

      return {
        isAtTop: container.scrollTop <= threshold,
        isAtBottom:
          container.scrollTop + container.clientHeight >=
          container.scrollHeight - threshold,
        isAtLeft: container.scrollLeft <= threshold,
        isAtRight:
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - threshold,
      };
    };

    if (!containerRef.current) return;

    const container = containerRef.current;
    let ticking = false;

    const handleScroll = (): void => {
      const newScrollState = checkScrollState(container);

      // 상태가 실제로 변경되었을 때만 업데이트
      setScrollState(prevState => {
        if (
          prevState.isAtTop !== newScrollState.isAtTop ||
          prevState.isAtBottom !== newScrollState.isAtBottom ||
          prevState.isAtLeft !== newScrollState.isAtLeft ||
          prevState.isAtRight !== newScrollState.isAtRight
        ) {
          return newScrollState;
        }
        return prevState;
      });
    };

    // requestAnimationFrame을 사용한 쓰로틀링으로 성능 최적화
    const throttledScrollHandler = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // 초기 상태 설정
    handleScroll();

    container.addEventListener('scroll', throttledScrollHandler, {
      passive: true,
    });

    // ResizeObserver로 컨테이너 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(container);

    return () => {
      container.removeEventListener('scroll', throttledScrollHandler);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  const shouldShowTopMask =
    (direction === 'vertical' || direction === 'both') && !scrollState.isAtTop;
  const shouldShowBottomMask =
    (direction === 'vertical' || direction === 'both') &&
    !scrollState.isAtBottom;
  const shouldShowLeftMask =
    (direction === 'horizontal' || direction === 'both') &&
    !scrollState.isAtLeft;
  const shouldShowRightMask =
    (direction === 'horizontal' || direction === 'both') &&
    !scrollState.isAtRight;

  return (
    <div className="relative">
      {/* 스크롤 컨테이너 */}
      <div ref={containerRef} className={className}>
        {children}
      </div>

      {/* 마스크 오버레이들 */}
      {shouldShowTopMask && (
        <div
          className="pointer-events-none absolute top-0 right-0 left-0 z-10 bg-gradient-to-b from-white to-transparent dark:from-neutral-900"
          style={{ height: `${maskSize}px` }}
        />
      )}

      {shouldShowBottomMask && (
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 bg-gradient-to-t from-white to-transparent dark:from-neutral-900"
          style={{ height: `${maskSize}px` }}
        />
      )}

      {shouldShowLeftMask && (
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 bg-gradient-to-r from-white to-transparent dark:from-neutral-900"
          style={{ width: `${maskSize}px` }}
        />
      )}

      {shouldShowRightMask && (
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 bg-gradient-to-l from-white to-transparent dark:from-neutral-900"
          style={{ width: `${maskSize}px` }}
        />
      )}
    </div>
  );
};

export default ScrollableMask;
