import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import userReducer from '../reducers/user';

const UserInputForm = () => {
  const dispatch = useDispatch();
  const { me, isNickNameEditLoading } = useSelector(
    (state) => state.userReducer
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback((data) => {
    dispatch(
      userReducer.actions.editNickNameRequest({ ...data, userId: me.id })
    );
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="nickname"
          {...register('nickName', {
            required: { value: true, message: 'required' },
          })}
        />
        {errors.nickName && (
          <p style={{ color: 'red' }}>{errors.nickName.message}</p>
        )}
        <Button loading={isNickNameEditLoading} htmlType="submit">
          Edit
        </Button>
      </form>
    </div>
  );
};

export default UserInputForm;
