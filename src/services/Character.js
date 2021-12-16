import apiClient from './ApiClient';

export const characterService = {
  processGetCharacter: (payload) => {
    return apiClient.get('/chatcharacter', payload);
  },
  processCreateCharacter: (payload) => {
    return apiClient.post('/chatcharacter', payload);
  },
  processUpdateCharacter: (payload) => {
    return apiClient.patch('/chatcharacter', payload);
  },
  processDeleteCharacter: (characterId) => {
    return apiClient.delete(`/chatcharacter/${characterId}`);
  },
};
