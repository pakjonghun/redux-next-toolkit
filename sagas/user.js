import faker from 'faker';
import { put, fork, takeLatest, all, delay, call } from 'redux-saga/effects';
import userReducer from '../reducers/user';
import { dummyPost } from './post';

function editNickNameRequest() {
  return true;
}

function loginRequest(payload) {
  payload.avatar = faker.image.avatar();
  payload.follows = [1, 2];
  payload.followers = [1, 2];
  const post1 = dummyPost(1);
  const post2 = dummyPost(2);
  payload.posts = [post1, post2];
  payload.comments = [];
  payload.nickName = faker.name.title();
}

export function signUpRequest(payload) {
  payload.avatar = faker.image.avatar();
  payload.nickName = faker.name.title();
  return { ok: true };
}

function* signUp({ payload }) {
  try {
    const { ok } = yield call(signUpRequest, payload);
    yield delay(1000);
    if (ok) yield put(userReducer.actions.signUpSuccess());
  } catch (error) {
    yield put(userReducer.actions.signUpFail({ error }));
  }
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

function* editNickName({ payload }) {
  try {
    yield delay(1000);
    yield call(editNickNameRequest, payload);
    yield put(userReducer.actions.editNicknameSuccess(payload));
  } catch (error) {
    yield put(userReducer.actions.editNicknameFail({ error }));
  }
}

function* watchSignupRequest() {
  yield takeLatest(userReducer.actions.signUpRequest, signUp);
}

function* watchLoginRequest() {
  yield takeLatest(userReducer.actions.loginRequest, login);
}

function* watchLogoutRequest() {
  yield takeLatest(userReducer.actions.logoutRequest, logout);
}

function* watchEditNickNameRequest() {
  yield takeLatest(userReducer.actions.editNicknameRequest, editNickName);
}
export default function* user() {
  yield all([
    fork(watchEditNickNameRequest),
    fork(watchLoginRequest),
    fork(watchLogoutRequest),
    fork(watchSignupRequest),
  ]);
}
