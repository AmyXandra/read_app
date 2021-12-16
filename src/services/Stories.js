import apiClient from './ApiClient';

export const storiesService = {
  processGetAllStories: () => {
    return apiClient.get('/chatstory/all');
  },

  processGetPublishedStories: (page) => {
    return apiClient.get(`/chatstory/published?page=${page}`);
  },

  processGetMyPublishedStories: () => {
    return apiClient.get('/chatstory/published/mine');
  },

  processGetUnpublishedStories: () => {
    return apiClient.get('/chatstory/unpublished');
  },

  processGetStoryByGenre: (genreID, page) => {
    return apiClient.get(`/chatStory/genre/${genreID}?page=${page}`);
  },

  processUpdateStory: (payload) => {
    return apiClient.put('/chatStory', payload);
  },

  processPublishStory: (storyId) => {
    return apiClient.patch(`/chatstory/publish/${storyId}`);
  },

  processGetSingleStory: (storyId) => {
    return apiClient.get(`/chatstory/${storyId}`);
  },

  processGetPersonalSingleStory: (storyId) => {
    return apiClient.get(`/chatstory/mine/${storyId}`);
  },

  processUnPublishStory: (storyId) => {
    return apiClient.patch(`/chatstory/unpublish/${storyId}`);
  },

  processCreateStory: (payload) => {
    return apiClient.post('/chatstorydraft', payload);
  },

  processRestoreStory: (storyId) => {
    return apiClient.patch(`/chatstory/restore/${storyId}`);
  },

  processDeleteStory: ({ storyID }) => {
    return apiClient.delete(`/chatstorydraft/mine/${storyID}`);
  },

  processGetInReviewStories: (page) => {
    return apiClient.get(
      `/chatstorydraft?status=submitted&status=inreview&status=approved&status=converted&status=editreview&page=${page}`
    );
  },

  processGetChatStoryDrafts: (page) => {
    return apiClient.get(`/chatstorydraft?status=draft&page=${page}`);
  },

  processGetSingleDraftStory: (storyId) => {
    return apiClient.get(`/chatstorydraft/${storyId}`);
  },

  processGetPersonalDraftStory: (storyId) => {
    return apiClient.get(`/chatstorydraft/mine/${storyId}`);
  },

  processGetMyInReviewStories: (page) => {
    return apiClient.get(
      `/chatstorydraft/mine?status=submitted&status=inreview&status=approved&status=converted&status=editreview&page=${page}`
    );
  },

  processGetMyChatStoryDrafts: (page) => {
    return apiClient.get(`/chatstorydraft/mine?status=draft&page=${page}`);
  },

  processUpdateChatStoryDraft: (payload) => {
    return apiClient.put('/chatstorydraft', payload);
  },

  processSubmitChatStoryDraft: (payload) => {
    return apiClient.post('/chatstorydraft/submit', payload);
  },

  processUnsubmitChatStoryDraft: (storyId) => {
    return apiClient.post('/chatstorydraft/unsubmit', { chatStoryDraft: storyId });
  },

  processApproveChatStoryDraft: (storyId) => {
    return apiClient.post('/chatstorydraft/review/approve', { chatStoryDraft: storyId });
  },

  processCommentOnChatStoryDraft: (payload) => {
    return apiClient.post('/chatstorydraft/review/comment', {
      chatStoryDraft: payload.chatStoryDraft,
      comment: payload.comment,
    });
  },

  processCompleteChatStoryDraftReview: (storyId) => {
    return apiClient.post('/chatstorydraft/review/complete', { chatStoryDraft: storyId });
  },

  processPublishChatStoryDraft: (storyId) => {
    return apiClient.post('/chatstorydraft/review/publish', { chatStoryDraft: storyId });
  },
  processConvertChatStoryDraft: (payload) => {
    return apiClient.post('/chatstorydraft/review/convert', {
      chatStoryDraft: payload.chatStoryDraft,
    });
  },

  processStartChatStoryDraftReview: (storyId) => {
    return apiClient.post('/chatstorydraft/review/start', { chatStoryDraft: storyId });
  },

  processIncrementStoryReadCountAsync: (chatId, deviceId) => {
    return apiClient.patch(`/chatstory/readcount/${chatId}`, { device: deviceId });
  },

  processIncrementStoryCompleteCountAsync: (storyId, deviceId) => {
    return apiClient.patch(`/chatstory/completecount/${storyId}`, { device: deviceId });
  },

  processGetUserChatStoryProgressAsync: (payload) => {
    return apiClient.patch('/userchatstoryprogress', payload);
  },
};
