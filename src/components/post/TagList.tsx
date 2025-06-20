'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import ScrollableMask from '../common/ScrollableMask';
import { cn } from '@/lib/styles';

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
    <div className="mb-6 mt-4">
      <ScrollableMask
        direction="horizontal"
        className="flex gap-2 overflow-x-auto scrollbar-hide"
        maskSize={50}
      >
        <button
          onClick={handleAllClick}
          className={cn(
            `flex-shrink-0 px-3 py-1 text-sm rounded-full border transition-colors whitespace-nowrap`,
            !selectedTag &&
              'bg-primary text-white border-primary dark:bg-primary-dark dark:border-primary-dark dark:text-black',
            selectedTag &&
              'bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-neutral-800 dark:border-neutral-700 border-gray-300 hover:bg-gray-200',
          )}
        >
          전체
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              `flex-shrink-0 px-3 py-1 text-sm rounded-full border transition-colors whitespace-nowrap`,
              selectedTag === tag &&
                'bg-primary text-white border-primary dark:bg-primary-dark dark:border-primary-dark dark:text-black',
              selectedTag !== tag &&
                'bg-gray-100 text-gray-700 dark:text-gray-300 dark:bg-neutral-800 dark:border-neutral-700 border-gray-300 hover:bg-gray-200',
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
