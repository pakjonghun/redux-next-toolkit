import shortid from 'shortid';
import faker from 'faker';
import { put, fork, takeLatest, all, delay, call } from 'redux-saga/effects';
import userReducer from '../reducers/user';
import { dummyPost } from './post';

function loginRequest(payload) {
  payload.id = shortid.generate();
  payload.avatar = faker.image.avatar();
  payload.follows = [1, 2];
  payload.followers = [1, 2];
  const post1 = dummyPost(1);
  const post2 = dummyPost(2);
  payload.posts = [post1, post2];
}

function* login({ payload }) {
  try {
    yield call(loginRequest, payload);
    yield delay(1000);
    yield put(userReducer.actions.loginSuccess(payload));
  } catch (error) {
    console.log(error);
    yield put(userReducer.actions.loginFail({ error }));
  }
}

function* logout() {
  try {
    yield delay(1000);
    yield put(userReducer.actions.logoutSuccess());
  } catch (error) {
    console.log(error);
    yield put(userReducer.actions({ error }));
  }
}

function* watchLoginRequest() {
  yield takeLatest(userReducer.actions.loginRequest, login);
}

function* watchLogoutRequest() {
  yield takeLatest(userReducer.actions.logoutRequest, logout);
}
export default function* user() {
  yield all([fork(watchLoginRequest), fork(watchLogoutRequest)]);
}
