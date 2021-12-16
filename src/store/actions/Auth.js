import Cookies from 'js-cookie';
import authType from './../actionTypes/Auth';
import { processLogin, processSocialLogin } from './../../services/Auth';
import apiClient from './../../services/ApiClient';
import { apiRequestError } from './../../libs/util/ApiRequestError';

const authRequest = () => {
  return {
    type: authType['AUTH_REQUEST'],
  };
};

const authSuccess = (payload) => {
  return {
    type: authType['AUTH_SUCCESS'],
    payload,
  };
};

const authFailure = (errorMsg) => {
  return {
    type: authType['AUTH_ERROR'],
    payload: errorMsg,
  };
};

export const authLogout = () => {
  Cookies.remove('token');
  Cookies.remove('user');
  return {
    type: authType['AUTH_LOGOUT_USER'],
  };
};

/**
 * function to log user into the system
 * if login is successful, user data is saved to cookies
 * set authorization header
 */
export const processLoginAsync = async (dispatch, payload) => {
  dispatch(authRequest());
  try {
    const { data } = await processLogin(payload);
    const user = data.data.user;
    const token = data.data.token;

    dispatch(authSuccess(user));

    Cookies.set('token', token);
    Cookies.set('user', user);
    Cookies.set('role', user.roles);
    Cookies.set('refresh-token', data.data.refreshToken);

    apiClient.defaults.headers.common['Authorization'] = token;

    return data;
  } catch (loginUserError) {
    return apiRequestError(loginUserError, dispatch, authFailure);
  }
};

export const processSocialLoginAsync = async (dispatch, payload) => {
  dispatch(authRequest());
  try {
    const { data } = await processSocialLogin(payload);
    const user = data.data.user;
    const token = data.data.token;

    dispatch(authSuccess(user));

    Cookies.set('token', token);
    Cookies.set('user', user);
    Cookies.set('role', user.roles);
    Cookies.set('refresh-token', data.data.refreshToken);

    apiClient.defaults.headers.common['Authorization'] = token;
  } catch (loginUserError) {
    return apiRequestError(loginUserError, dispatch, authFailure);
  }
};
