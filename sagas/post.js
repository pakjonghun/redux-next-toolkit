import { takeLatest, all, put, fork, delay, call } from 'redux-saga/effects';
import shortid from 'shortid';
import faker from 'faker';
import postReducer from '../reducers/post';
import userReducer from '../reducers/user';

export const dummyPost = (id, title = faker.lorem.paragraph()) => ({
  id,
  title,
  images: [
    { id: shortid.generate(), src: faker.image.image() },
    { id: shortid.generate(), src: faker.image.image() },
    { id: shortid.generate(), src: faker.image.image() },
  ],
  user: {
    me: {
      id: shortid.generate(),
      avatar: faker.image.avatar(),
    },
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
});

export function getPostRequest() {
  return [dummyPost(1), dummyPost(2)];
}

function deletePostRequest(id) {
  console.log(id);
}

function addPosstRequest(title) {
  return dummyPost(shortid.generate(), title);
}

function* addPost({ payload }) {
  try {
    const newPost = yield call(addPosstRequest, payload.content);
    yield delay(1000);
    console.log(newPost);
    yield put(postReducer.actions.addPostSuccess({ newPost }));
    yield put(userReducer.actions.addPostToMe({ newPost }));
  } catch (error) {
    yield put(postReducer.actions.addPostFail({ error }));
  }
}

function* getPost({ payload }) {
  try {
    const result = yield call(getPostRequest, payload);

    yield delay(1000);
    yield put(postReducer.actions.getPostSuccess(result));
  } catch (error) {
    console.log(error);
    yield put(postReducer.actions.getPostFail({ error }));
  }
}

function* deletePost({ payload }) {
  try {
    yield delay(1000);

    yield call(deletePostRequest, payload.id);
    yield put(postReducer.actions.deletePostSuccess(payload));
    yield put(userReducer.actions.deletePostToMe({ id: payload.id }));
  } catch (error) {
    console.log(error);
    yield put(postReducer.actions.deletePostFail({ error }));
  }
}

function* watchAddPostRequest() {
  yield takeLatest(postReducer.actions.addPostRequest, addPost);
}

function* watchGetPostRequest() {
  yield takeLatest(postReducer.actions.getPostRequest, getPost);
}

function* watchDeletePostRequest() {
  yield takeLatest(postReducer.actions.deletePostRequest, deletePost);
}

export default function* post() {
  yield all([
    fork(watchGetPostRequest),
    fork(watchDeletePostRequest),
    fork(watchAddPostRequest),
  ]);
}
