/**
 * sso 연동으로 인해 쿠키로 인증 처리
 * */
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

class AuthCookie {
  /**
   * get accessToken
   * */
  getAccessToken = () => {
    return cookies.get('accessToken');
  };

  /**
   * remove accessToken && refreshToken
   * */
  removeAuthToken = () => {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
  };

  /**
   * 토큰 저장
   * */
  saveAuthToken = (accessToken, refreshToken) => {
    cookies.set('accessToken', accessToken);
    cookies.set('refreshToken', refreshToken);
  };

  /**
   * 토큰 분석
   * */
  analyzeToken = (token) => {
    if (token == null || token === undefined) {
      return {
        result: 'AUTH_FAIL'
      };
    }

    try {
      //const testToken = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImFkbWluaXN0cmF0b3IiOnsiYWRtaW5OdW1iZXIiOjEsImFkbWluSWQiOiJhZG1pbiIsImFkbWluTmFtZSI6Iuq0gOumrOyekCJ9LCJzY29wZXMiOlsiYWNjb3VudF9hZG1pbmlzdHJhdG9yX3VzZXIiLCJhY2NvdW50X3VzZXIiLCJhY2NvdW50X3dpdGhkcmF3YWxfdXNlciIsImJic19ub3RpY2UiLCJiYnNfcG9wdXAiLCJkZXZpY2VfY2N0diIsImRldmljZV9jcmFjayIsImRldmljZV9maW5lX2R1c3QiLCJkZXZpY2VfZ3BzIiwiZGV2aWNlX3JlY3ljbGluZ19iaW4iLCJkZXZpY2Vfc2VjdXJpdHlfbGlnaHQiLCJkZXZpY2VfdGlsdCIsImhvbWVfdGFiX2FpciIsImhvbWVfdGFiX2J1aWxkaW5nIiwiaG9tZV90YWJfY2N0diIsImhvbWVfdGFiX2NsZWFuaW5nIiwiaG9tZV90YWJfc2VjdXJpdHlfbGlnaHQiLCJob21lX3RhYl9zbXMiLCJzdGF0dXNfYWlyIiwic3RhdHVzX2FwcGxpY2F0aW9uX2NhbmNlbCIsInN0YXR1c19idWlsZGluZyIsInN0YXR1c19jY3R2Iiwic3RhdHVzX2NsZWFuaW5nIiwic3RhdHVzX2pvaW5fd2l0aGRyYXdhbCIsInN0YXR1c19zZWN1cml0eV9saWdodCIsInN5c3RlbV9hdXRob3JpdHkiXSwiaXNzIjoibG9jYWxob3N0IiwiaWF0IjoxNTc2MDQyMjkxLCJleHAiOjE1NzYwNDQwOTF9.pEOyav2AYli8x13t5cauUorCZBfxCHXs2AJVeJvCy8FKeV0dlK0y5jJtTjmQGhzitTp_F4trz2a0HAqJ_nkNZQ';
      const jwt = jwtDecode(token);
      console.warn('analyzeToken jwt = ', jwt);

      const { exp, administrator, scopes, sub } = jwt;

      var tokenExpiration = exp;
      var tokenExpirationTimeInSeconds = (tokenExpiration - moment(Math.floor(Date.now() / 1000)));

      if (tokenExpiration && tokenExpirationTimeInSeconds < 100 && tokenExpirationTimeInSeconds > 20) {
        return {
          result: 'AUTH_REFRESH'
        };
      } else if (tokenExpiration && tokenExpirationTimeInSeconds < 20) {
        this.removeAuthToken();
        return {
          result: 'AUTH_LOGOUT'
        };
      } else {
        return {
          result: 'AUTH_SUCCESS',
          administrator,
          sub,
          scopes
        };
      }
    } catch (e) {
      console.warn('Analyze Token Error = ', e);
      return {
        result: 'AUTH_FAIL'
      };
    }
  };
}

export default AuthCookie;

