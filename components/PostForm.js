import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import postReducer from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { me } = useSelector((state) => state.userReducer);

  const onSubmit = useCallback((data) => {
    dispatch(postReducer.actions.addPostRequest({ ...data, me }));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="content"
        {...register('content', {
          required: { value: true, message: 'required' },
        })}
      />
      <Button htmlType="submit">submit</Button>
      {errors && errors.content && (
        <p style={{ color: 'red', margin: 0 }}>{errors.content.message}</p>
      )}
    </form>
  );
};

export default PostForm;
