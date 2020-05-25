import { combineReducers } from 'redux';

// user reducers
import userLogin from './user/userInfo/login';

import globalReducer from './common/global';

import bPass from './bpass/bpass';


const rootReducer = combineReducers({
  userLogin,

  // global reducer
  globalReducer,

  bPass
});

export default rootReducer;
