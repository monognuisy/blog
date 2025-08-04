import ky from 'ky';
import { useCallback, useEffect, useState } from 'react';
import type { SearchResponse, SearchResult } from '@/types/search';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms 디바운싱

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  // 검색어 초기화 함수
  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading,
    error,
    performSearch,
    resetSearch,
  };
};
