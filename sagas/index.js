import { all, fork } from 'redux-saga/effects';
import user from './user';

export default function* sagaRoot() {
  yield all([fork(user)]);
}
