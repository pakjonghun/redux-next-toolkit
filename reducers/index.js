import { createSlice } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import postReducer from './post';
import userReducer from './user';

const index = createSlice({
  name: 'index',
  initialState: {},
  HYDRATE: (state, { payload }) => ({ ...state, ...payload }),
});

const rootReducer = combineReducers({
  index: index.reducer,
  userReducer: userReducer.reducer,
  postReducer: postReducer.reducer,
});

export default rootReducer;
