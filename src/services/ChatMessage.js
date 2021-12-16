import apiClient from './ApiClient';

export const chatMessageService = {
  processCreateChatMessage: (payload) => {
    return apiClient.post('/chatmessage', payload);
  },
  processUpdateChatMessage: (payload) => {
    return apiClient.patch('/chatmessage', payload);
  },
  processDeleteChatMessage: (id) => {
    return apiClient.delete(`/chatmessage/${id}`);
  },
};
