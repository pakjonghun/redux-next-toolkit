import { createSlice } from '@reduxjs/toolkit';

const postReducer = createSlice({
  name: 'post',
  initialState: {
    mainPosts: [],
    isZoomImagesShow: false,
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
    isAddCommentLoading: false,
    isAddCommentFail: null,
    isAddCommentDone: false,
  },
  reducers: {
    toggleZoomImages: (state) => {
      state.isZoomImagesShow = !state.isZoomImagesShow;
    },
    getPostRequest: (state) => {
      state.isPostAddLoading = true;
    },
    getPostSuccess: (state, { payload }) => {
      state.mainPosts = [...state.mainPosts, ...payload];
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
      state.mainPosts = [payload.newPost, ...state.mainPosts];
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
    addCommentRequest: (state) => {
      state.isAddCommentLoading = true;
    },
    addCommentSuccess: (state, { payload }) => {
      const post = state.mainPosts.find((item) => item.id === payload.postId);
      post.comments.unshift(payload.comment);
      state.isAddCommentLoading = false;
      state.isAddCommentDone = true;
    },
    addCommentFail: (state, { payload }) => {
      state.isAddCommentLoading = false;
      state.isAddCommentFail = payload.error;
    },
    editNickNameToPost: (state, { payload }) => {
      state.mainPosts.forEach((item) => {
        if (item.user.me.id === payload.userId) {
          item.user.me.nickName = payload.nickName;
        }
      });
    },
  },
});

export default postReducer;
