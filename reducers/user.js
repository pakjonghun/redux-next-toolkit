import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: {},
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
  isLogoutLoading: false,
  isLogoutError: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoginLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      console.log('login', payload);
      state.me = { ...payload };
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
  },
});

export default userReducer;
