import React, { useEffect } from 'react';
import { Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import userReducer from '../reducers/user';

const Login = () => {
  const { isLoginLoading, isSignupDone } = useSelector(
    (state) => state.userReducer
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(userReducer.actions.loginRequest(data));
  };

  const validate = {
    required: { message: '반듯이 입력하세요', value: true },
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="email"
        {...register('id', {
          pattern: {
            value: /\S+@\S+\.\S+/g,
            message: '이메일 형식이 아닙니다.',
          },
          ...validate,
        })}
      />
      <p>{errors.email && errors.id.message}</p>
      <input
        placeholder="password"
        type="password"
        {...register('password', { ...validate })}
      />
      <p>{errors.password && errors.password.message}</p>
      <Button htmlType="submit" loading={isLoginLoading}>
        로그인
      </Button>
    </Form>
  );
};

export default Login;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;

  input,
  button {
  }
`;
