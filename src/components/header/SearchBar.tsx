'use client';

import ky from 'ky';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

interface SearchResult {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  cover: string | null;
  date: string;
  matchedTitle: string | null;
  matchedDescription: string | null;
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
        className="rounded bg-yellow-200 px-1 dark:bg-yellow-800"
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

  const toggleModalOpen = useCallback(() => {
    setIsModalOpen(prev => !prev);
    if (!isModalOpen) {
      // 모달이 열릴 때 초기화
      setSearchQuery('');
      setResults([]);
      setError(null);
    }
  }, [isModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

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

      const response = await ky.get(`/api/search?${params}`);
      const data: SearchResponse = await response.json<SearchResponse>();

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
  }, [toggleModalOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 시에는 즉시 검색 실행
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <button type="button" onClick={toggleModalOpen}>
          <Search strokeWidth={2} style={{ fontSize: '24px' }} />
        </button>
      </div>

      {/* 검색 모달 */}
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 z-50 flex h-[100vh] w-dvw items-start justify-center bg-black/50 pt-20"
          onClick={toggleModalOpen}
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
                {/* 도움말 (검색어가 없을 때) */}
                {!searchQuery && (
                  <div className="p-4">
                    <div className="text-gray-500 dark:text-gray-400">
                      <p className="mb-4 font-medium">검색 도움말</p>
                      <ul className="list-inside list-disc space-y-2 text-sm">
                        <li>제목과 설명에서 검색합니다</li>
                        <li>
                          <kbd className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
                            Ctrl + Shift + K
                          </kbd>
                          로 검색창을 열 수 있습니다
                        </li>
                        <li>
                          <kbd className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">
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
                          className="animate-pulse rounded-lg border border-gray-200 p-3 dark:border-gray-600"
                        >
                          <div className="mb-2 flex justify-between">
                            <div className="h-3 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                            <div className="h-3 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
                          </div>
                          <div className="mb-1 h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
                          <div className="h-3 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 에러 상태 */}
                {error && searchQuery && !isLoading && (
                  <div className="p-4 text-center">
                    <div className="mb-2 text-red-500">
                      ⚠️ 검색 중 오류가 발생했습니다
                    </div>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                      {error}
                    </p>
                  </div>
                )}

                {/* 검색 결과 */}
                {searchQuery && !isLoading && !error && (
                  <div className="p-4">
                    {results.length > 0 ? (
                      <>
                        <div className="mb-4 text-gray-600 text-sm dark:text-gray-400">
                          <strong>{`"${searchQuery}"`}</strong>에 대한 검색 결과{' '}
                          {results.length}개
                        </div>
                        <div className="space-y-3">
                          {results.map(result => (
                            <SearchResultCard
                              key={result.id}
                              result={result}
                              searchQuery={searchQuery}
                              closeModal={closeModal}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="mb-2 text-gray-500 dark:text-gray-400">
                          🔍 검색 결과가 없습니다
                        </div>
                        <p className="text-gray-600 text-sm dark:text-gray-400">
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

interface SearchResultCardProps {
  result: SearchResult;
  searchQuery: string;
  closeModal: () => void;
}

const SearchResultCard = ({
  result,
  searchQuery,
  closeModal,
}: SearchResultCardProps) => {
  return (
    <Link
      href={`/${result.slug}`}
      onClick={closeModal} // 링크 클릭 시 모달 닫기
      className="block rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      <div className="mb-1 flex items-start justify-between">
        <span className="font-medium text-blue-600 text-xs dark:text-blue-400">
          {result.category}
        </span>
        <span className="text-gray-500 text-xs dark:text-gray-400">
          {new Date(result.date).toLocaleDateString('ko-KR')}
        </span>
      </div>

      <h4 className="mb-1 line-clamp-1 font-medium text-gray-900 text-sm dark:text-gray-100">
        {highlightText(result.title, searchQuery)}
      </h4>

      {result.description && (
        <p className="line-clamp-2 text-gray-600 text-xs dark:text-gray-300">
          {highlightText(result.description, searchQuery)}
        </p>
      )}

      {result.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {result.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600 text-xs dark:bg-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default SearchBar;
