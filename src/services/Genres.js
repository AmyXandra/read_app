import apiClient from './ApiClient';

export const genreService = {
  processGetGenres: (page) => {
    const formatParam = { page: page };
    return apiClient.get('/genre', { params: formatParam });
  },
  processCreateGenre: (payload) => {
    return apiClient.post('/genre', payload);
  },
  processUpdateGenre: (payload) => {
    return apiClient.patch('/genre', payload);
  },
  processDeleteGenre: (id) => {
    return apiClient.delete(`/genre/${id}`);
  },
};
