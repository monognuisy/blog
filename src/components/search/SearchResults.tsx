'use client';

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

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  isLoading?: boolean;
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

function SearchResultCard({
  result,
  query,
}: {
  result: SearchResult;
  query: string;
}) {
  return (
    <Link href={`/${result.category}/${result.slug}`}>
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {result.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(result.date).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {highlightText(result.title, query)}
        </h3>

        {result.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {highlightText(result.description, query)}
          </p>
        )}

        {result.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {result.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{result.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export function SearchResults({
  results,
  query,
  isLoading,
  error,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex justify-between mb-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              </div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">⚠️ 검색 중 오류가 발생했습니다</div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 mb-2">
          🔍 검색 결과가 없습니다
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          다른 검색어를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <strong>"{query}"</strong>에 대한 검색 결과 {results.length}개
      </div>

      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} query={query} />
      ))}
    </div>
  );
}
