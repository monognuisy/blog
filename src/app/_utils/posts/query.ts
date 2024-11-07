import PostApi from './api';

export const ogTagsQuery = (url: string) => ({
  queryKey: ['ogTags', url],
  queryFn: async () => {
    const ogTagsData = await PostApi.fetchOgData(url);
    return ogTagsData;
  },

  refetchOnWindowFocus: false,

  // 캐시, 스테일 타임은 1시간으로 설정
  staleTime: 1000 * 60 * 60 * 1,
  cacheTime: 1000 * 60 * 60 * 1,
});
