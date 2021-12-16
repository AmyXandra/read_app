import Cookies from 'js-cookie';
class TokenService {
  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem('user'));
    user.accessToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromCookies() {
    return Cookies.getJSON('user');
  }

  setUser(user) {
    console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  isAuthenticatedUser() {
    const authUser = Cookies.getJSON('user');
    return authUser ? true : false;
  }
}

export default new TokenService();
