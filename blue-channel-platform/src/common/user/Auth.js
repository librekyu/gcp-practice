/*
* 인증 처리
* */

import jwtDecode from 'jwt-decode';
import moment from 'moment';

// import encode from 'jwt-simple';

class Auth {
  static instance = null;

  static createInstance() {
    return new Auth();
  }

  static getInstance() {
    if (!Auth.instance) {
      Auth.instance = Auth.createInstance();
    }
    return Auth.instance;
  }

  /*
  * 인증 확인
  * */
  isAuth = () => {
  };

  /**
   * User ID
   */
  getUserId = () => window.localStorage.getItem('userId');

  setUserId = (value) => window.localStorage.setItem('userId', value);

  removeUserId = () => window.localStorage.removeItem('userId');

  /**
   * User Role
   */
  getUserRole = () => window.localStorage.getItem('userRole');

  setUserRole = (value) => window.localStorage.setItem('userRole', value);

  removeUserRole = () => window.localStorage.removeItem('userRole');

  /**
   * Access Token
   */
  getAccessToken = () => window.localStorage.getItem('accessToken');

  setAccessToken = (token) => window.localStorage.setItem('accessToken', token);

  removeAccessToken = () => window.localStorage.removeItem('accessToken');

  /**
   * Refresh Token
   */
  getRefreshToken = () => window.localStorage.getItem('refreshToken');

  setRefreshToken = (token) => window.localStorage.setItem('refreshToken', token);

  removeRefreshToken = () => window.localStorage.removeItem('refreshToken');

  /**
   * Token Expire
   */
  getTokenExpire = () => window.localStorage.getItem('tokenExpire');

  setTokenExpire = (token) => window.localStorage.setItem('tokenExpire', token);

  removeTokenExpire = () => window.localStorage.removeItem('tokenExpire');

  /**
   * Storage Clear
   */
  removeAll = () => {
    this.removeAccessToken();
    this.removeRefreshToken();
  };

  /**
   * Storage AccessToken Exist
   */
  isAccessToken = () => {
    return this.getAccessToken() != null;
  };

  /**
   * Print Storage
   */
  print = () => {
    return window.localStorage;
  };

  authTest = () => {
  };

  /**
   * AccessToken 유효성 검사
   */
  validAccessToken = () => {
    const token = this.getAccessToken();
    // const refreshToken = this.getRefreshToken();
    // const refreshToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInNjb3BlcyI6IlJPTEVfUkVGUkVTSF9UT0tFTiIsImlzcyI6ImxvY2FsaG9zdCIsImlhdCI6MTU3MTc5NDMyOCwiZXhwIjoxNTcxODgwNzI4fQ.EdXRnm4YEOvy_HSnTvnzdiLqDbwxAYeHIdBFKc1Cm5rLQzjcLDM9vbDG9rHhb-Z62ZDoRjpsmQa99LszTKlKTw";
    // const validRefreshToken = this.analyzeRefreshToken(refreshToken);
    return this.validToken(token);
  };

  /**
   * Token 유효성 검사
   */
  validToken = (token) => {
    const analyzeToken = this.analyzeToken(token);

    if (analyzeToken) {
      console.warn('analyzeToken > ', analyzeToken);

      const {
        administrator,
        scope,
        sub,
        iat,
        exp
      } = analyzeToken;
      return analyzeToken;
      //
      // // // Check Expire
      // const timestamp = moment(new Date()).format('X');
      // const currentTimestamp = parseInt(timestamp, 10);
      // const dateIsBefore = exp && moment(currentTimestamp).isBefore(exp);
      //
      //
      // const isValid = id && scope;

      // if (!isValid) {
      //     // 유효한 토큰이 아닐 경우, Auth 정보 지우기.
      //     console.log(`Do check Token Expired!!`);
      //     Auth.getInstance().removeAll();
      // } else {
      //     const refreshToken = this.getRefreshToken();
      //     const analyzeRefreshToken = this.analyzeRefreshToken(refreshToken);
      //     // const {
      //     //     exp, iat} = analyzeRefreshToken;
      //
      //     // Check Expire
      //     const timestamp = moment(new Date()).format('X');
      //     const currentTimestamp = parseInt(timestamp, 10);
      //     const dateIsBefore = analyzeRefreshToken.exp && moment(currentTimestamp).isBefore(analyzeRefreshToken.exp);
      //     console.warn("timestamp = " , timestamp, ", currentTimestamp = ", currentTimestamp, ", dateIsBefore = ",dateIsBefore);
      //
      //
      // }
      //return true;
      // return isValid;

      // const { id, authority, created, exp } = analyzeToken;
      // const userId = this.getUserId();
      //
      // // Check Expire
      // const timestamp = moment(new Date()).format('X');
      // const currentTimestamp = parseInt(timestamp, 10);
      // const dateIsBefore = exp && moment(currentTimestamp).isBefore(exp);
      //
      // // const testExp = parseInt(
      // //   moment(new Date('2019-03-15 16:40:00')).format('X'),
      // //   10,
      // // );
      // // dateIsBefore = testExp && moment(currentTimestamp).isBefore(testExp);
      //
      // const isValid =
      //     id &&
      //     authority &&
      //     created &&
      //     exp &&
      //     userId &&
      //     userId === id &&
      //     dateIsBefore;
      //
      // if (!isValid) {
      //     // 유효한 토큰이 아닐 경우, Auth 정보 지우기.
      //     console.log(`Do check Token Expired!!`);
      //     Auth.getInstance().removeAll();
      // }
      //
      // return isValid;
    }
    return false;
  };

  /**
   * Token 분석
   */
  analyzeToken = (token) => {
    if (token == null || token === undefined) {
      return null;
    }

    try {
      const jwt = jwtDecode(token);
      console.warn('analyzeToken jwt = ', jwt);
      return jwt;
      // const { exp, iat, iss, scopes, sub, user } = jwt;
      // const id = user.userId;
      // const authority = scopes[0];
      // return {
      //   id,
      //   authority,
      //   sub,
      //   exp
      // };
      //////
      // const id = sub;
      // const {
      //     0: { authority },
      // } = auth;
      //
      // return {
      //     id,
      //     authority,
      //     created,
      //     exp,
      // };
    } catch (e) {
      console.warn('Analyze Token Error = ', e);
      return null;
    }
  };

  /**
   * RefreshToken 분석
   */
  analyzeRefreshToken = (refreshToken) => {
    if (refreshToken == null || refreshToken === undefined) {
      return null;
    }

    try {
      const jwt = jwtDecode(refreshToken);

      const { exp, iat } = jwt;
      // const id = user.userId;
      // const authority = scopes[0];
      return {
        exp,
        iat
      };
    } catch (e) {
      console.warn('Analyze RefreshToken Error = ', e);
      return null;
    }
  };

  makeSignedToken = (token) => {
    const jwt = jwtDecode(token);

    const j = require('jwt-simple');

    const secret = j.encode(jwt, '281a9TAmNWZ7TesPs5uWKQ==', 'HS512');
  };
}

export default Auth;
