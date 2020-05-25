import produce from 'immer';
import Auth from '../../../common/user/Auth';
import Router from 'next/router';
import CONST, { USER_CONST } from '../../../common/globalConst';

export const initialState = {
  isLoggedIn: false, // 로그인 여부
  isLoading: false, // 로그인 시도중
  isLoginError: false, // 로그인 실패 여부
  loginErrorMessage: '', // 로그인 실패 사유
  loadInfoErrorReason: '',
  // 사용자 정보
  userInfo: {
    userNumber: 0,
    userId: '',
    username: 'test',
    emailAddress: '',
    otp: '',
    userPhoneNumber: '',
    accountNumber: '',
    balance: 0,
  }
};

/**
 * 사용자 정보 action
 * */
export const USER_LOG_IN_ACTION = {

  USER_LOG_IN_INIT: 'USER_LOG_IN_INIT', //로그인 페이지 리셋
  USER_LOG_IN_SUCCESS: 'USER_LOG_IN_SUCCESS', // 로그인 성공
  USER_LOG_IN_REQUEST: 'USER_LOG_IN_REQUEST', // 로그인 요청
  USER_LOG_IN_FAILURE: 'USER_LOG_IN_FAILURE', // 로그인 실패

  USER_LOG_OUT: 'USER_LOG_OUT', // 로그아웃

  USER_CONFIRM_AUTH_REQUEST: 'USER_CONFIRM_AUTH_REQUEST', // 인증 확인 > 로그인 처리 요청
  USER_CONFIRM_AUTH_SUCCESS: 'USER_CONFIRM_AUTH_SUCCESS', // 인증 확인 > 로그인 처리 성공
  USER_CONFIRM_AUTH_FAILURE: 'USER_CONFIRM_AUTH_FAILURE', // 인증 확인 > 로그인 처리 실패

  USER_AUTH_FETCH_REQUEST: 'USER_AUTH_FETCH_REQUEST', // 로그인 정보 조회 요청(refresh token)
  USER_AUTH_FETCH_SUCCESS: 'USER_AUTH_FETCH_SUCCESS', // 로그인 정보 조회 성공(refresh token)
  USER_AUTH_FETCH_FAILURE: 'USER_AUTH_FETCH_FAILURE', // 로그인 정보 조회 실패(refresh token)

  // LOGGED_IN_FETCH_REQUEST: 'LOGGED_IN_FETCH_REQUEST',
  // LOGGED_IN_FETCH_SUCCESS: 'LOGGED_IN_FETCH_SUCCESS',
  // LOGGED_IN_FETCH_FAILURE: 'LOGGED_IN_FETCH_FAILURE',
  //
  // LOAD_INFO_REQUEST: 'LOAD_INFO_REQUEST',
  // LOAD_INFO_SUCCESS: 'LOAD_INFO_SUCCESS',
  // LOAD_INFO_FAILURE: 'LOAD_INFO_FAILURE',
};

/**
 * 사용자 정보 Reducer
 * */
const userLoginReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case USER_LOG_IN_ACTION.USER_LOG_IN_INIT: {
      draft.isLoggedIn = false;
      draft.isLoading = true;
      draft.isLoginError = false;
      draft.loginErrorMessage = '';
      break;
    }
    case USER_LOG_IN_ACTION.USER_LOG_IN_REQUEST: {
      draft.isLoggedIn = true;
      draft.isLoginError = false;
      draft.loginErrorMessage = '';
      draft.userInfo.otp = action.data.password;
      draft.userInfo.userPhoneNumber = action.data.userId;
      draft.userInfo.username = 'test';
      break;
    }
    case USER_LOG_IN_ACTION.USER_LOG_IN_SUCCESS: {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.isLoginError = false;
      break;
    }
    case USER_LOG_IN_ACTION.USER_LOG_IN_FAILURE: {
      draft.isLoggedIn = false;
      draft.isLoginError = true;

      if(action.data === 'SELF_CERTIFICATION') {
        Router.push(`${USER_CONST.BASE_ROUTER_PATH}/account/selfCertification`);
      } else {
        draft.loginErrorMessage = action.data;
      }
      break;
    }
    case USER_LOG_IN_ACTION.USER_LOG_OUT: {
      Auth.getInstance().removeAll();
      draft.isLoggedIn = false;
      draft.myInfo = null;
      draft.myAuth = '';
      draft.userInfo = {
        userNumber: 0,
        userId: '',
        username: '',
        emailAddress: ''
      };
      break;
    }
  case USER_LOG_IN_ACTION.USER_CONFIRM_AUTH_REQUEST: {
    draft.userInfo = {
      userNumber: 0,
      userId: '',
      username: '',
      emailAddress: ''
    };
    break;
  }
  case USER_LOG_IN_ACTION.USER_CONFIRM_AUTH_SUCCESS: {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.userInfo = action.data;
      break;
  }
  case USER_LOG_IN_ACTION.USER_CONFIRM_AUTH_FAILURE: {
    draft.isLoggedIn = false;
    draft.isLoading = true;
    draft.userInfo = {
      userNumber: 0,
      userId: '',
      username: '',
      emailAddress: ''
    };
    break;
  }
    case USER_LOG_IN_ACTION.USER_AUTH_FETCH_REQUEST: {
      draft.isLoggedIn = false;
      draft.isLoading = true;
      break;
    }
    case USER_LOG_IN_ACTION.USER_AUTH_FETCH_SUCCESS: {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      const instance = Auth.getInstance();
      instance.setAccessToken(action.data.token);
      break;
    }
    case USER_LOG_IN_ACTION.USER_AUTH_FETCH_FAILURE: {
      draft.isLoggedIn = false;
      draft.isLoading = false;
      break;
    }
    default: {
      break;
    }
  }
});

export default userLoginReducer;
