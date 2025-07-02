'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/styles';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let hideTimer: NodeJS.Timeout | null = null;

    const toggleVisibility = () => {
      setIsVisible(true);

      // 기존 타이머가 있다면 취소
      if (hideTimer) {
        clearTimeout(hideTimer);
      }

      // 3초 후에 버튼 숨기기
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  return (
    <div
      className={cn(
        'fixed right-6 bottom-6 rounded-md bg-white md:right-8 md:bottom-8 dark:bg-dark-bg',
        'border dark:border-neutral-700',
        'z-50 text-sm shadow-lg',
        'flex flex-col items-center justify-center opacity-80 transition-opacity duration-300',
        isVisible ? 'opacity-80' : 'opacity-0',
      )}
    >
      <button
        type="button"
        onClick={scrollToTop}
        className="border-b p-2 transition-transform duration-300 hover:scale-110 dark:border-neutral-700"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={scrollToBottom}
        className="p-2 transition-transform duration-300 hover:scale-110"
      >
        <ArrowDown className="h-5 w-5" />
      </button>
    </div>
  );
};

export default GoToTopButton;
