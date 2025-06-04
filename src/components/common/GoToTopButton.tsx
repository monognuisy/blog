'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 스크롤
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 md:right-8 md:bottom-8 rounded-full bg-white dark:bg-dark-bg
            border-2 dark:border-gray-800 w-10 h-10 md:w-10 md:h-10 flex justify-center items-center 
            shadow-lg text-sm"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
