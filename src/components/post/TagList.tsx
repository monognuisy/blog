'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/styles';
import ScrollableMask from '../common/ScrollableMask';

interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const handleTagClick = useCallback(
    (tag: string) => {
      const params = new URLSearchParams(searchParams);

      if (selectedTag === tag) {
        // 현재 선택된 태그를 다시 클릭하면 필터를 제거
        params.delete('tag');
      } else {
        // 새로운 태그를 선택
        params.set('tag', tag);
      }

      router.push(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams, selectedTag],
  );

  const handleAllClick = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.delete('tag');
    router.push(`/?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  return (
    <div className="mt-4 mb-6">
      <ScrollableMask
        direction="horizontal"
        className="scrollbar-hide flex gap-2 overflow-x-auto"
        maskSize={50}
      >
        <button
          type="button"
          onClick={handleAllClick}
          className={cn(
            `flex-shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors`,
            !selectedTag &&
              'border-primary bg-primary text-white dark:border-primary-dark dark:bg-primary-dark dark:text-black',
            selectedTag &&
              'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300',
          )}
        >
          전체
        </button>
        {tags.map(tag => (
          <button
            key={tag}
            type="button"
            onClick={() => handleTagClick(tag)}
            className={cn(
              `flex-shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors`,
              selectedTag === tag &&
                'border-primary bg-primary text-white dark:border-primary-dark dark:bg-primary-dark dark:text-black',
              selectedTag !== tag &&
                'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300',
            )}
          >
            {tag}
          </button>
        ))}
      </ScrollableMask>
    </div>
  );
};

export default TagList;
