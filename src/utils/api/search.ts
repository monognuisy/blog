import type { SearchResponse, SearchResult } from '@/types/search';
import { API } from '../api';

// 검색 API 함수
export const searchAPI = async (query: string): Promise<SearchResult[]> => {
  if (!query.trim()) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    limit: '8',
  });

  const response = await API.get(`/api/search?${params}`);
  const data: SearchResponse = await response.json<SearchResponse>();

  if (!response.ok) {
    throw new Error(data.error || '검색 중 오류가 발생했습니다.');
  }

  return data.results;
};

// 검색 키 팩토리
export const searchKeys = {
  all: ['search'] as const,
  lists: () => [...searchKeys.all, 'list'] as const,
  list: (query: string) => [...searchKeys.lists(), query] as const,
};
