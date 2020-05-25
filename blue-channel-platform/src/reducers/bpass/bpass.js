import React from 'react';
import produce from 'immer';

const initialState = {
  commonState: {},
  error: '',
  result: {}
};

const B_PASS_ACTION = {
  REQUEST: 'COMMON_REQUEST',
  SUCCESS: 'COMMON_SUCCESS',
  FAILURE: 'COMMON_FAILURE',

  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_SUCCESS: 'AUTH_SUCCESS',
  AUTH_FAILURE: 'AUTH_FAILURE',

  SIGN_SAVE_REQUEST: 'SIGN_SAVE_REQUEST',
  SIGN_SAVE_SUCCESS: 'SIGN_SAVE_SUCCESS',
  SIGN_SAVE_FAILURE: 'SIGN_SAVE_FAILURE',

  SIGN_REQUEST: 'SIGN_REQUEST',
  SIGN_SUCCESS: 'SIGN_SUCCESS',
  SIGN_FAILURE: 'SIGN_FAILURE',

  DELETE_REQUEST: 'DELETE_REQUEST',
  DELETE_SUCCESS: 'DELETE_SUCCESS',
  DELETE_FAILURE: 'DELETE_FAILURE'
};

const bPassReducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case B_PASS_ACTION.REQUEST: {
      draft = initialState;
      break;
    }
    case B_PASS_ACTION.SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case B_PASS_ACTION.FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    case B_PASS_ACTION.AUTH_REQUEST: {
      draft = initialState;
      break;
    }
    case B_PASS_ACTION.AUTH_SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case B_PASS_ACTION.AUTH_FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    case B_PASS_ACTION.SIGN_REQUEST: {
      draft = initialState;
      break;
    }
    case B_PASS_ACTION.SIGN_SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case B_PASS_ACTION.SIGN_FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    case B_PASS_ACTION.SIGN_SAVE_REQUEST: {
      draft = initialState;
      break;
    }
    case B_PASS_ACTION.SIGN_SAVE_SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case B_PASS_ACTION.SIGN_SAVE_FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    case B_PASS_ACTION.DELETE_REQUEST: {
      draft = initialState;
      break;
    }
    case B_PASS_ACTION.DELETE_SUCCESS: {
      draft.commonState = action.data;
      break;
    }
    case B_PASS_ACTION.DELETE_FAILURE: {
      draft.commonState = {};
      draft.error = action.error;
      break;
    }
    default: {
      break;
    }
  }
});

export { initialState, B_PASS_ACTION };
export default bPassReducer;
