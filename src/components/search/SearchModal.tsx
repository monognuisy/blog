import { useEffect } from 'react';
import type { SearchResult } from '@/types/search';
import { SearchResultsList } from './SearchResultsList';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  performSearch: (query: string) => void;
}

export const SearchModal = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  results,
  isLoading,
  error,
  performSearch,
}: SearchModalProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 시에는 즉시 검색 실행
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 flex h-[100vh] w-dvw items-start justify-center bg-black/50 pt-20"
      onClick={onClose}
    >
      <div className="mx-auto w-[700px] max-w-[90vw] px-4">
        <div
          className="mx-auto flex max-h-[80vh] w-full flex-col overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800"
          onClick={e => e.stopPropagation()}
        >
          {/* 검색 입력 */}
          <form
            onSubmit={handleFormSubmit}
            className="border-gray-200 border-b p-4 dark:border-gray-700"
          >
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-gray-900 text-lg placeholder-gray-500 focus:outline-none dark:text-gray-100"
            />
          </form>

          {/* 검색 결과 영역 */}
          <div className="flex-1 overflow-y-auto">
            <SearchResultsList
              searchQuery={searchQuery}
              results={results}
              isLoading={isLoading}
              error={error}
              closeModal={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
