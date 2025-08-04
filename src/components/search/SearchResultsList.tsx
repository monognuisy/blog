import type { SearchResult } from '@/types/search';
import { SearchResultCard } from './SearchResultCard';

interface SearchResultsListProps {
  searchQuery: string;
  results: SearchResult[];
  isLoading: boolean;
  isFetching?: boolean;
  error: Error | null;
  closeModal: () => void;
}

export const SearchResultsList = ({
  searchQuery,
  results,
  isLoading,
  isFetching = false,
  error,
  closeModal,
}: SearchResultsListProps) => {
  // 도움말 (검색어가 없을 때)
  if (!searchQuery) {
    return (
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
    );
  }

  // 로딩 상태
  if (isLoading) {
    return (
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
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="mb-2 text-red-500">⚠️ 검색 중 오류가 발생했습니다</div>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          {error.message}
        </p>
      </div>
    );
  }

  // 검색 결과
  return (
    <div className="p-4">
      {results.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="text-gray-600 text-sm dark:text-gray-400">
              <strong>{`"${searchQuery}"`}</strong>에 대한 검색 결과{' '}
              {results.length}개
            </div>
            {/* 백그라운드 로딩 인디케이터 */}
            {isFetching && (
              <div className="flex items-center text-gray-500 text-xs dark:text-gray-400">
                <div className="mr-1 h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                업데이트 중...
              </div>
            )}
          </div>
          <div className={`space-y-3 ${isFetching ? 'opacity-80' : ''}`}>
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
  );
};
