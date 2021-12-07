import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';

const CommentForm = ({ postId }) => {
  const { isAddCommentLoading } = useSelector((state) => state.postReducer);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.userReducer);
  const onSubmit = useCallback((data) => {
    dispatch(
      postReducer.actions.addCommentRequest({
        me,
        postId,
        content: data.content,
      })
    );
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="input comment plz" {...register('content')} />
        {errors.content && (
          <p style={{ color: 'red' }}>{errors.comment.message}</p>
        )}
        <Button htmlType="submit" loading={isAddCommentLoading}>
          댓글달기
        </Button>
      </form>
    </div>
  );
};

export default CommentForm;
