import { put, fork, takeLatest, all, delay } from '@redux-saga/core/effects';
import userReducer from '../reducers/user';

function* login({ payload }) {
  try {
    yield delay(1000);
    yield put(userReducer.actions.loginSuccess({ payload }));
  } catch (error) {
    yield put(userReducer.actions.loginFail({ error }));
  }
}

function* watchLoginRequest() {
  yield takeLatest(userReducer.actions.loginRequest, login);
}

export default function* user() {
  yield all([fork(watchLoginRequest)]);
}
