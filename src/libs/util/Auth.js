import Cookies from 'js-cookie';

export function getUserFromCookies() {
  return Cookies.getJSON('user');
}

export function isAuthenticatedUser() {
  const authUser = Cookies.getJSON('user');
  return authUser ? true : false;
}

export function setToken(token) {
  Cookies.set('token', token);
}

export function setRefreshToken(token) {
  Cookies.set('refresh-token', token);
}

export function getToken() {
  const token = Cookies.get('token');
  return token ? token : null;
}

export function getRefreshToken() {
  const token = Cookies.get('refresh-token');
  return token ? token : null;
}

export function removeUserFromCookies() {
  Cookies.remove('user');
  Cookies.remove('token');
  Cookies.remove('role');
}

export function getUserRoles() {
  Cookies.remove('name');
  Cookies.remove('token');
}
