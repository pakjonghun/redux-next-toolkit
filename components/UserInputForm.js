import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const UserInputForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = useCallback((data) => {
    console.log(data);
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="nickname"
          {...register('nickName', { required: true })}
        />
        {errors.nickName && (
          <p style={{ color: 'red' }}>{errors.nickName.message}</p>
        )}
      </form>
    </div>
  );
};

export default UserInputForm;
