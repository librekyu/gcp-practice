import produce from 'immer';
import { MyfavoritesAirQualityList } from '../../../models/user/userInfo/userInfo';

export const initialState = {
  userInfo: {}, // 유저 정보
  isLoading: false, // 유저 정보 로딩 중지
  isLoadError: true, // 유저 정보 에러 여부
  loadInfoErrorReason: '', // 유저 정보 에러 사유
  isSuccessDeleteFavorites: false,
  isSuccessSelectFavorites: false,
  favoritesAirQualityList: ([]),
  favoritesAirQualityListLength: 0,
  deleteId: ([]),
};

/**
 * 사용자 정보 reducer
 * */

/* 사용자 정보 */
export const USER_INFO_ACTIONS = {

  LOAD_USER_INFO_REQUEST: 'LOAD_USER_INFO_REQUEST',
  LOAD_USER_INFO_SUCCESS: 'LOAD_USER_INFO_SUCCESS',
  LOAD_USER_INFO_FAILURE: 'LOAD_USER_INFO_FAILURE',

  /* 유저정보의 즐겨찾기 추가 된 공기질 리스트 조회 액션 */
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_REQUEST: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_REQUEST',
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_SUCCESS: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_SUCCESS',
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_FAILURE: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_FAILURE',

  /* 유저정보의 즐겨찾기 추가 된 공기질 리스트 삭제 액션 */
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_REQUEST: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_REQUEST',
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_SUCCESS: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_SUCCESS',
  USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_FAILURE: 'USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_FAILURE',
};


const userInfoReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case USER_INFO_ACTIONS.LOAD_USER_INFO_REQUEST: {
      draft.isLoading = true;
      break;
    }

    case USER_INFO_ACTIONS.LOAD_USER_INFO_SUCCESS: {
      draft.isLoading = false;
      draft.isLoadError = false;
      draft.userInfo = action.data;
      break;
    }

    case USER_INFO_ACTIONS.LOAD_USER_INFO_FAILURE: {
      draft.loadInfoErrorReason = action.error;
      draft.isLoading = false;
      draft.isLoadError = true;
      break;
    }

    /* 유저정보의 즐겨찾기 추가 된 공기질 리스트 조회 액션 */
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_REQUEST: {
      draft.isSuccessSelectFavorites = false;
      break;
    }
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_SUCCESS: {
      draft.isSuccessSelectFavorites = true;
      draft.favoritesAirQualityList = action.data;
      draft.favoritesAirQualityListLength = action.data.length;
      break;
    }
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_FAILURE: {
      draft.isSuccessSelectFavorites = false;
      break;
    }

    /* 유저정보의 즐겨찾기 추가 된 공기질 리스트 삭제 액션 */
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_REQUEST: {
      draft.isSuccessDeleteFavorites = false;
      break;
    }
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_SUCCESS: {
      draft.isSuccessDeleteFavorites = true;
      const index = draft.favoritesAirQualityList.findIndex((v) => v.placeId === action.data.id);
      draft.favoritesAirQualityList.splice(index, 1);
      // TODO API 연동시 삭제
      draft.favoritesAirQualityListLength -= 1;
      break;
    }
    case USER_INFO_ACTIONS.USER_INFO_MYFAVORITES_AIR_QUAILTY_LIST_DELETE_FAILURE: {
      draft.isSuccessDeleteFavorites = false;
      alert('요청을 실패했습니다.');
      break;
    }

    default: {
      break;
    }
  }
});

export default userInfoReducer;
