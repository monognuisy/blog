'use client';

import { Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { SearchModal } from '@/components/search/SearchModal';
import { useSearch } from '@/hooks/useSearch';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    results,
    isLoading,
    error,
    performSearch,
    resetSearch,
  } = useSearch();

  const toggleModalOpen = useCallback(() => {
    setIsModalOpen(prev => !prev);
    if (!isModalOpen) {
      // 모달이 열릴 때 초기화
      resetSearch();
    }
  }, [isModalOpen, resetSearch]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // 키보드 단축키 처리 (Ctrl + Shift + K로 모달 열기)
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
  }, [toggleModalOpen]);

  return (
    <>
      <div className="flex items-center">
        <button type="button" onClick={toggleModalOpen}>
          <Search strokeWidth={2} style={{ fontSize: '24px' }} />
        </button>
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={results}
        isLoading={isLoading}
        error={error}
        performSearch={performSearch}
      />
    </>
  );
};

export default SearchBar;
