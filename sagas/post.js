import { takeLatest, all, put, fork, delay, call } from 'redux-saga/effects';
import shortid from 'shortid';
import faker from 'faker';
import postReducer from '../reducers/post';

function getPostRequest(payload) {
  return {
    id: shortid.generate(),
    title: payload.content,
    images: [
      { id: shortid.generate(), src: faker.image.image() },
      { id: shortid.generate(), src: faker.image.image() },
    ],
    user: {
      me: payload.me,
    },
    comments: [
      {
        id: shortid.generate(),
        content: faker.lorem.sentence(),
        user: { avatar: faker.image.avatar(), id: shortid.generate() },
      },
      {
        id: shortid.generate(),
        content: faker.lorem.sentence(),
        user: { avatar: faker.image.avatar(), id: shortid.generate() },
      },
    ],
  };
}

function* getPost({ payload }) {
  try {
    const result = yield call(getPostRequest, payload);
    yield delay(1000);
    yield put(postReducer.actions.getPostSuccess(result));
  } catch (error) {
    yield put(postReducer.actions.getPostFail({ error }));
  }
}

function* watchGetPostRequest() {
  yield takeLatest(postReducer.actions.getPost, getPost);
}

export default function* post() {
  yield all([fork(watchGetPostRequest)]);
}
