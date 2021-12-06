import { createSlice } from '@reduxjs/toolkit';

const postReducer = createSlice({
  name: 'post',
  initialState: {
    mainPosts: [],
    isGetPostLoading: false,
    isGetPostDone: false,
    isGetPostError: null,
    isPostAddLoading: false,
    isPostAddDone: false,
    isPostAddError: null,
    isPostDeleteLoading: false,
    isPostDeleteDone: false,
    isPostDeleteError: null,
    isPostGetLoading: false,
    isPostGetDone: false,
    isPostGetError: null,
  },
  reducers: {
    getPostRequest: (state) => {
      state.isPostAddLoading = true;
    },
    getPostSuccess: (state, { payload }) => {
      state.mainPosts = payload;
      state.isPostAddLoading = false;
      state.isPostAddDone = true;
    },
    getPostFail: (state, { payload }) => {
      state.isPostAddLoading = false;
      state.isPostAddError = payload.error;
    },
    addPostRequest: (state) => {
      state.isPostAddLoading = true;
    },
    addPostSuccess: (state, { payload }) => {
      state.mainPosts = [...payload, ...state.mainPosts];
      state.isPostAddLoading = false;
      state.isPostAddDone = true;
    },
    addPostFail: (state, { payload }) => {
      state.isPostAddLoading = false;
      state.isPostAddError = payload.error;
    },
    deletePostRequest: (state) => {
      state.isPostDeleteLoading = true;
    },
    deletePostSuccess: (state, { payload }) => {
      state.mainPosts = state.mainPosts.filter(
        (item) => item.id !== payload.id
      );
      state.isPostDeleteLoading = false;
      state.isPostDeleteDone = true;
    },
    deletePostFail: (state, { payload }) => {
      state.isPostDeleteLoading = false;
      state.isPostDeleteError = payload.error;
    },
    getPost: (state, action) => {},
  },
});

export default postReducer;
