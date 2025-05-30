import { TMetadata } from '@/types/post';
import { API } from '../api';

const PostApi = {
  fetchOgData: async (url: string) => {
    const res = await API.post('/api/fetch-og-data', { url });
    return res.data as TMetadata;
  },
};

export default PostApi;
