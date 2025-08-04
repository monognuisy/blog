import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { searchAPI, searchKeys } from '@/utils/api/search';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const queryClient = useQueryClient();

  // React Query로 검색 실행
  const {
    data: results = [],
    isLoading,
    isFetching,
    error,
    isStale,
    isPlaceholderData,
  } = useQuery({
    queryKey: searchKeys.list(debouncedQuery),
    queryFn: () => searchAPI(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분 후 가비지 컬렉션
    retry: 1, // 실패시 1회만 재시도
    refetchOnWindowFocus: false, // 윈도우 포커스시 자동 재요청 방지
    placeholderData: keepPreviousData, // 이전 데이터 유지
  });

  // 디바운싱 효과
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // 즉시 검색 실행 함수 (폼 제출 시 사용)
  const performSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setDebouncedQuery(query);
  }, []);

  // 미리 캐싱 함수 (선택적 기능)
  const prefetchSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        queryClient.prefetchQuery({
          queryKey: searchKeys.list(query),
          queryFn: () => searchAPI(query),
          staleTime: 5 * 60 * 1000,
        });
      }
    },
    [queryClient],
  );

  // 모든 검색 캐시 무효화
  const invalidateSearches = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: searchKeys.all });
  }, [queryClient]);

  // 검색어 초기화 (캐시 완전 제거)
  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setDebouncedQuery('');
  }, []);

  // 최적화된 로딩 상태
  // - isLoading: 초기 로딩 (데이터가 없을 때)
  // - isFetching: 백그라운드 요청 (기존 데이터가 있을 때)
  const showLoadingSkeleton = isLoading && !results.length;
  const showBackgroundLoading = isFetching && !isLoading;

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading: showLoadingSkeleton,
    isFetching: showBackgroundLoading,
    isPlaceholderData, // 현재 데이터가 이전 데이터인지 여부
    error: error as Error | null,
    isStale,
    performSearch,
    prefetchSearch,
    resetSearch,
    invalidateSearches,
  };
};
