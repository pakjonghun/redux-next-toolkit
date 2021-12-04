import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoginLoading: false,
  isLoginDone: false,
  isLoginError: null,
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.isLoginLoading = true;
    },
    loginSuccess: (state, action) => {
      console.log(action);
      state.isLoginLoading = false;
      state.isLoginDone = true;
    },
    loginFail: (state, action) => {
      console.log(action);
      state.isLoginLoading = false;
      //   state.isLoginError = action.error;
    },
  },
});

export default userReducer;
