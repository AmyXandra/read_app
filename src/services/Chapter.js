import apiClient from './ApiClient';

export const chapterService = {
  processCreateChapter: (payload) => {
    return apiClient.post('/chatchapter', payload);
  },
  processUpdateChapter: (payload) => {
    return apiClient.put('/chatchapter', payload);
  },
  processGetChapterDetails: (chapterId) => {
    return apiClient.get(`/chatchapter/${chapterId}`);
  },
  processGetChapterMessages: (params) => {
    return apiClient.get('/chatmessage', { params });
  },
  processPublishChapter: (chapterId) => {
    return apiClient.patch(`/chatchapter/publish/${chapterId}`);
  },
  processUnPublishChapter: (chapterId) => {
    return apiClient.patch(`/chatchapter/unpublish/${chapterId}`);
  },
  processDeleteChapter: (chapterId) => {
    return apiClient.delete(`/chatchapter/${chapterId}`);
  },
  processGetChapterCommentsAsync: (chapterId) => {
    return apiClient.get(`/chatchaptercomment/${chapterId}`);
  },
};
