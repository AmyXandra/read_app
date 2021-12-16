import apiClient from './ApiClient';
export const usersService = {
  processGetUsers: (page) => {
    const formatParam = { page: page };
    return apiClient.get('/user', { params: formatParam });
  },

  processGetUserProfile: () => {
    return apiClient.get('/profile');
  },

  processGetUserOtherUserProfile: (userId) => {
    return apiClient.get(`/profile/${userId}`);
  },

  processUpdateProfile: () => {
    return apiClient.post('/profile');
  },

  processUpdateAvatar: () => {
    return apiClient.post('/profile/avatar');
  },
};
