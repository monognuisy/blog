'use client';

import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsModalOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

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
      if (event.key === 'Escape') {
        setIsModalOpen(false);
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
        <button onClick={toggleModalOpen}>
          <Search style={{ fontSize: '24px', color: 'gray' }} />
        </button>
      </div>

      {/* 검색 모달 */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-dvw h-[100vh] bg-black/50 flex justify-center items-center z-50"
          onClick={toggleModalOpen}
        >
          <div className="w-[600px] max-w-[90vw] mx-auto px-4">
            <div
              className="w-full rounded-md bg-white dark:bg-gray-800 mx-auto shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-b-2 border-gray-200 dark:border-gray-700 rounded-md rounded-b-none p-4 w-full text-xl bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </form>
              <div className="p-4">
                <div className="text-gray-500 dark:text-gray-400">
                  <p className="mb-4">
                    <b>검색 도움말</b>
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="list-none">• 제목과 설명에서 검색합니다</li>
                    <li className="list-none">
                      • 검색 후 카테고리별로 필터링할 수 있습니다
                    </li>
                    <li className="list-none">
                      •{' '}
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        Ctrl+Shift+K
                      </kbd>
                      로 검색창을 열 수 있습니다
                    </li>
                    <li className="list-none">
                      •{' '}
                      <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        ESC
                      </kbd>
                      로 검색창을 닫을 수 있습니다
                    </li>
                  </ul>
                </div>

                {searchQuery && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={handleSearch}
                      className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                    >
                      <Search size={16} />
                      <span>"{searchQuery}" 검색하기</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
