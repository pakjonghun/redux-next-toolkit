import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: {},
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
  isLogoutLoading: false,
  isLogoutError: null,
  isSignupLoading: false,
  isSignupDone: false,
  isSignupError: null,
  isNickNameEditLoading: false,
  isNickNameEditDone: false,
  isNickNameEditError: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoginLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.me = payload;
      state.isLoginLoading = false;
      state.isLoginDone = true;
    },
    loginFail: (state, { payload }) => {
      state.isLoginLoading = false;
      state.isLoginError = payload.error;
    },
    logoutRequest: (state) => {
      state.isLogoutLoading = true;
    },
    logoutSuccess: (state) => {
      state.me = {};
      state.isLoginDone = false;
      state.isLogoutLoading = false;
    },
    logoutFail: (state, { payload }) => {
      state.isLogoutLoading = false;
      state.isLogoutError = payload.error;
    },
    deletePostToMe: (state, { payload }) => {
      state.me.posts = state.me.posts.filter((item) => item.id !== payload.id);
    },
    addPostToMe: (state, { payload }) => {
      state.me.posts.unshift(payload.newPost);
    },
    signUpRequest: (state) => {
      state.isSignupLoading = true;
    },
    signUpSuccess: (state) => {
      state.isSignupLoading = false;
      state.isSignupDone = true;
    },
    signUpFail: (state, { payload }) => {
      state.isSignupLoading = false;
      state.isSignupError = payload.error;
    },
    addCommentToMe: (state, { payload }) => {
      state.me.comments.unshift(payload.comment);
    },
    editNickNameRequest: (state) => {
      state.isNickNameEditLoading = true;
    },
    editNickNameSuccess: (state, { payload }) => {
      state.me.nickName = payload.nickName;
      state.isNickNameEditLoading = false;
      state.isNickNameEditDone = true;
    },
    editNickNameFail: (state, { payload }) => {
      state.isNickNameEditLoading = false;
      state.isNickNameEditError = payload.error;
    },
  },
});

export default userReducer;
