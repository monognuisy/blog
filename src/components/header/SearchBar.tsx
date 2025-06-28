'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  cover: string | null;
  date: string;
  titleMatch: boolean;
  descriptionMatch: boolean;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  error?: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

const SearchBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
    if (!isModalOpen) {
      // 모달이 열릴 때 초기화
      setSearchQuery('');
      setResults([]);
      setError(null);
    }
  };

  // 디바운싱된 검색 함수
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        limit: '8', // 모달에서는 결과를 제한
      });

      const response = await fetch(`/api/search?${params}`);
      const data: SearchResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '검색 중 오류가 발생했습니다.');
      }

      setResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.',
      );
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 디바운싱 효과
  useEffect(() => {
    if (!isModalOpen) return;

    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms 디바운싱

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isModalOpen, performSearch]);

  // 키보드 단축키 처리
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 시에는 즉시 검색 실행
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  const SearchResultCard = ({ result }: { result: SearchResult }) => (
    <Link
      href={`/${result.category}/${result.slug}`}
      onClick={() => setIsModalOpen(false)} // 링크 클릭 시 모달 닫기
      className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors"
    >
      <div className="flex justify-between items-start mb-1">
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          {result.category}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(result.date).toLocaleDateString('ko-KR')}
        </span>
      </div>

      <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-gray-100 line-clamp-1">
        {highlightText(result.title, searchQuery)}
      </h4>

      {result.description && (
        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
          {highlightText(result.description, searchQuery)}
        </p>
      )}

      {result.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {result.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );

  return (
    <>
      <div className="flex items-center">
        <button onClick={toggleModalOpen}>
          <Search strokeWidth={2} style={{ fontSize: '24px' }} />
        </button>
      </div>

      {/* 검색 모달 */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-dvw h-[100vh] bg-black/50 flex justify-center items-start pt-20 z-50"
          onClick={toggleModalOpen}
        >
          <div className="w-[700px] max-w-[90vw] mx-auto px-4">
            <div
              className="w-full rounded-lg bg-white dark:bg-gray-800 mx-auto shadow-xl max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 검색 입력 */}
              <form
                onSubmit={handleFormSubmit}
                className="p-4 border-b border-gray-200 dark:border-gray-700"
              >
                <input
                  type="text"
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-lg bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none placeholder-gray-500"
                  autoFocus
                />
              </form>

              {/* 검색 결과 영역 */}
              <div className="flex-1 overflow-y-auto">
                {/* 도움말 (검색어가 없을 때) */}
                {!searchQuery && (
                  <div className="p-4">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="mb-4 font-medium">검색 도움말</p>
                      <ul className="text-sm space-y-2">
                        <li>• 제목과 설명에서 검색합니다</li>
                        <li>
                          •{' '}
                          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            Ctrl+Shift+K
                          </kbd>
                          로 검색창을 열 수 있습니다
                        </li>
                        <li>
                          •{' '}
                          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            ESC
                          </kbd>
                          로 검색창을 닫을 수 있습니다
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* 로딩 상태 */}
                {isLoading && searchQuery && (
                  <div className="p-4">
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
                        >
                          <div className="flex justify-between mb-2">
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                          </div>
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 에러 상태 */}
                {error && searchQuery && !isLoading && (
                  <div className="p-4 text-center">
                    <div className="text-red-500 mb-2">
                      ⚠️ 검색 중 오류가 발생했습니다
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* 검색 결과 */}
                {searchQuery && !isLoading && !error && (
                  <div className="p-4">
                    {results.length > 0 ? (
                      <>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          <strong>"{searchQuery}"</strong>에 대한 검색 결과{' '}
                          {results.length}개
                        </div>
                        <div className="space-y-3">
                          {results.map((result) => (
                            <SearchResultCard key={result.id} result={result} />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-500 dark:text-gray-400 mb-2">
                          🔍 검색 결과가 없습니다
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          다른 검색어를 시도해보세요.
                        </p>
                      </div>
                    )}
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
