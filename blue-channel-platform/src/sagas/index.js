import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import bPassSagas from './bpass/bpass';

/** default axios url */
axios.defaults.baseURL = 'http://localhost:8080/api';

export default function* rootSaga() {
  yield all([
    fork(bPassSagas),
  ]);
}
