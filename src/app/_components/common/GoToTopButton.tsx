'use client';

import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

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
          className="fixed right-[24px] bottom-[24px] md:right-[48px] md:bottom-[48px] rounded-full 
            border-2 w-[32px] h-[32px] md:w-[48px] md:h-[48px] flex justify-center items-center 
            bg-white shadow-lg text-xl"
        >
          <ArrowUpwardIcon className="text-xl md:text-2xl" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
