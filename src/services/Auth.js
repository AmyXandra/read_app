import apiClient from './ApiClient';

export const processLogin = (payload) => {
  return apiClient.post('/auth/login', payload);
};

export const processRegister = (payload) => {
  return apiClient.post('/auth/register', payload);
};

export const processSocialLogin = (payload) => {
  return apiClient.post('/auth/o/token', payload);
};
