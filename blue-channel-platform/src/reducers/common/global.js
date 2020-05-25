/**
 * 전역 state 관련 reducer
 * */

import produce from 'immer';

export const initialState = {
  isLoading: false,
  stackRequestArray: [],
  stackNumber: 0,
  modalParam: {}, // modal parameter
};

export const GLOBAL_ACTIONS = {
  SETTING_MODAL: 'SETTING_MODAL', // layout modal setting
  AUTH_TOKEN_FAILURE: 'AUTH_TOKEN_FAILURE'
};

let reqObj = {};
let sucFailObj = {};

const globalReducer = (state = initialState, action) => produce(state, (draft) => {
  // console.log(action.type);
  if (action.type.toLowerCase().includes('request')) {
    draft.isLoading = true;
    draft.stackNumber += 1;
    reqObj[action.type] = 1;

  } else if (action.type.toLowerCase().includes('success')
    || action.type.toLowerCase().includes('fail')
    || action.type.toLowerCase().includes('complete')
  ) {
    draft.stackNumber -= 1;
    sucFailObj[action.type] = 1;

    // console.log(Object.entries(reqObj).length, Object.entries(sucFailObj).length, draft.stackNumber);

    if (Object.entries(reqObj).length <= Object.entries(sucFailObj).length
      || draft.stackNumber <= 0) {
      draft.isLoading = false;
    }
  }

  switch (action.type) {
    case GLOBAL_ACTIONS.SETTING_MODAL: {
      draft.modalParam = action.data;
      break;
    }
  case GLOBAL_ACTIONS.AUTH_TOKEN_FAILURE: {
    break;
  }
    default: {
      break;
    }
  }
});

export default globalReducer;
