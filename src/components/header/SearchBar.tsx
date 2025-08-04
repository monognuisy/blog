'use client';

import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { SearchModal } from '@/components/search/SearchModal';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalOpen = () => {
    setIsModalOpen(prev => !prev);
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 키보드 단축키 처리 (Ctrl + Shift + K로 모달 열기)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <overengineering>
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.ctrlKey &&
        event.shiftKey &&
        (event.key === 'k' || event.key === 'K')
      ) {
        event.preventDefault();
        toggleModalOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="flex items-center">
        <button type="button" onClick={toggleModalOpen}>
          <Search strokeWidth={2} style={{ fontSize: '24px' }} />
        </button>
      </div>

      <SearchModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default SearchBar;
