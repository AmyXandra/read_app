// api.js
import Axios from 'axios';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import {
  getToken,
  isAuthenticatedUser,
  removeUserFromCookies,
  getUserFromCookies,
  getRefreshToken,
  setToken,
  setRefreshToken,
} from '../libs/util/Auth';

const getBaseURL = () => {
  if (window.location.origin.includes('https://devenv.whipik.com')) {
    return process.env.REACT_APP_DEV_BASE_URL;
  }
  if (window.location.origin.includes('https://staging.whipik.com')) {
    return process.env.REACT_APP_STAGING_BASE_URL;
  }
  if (window.location.origin.includes('https://writer.whipik.com')) {
    return process.env.REACT_APP_PRODUCTION_BASE_URL;
  }
  return process.env.REACT_APP_DEV_BASE_URL;
};

const baseURL = getBaseURL();

const apiClient = Axios.create({
  baseURL: baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

if (isAuthenticatedUser()) {
  apiClient.defaults.headers.common['Authorization'] = getToken();
}

// before a request is made start the nprogress
apiClient.interceptors.request.use((config) => {
  if (isAuthenticatedUser()) {
    config.headers.Authorization = getToken();
  }
  nprogress.start();
  return config;
});

// before a response is returned stop nprogress
apiClient.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (originalConfig.url !== '/' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && isAuthenticatedUser() && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await apiClient.post('/auth/o/token/refresh', {
            refreshToken: getRefreshToken(),
            email: getUserFromCookies()?.email,
            id: getUserFromCookies()?._id,
          });

          const { data } = rs.data;
          setToken(data.token);
          setRefreshToken(data.refreshToken);

          window.location.reload();
          return apiClient(originalConfig);
        } catch (_error) {
          removeUserFromCookies();
          window.location = '/?session=expired';
          nprogress.done();
          return Promise.reject(_error);
        }
      }
    }
    nprogress.done();
    return Promise.reject(error);
  }
);

export default apiClient;
