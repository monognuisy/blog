'use client';

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
          className="fixed right-[50px] bottom-[50px] rounded-full 
            border-2 w-[50px] h-[50px] flex justify-center items-center 
            bg-white shadow-lg text-xl"
        >
          🡩
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
