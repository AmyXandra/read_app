import apiClient from './ApiClient';

export const tagsService = {
  processGetTags: (page) => {
    const formatParam = { page: page };
    return apiClient.get('/tag', { params: formatParam });
  },
  processCreateTag: (payload) => {
    return apiClient.post('/tag', payload);
  },
  processUpdateTag: (payload) => {
    return apiClient.patch(`/tag/${payload.id}`, payload);
  },
  processDeleteTag: (id) => {
    return apiClient.delete(`/tag/${id}`);
  },
};
