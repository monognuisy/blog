import Link from 'next/link';
import { highlightText } from '@/components/common/highlight';
import type { SearchResult } from '@/types/search';

interface SearchResultCardProps {
  result: SearchResult;
  searchQuery: string;
  closeModal: () => void;
}

export const SearchResultCard = ({
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
