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
        'fixed right-6 bottom-6 md:right-8 md:bottom-8 rounded-md bg-white dark:bg-dark-bg',
        'border-2 dark:border-neutral-800',
        'shadow-lg text-sm',
        'flex flex-col justify-center items-center transition-opacity duration-300 opacity-80',
        isVisible ? 'opacity-80' : 'opacity-0',
      )}
    >
      <button
        onClick={scrollToTop}
        className="hover:scale-110 transition-all duration-300 border-b-2 dark:border-neutral-800 p-1.5"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
      <button
        onClick={scrollToBottom}
        className="hover:scale-110 transition-all duration-300 p-1.5"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </div>
  );
};

export default GoToTopButton;
