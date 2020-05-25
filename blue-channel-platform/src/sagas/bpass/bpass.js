import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import Request, { BPASS_ACTION } from '../api';
import { B_PASS_ACTION } from '../../reducers/bpass/bpass';

function requestAuthAPI(data) {
  return Request({
    url: BPASS_ACTION.AUTH,
    method: 'post',
    data: {
      ...data,
      mdn: '010-1111-1111',
      display1: "Liiv Pass 앱에서 서명을 요청했습니다. 서명하시겠습니까?",
      verify_data: "983f3c28433348e88af9366505d49c1ff98be59abbf4a4768fc66bd65ac5ef37"}
  });
}

function* callRequestAuthAPI(action) {
  try {
    const response = yield call(requestAuthAPI, action.data);

    yield put({
      type: B_PASS_ACTION.AUTH_SUCCESS,
      data: {
        response
      }
    });
  } catch (e) {
    yield put({
      type: B_PASS_ACTION.AUTH_FAILURE,
      error: e
    });
  }
}

function* watchRequestAuthAPI() {
  yield takeLatest(B_PASS_ACTION.AUTH_REQUEST, callRequestAuthAPI);
}

function requestSignAPI(data) {
  return Request({
    url: BPASS_ACTION.SIGN,
    method: 'post',
    data
  });
}

function* callRequestSignAPI(action) {
  try {
    const response = yield call(requestSignAPI, action.data);

    yield put({
      type: B_PASS_ACTION.SIGN_SUCCESS,
      data: {
        response
      }
    });
  } catch (e) {
    yield put({
      type: B_PASS_ACTION.SIGN_FAILURE,
      error: e
    });
  }
}

function* watchRequestSignAPI() {
  yield takeLatest(B_PASS_ACTION.SIGN_REQUEST, callRequestSignAPI);
}

function requestSignSaveAPI(data) {
  return Request({
    url: BPASS_ACTION.SIGN_SAVE,
    method: 'post',
    data
  });
}

function* callRequestSignSaveAPI(action) {
  try {
    const response = yield call(requestSignSaveAPI, action.data);

    yield put({
      type: B_PASS_ACTION.SIGN_SAVE_SUCCESS,
      data: {
        response
      }
    });
  } catch (e) {
    yield put({
      type: B_PASS_ACTION.SIGN_SAVE_FAILURE,
      error: e
    });
  }
}

function* watchRequestSignSaveAPI() {
  yield takeLatest(B_PASS_ACTION.SIGN_SAVE_REQUEST, callRequestSignSaveAPI);
}

function requestDeleteAPI(data) {
  return Request({
    url: BPASS_ACTION.DELETE,
    method: 'post',
    data
  });
}

function* callRequestDeleteAPI(action) {
  try {
    const response = yield call(requestDeleteAPI, action.data);

    yield put({
      type: B_PASS_ACTION.DELETE_SUCCESS,
      data: {
        response
      }
    });
  } catch (e) {
    yield put({
      type: B_PASS_ACTION.DELETE_FAILURE,
      error: e
    });
  }
}

function* watchRequestDeleteAPI() {
  yield takeLatest(B_PASS_ACTION.DELETE_REQUEST, callRequestDeleteAPI);
}

export default function* bPassSagas() {
  yield all([
    fork(watchRequestAuthAPI),
    fork(watchRequestSignAPI),
    fork(watchRequestSignSaveAPI),
    fork(watchRequestDeleteAPI),
  ]);
}
