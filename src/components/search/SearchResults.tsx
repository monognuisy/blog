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
        className="rounded bg-yellow-200 px-1 dark:bg-yellow-800"
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
      <div className="rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="mb-2 flex items-start justify-between">
          <span className="font-medium text-blue-600 text-sm dark:text-blue-400">
            {result.category}
          </span>
          <span className="text-gray-500 text-sm dark:text-gray-400">
            {new Date(result.date).toLocaleDateString('ko-KR')}
          </span>
        </div>

        <h3 className="mb-2 font-semibold text-gray-900 text-lg dark:text-gray-100">
          {highlightText(result.title, query)}
        </h3>

        {result.description && (
          <p className="line-clamp-2 text-gray-600 text-sm dark:text-gray-300">
            {highlightText(result.description, query)}
          </p>
        )}

        {result.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {result.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="rounded bg-gray-100 px-2 py-1 text-gray-600 text-xs dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {result.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
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
            <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-2 flex justify-between">
                <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
              </div>
              <div className="mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-600"></div>
              <div className="mb-1 h-4 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-4 w-2/3 rounded bg-gray-300 dark:bg-gray-600"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="mb-2 text-red-500">⚠️ 검색 중 오류가 발생했습니다</div>
        <p className="text-gray-600 text-sm dark:text-gray-400">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="mb-2 text-gray-500 dark:text-gray-400">
          🔍 검색 결과가 없습니다
        </div>
        <p className="text-gray-600 text-sm dark:text-gray-400">
          다른 검색어를 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-4 text-gray-600 text-sm dark:text-gray-400">
        <strong>{`${query}`}</strong>에 대한 검색 결과 {results.length}개
      </div>

      {results.map(result => (
        <SearchResultCard key={result.id} result={result} query={query} />
      ))}
    </div>
  );
}
