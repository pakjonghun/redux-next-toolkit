import { takeLatest, all, put, fork, delay, call } from 'redux-saga/effects';
import shortid from 'shortid';
import faker from 'faker';
import postReducer from '../reducers/post';
import userReducer from '../reducers/user';

export const dummyPost = (
  id,
  me = {
    id: shortid.generate(),
    nickName: faker.name.findName(),
    avatar: faker.image.image(),
  },
  title = faker.lorem.paragraph()
) => ({
  id,
  title,
  images: [
    { id: shortid.generate(), src: faker.image.image() },
    { id: shortid.generate(), src: faker.image.image() },
    { id: shortid.generate(), src: faker.image.image() },
  ],
  user: {
    me,
  },
  comments: [
    {
      id: shortid.generate(),
      content: faker.lorem.sentence(),
      user: me,
    },
    {
      id: shortid.generate(),

      content: faker.lorem.sentence(),
      user: me,
    },
  ],
});

export function getPostRequest() {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push(dummyPost(shortid.generate()));
  }
  return result;
}

function deletePostRequest(id) {
  console.log(id);
}

function addPosstRequest(title, userId) {
  return dummyPost(shortid.generate(), userId, title);
}

function addCommentRequest({ content, postId, me }) {
  return {
    id: shortid.generate(),
    postId,
    content,
    user: {
      me,
    },
  };
}

function* addComment({ payload }) {
  try {
    yield delay(1000);
    const comment = yield call(addCommentRequest, payload);
    yield put(
      postReducer.actions.addCommentSuccess({ comment, postId: payload.postId })
    );
    yield put(userReducer.actions.addCommentToMe({ comment }));
  } catch (error) {
    console.log(error);
    yield put(postReducer.actions.addCommentFail({ error }));
  }
}

function* addPost({ payload }) {
  try {
    const newPost = yield call(addPosstRequest, payload.content, payload.me);
    yield delay(1000);
    yield put(postReducer.actions.addPostSuccess({ newPost }));
    yield put(userReducer.actions.addPostToMe({ newPost }));
  } catch (error) {
    yield put(postReducer.actions.addPostFail({ error }));
  }
}

function* getPost({ payload }) {
  try {
    const result = yield call(getPostRequest, payload);

    yield delay(500);
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

function* watchAddCommentRequest() {
  yield takeLatest(postReducer.actions.addCommentRequest, addComment);
}

export default function* post() {
  yield all([
    fork(watchGetPostRequest),
    fork(watchDeletePostRequest),
    fork(watchAddPostRequest),
    fork(watchAddCommentRequest),
  ]);
}
