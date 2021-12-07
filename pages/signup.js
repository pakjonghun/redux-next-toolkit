import React, { useCallback } from 'react';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import AppLayout from '../components/AppLayout';
import userReducer from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { isSignupLoading, isSignupDone } = useSelector(
    (state) => state.userReducer
  );

  const onSubmit = (data) => {
    dispatch(userReducer.actions.signUpRequest(data));
    console.log(isSignupDone);
  };

  return (
    <AppLayout>
      <Head>
        <title>SignUp | NodeBird2</title>
      </Head>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="id">이메일</label>
          <br />
          <Input
            id="id"
            placeholder="id"
            {...register('id', {
              required: { value: true, message: '반듯이 입력' },
              pattern: {
                value: /\S+@\S+\.\S+/g,
                message: '이메일형식 지키세요',
              },
            })}
          />
          {errors.id && <ErrorMessage>{errors.id.message}</ErrorMessage>}
          <br />
          <label htmlFor="password">비밀번호</label>
          <br />
          <Input
            id="password"
            placeholder="password"
            type="password"
            {...register('password', {
              required: { value: true, message: '반듯이 입력' },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <br />
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <br />
          <Input
            id="passwordConfirm"
            placeholder="passwordConfirm"
            {...register('passwordConfirm', { required: true })}
          />
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
          {getValues().password !== getValues().passwordConfirm && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
          <br />
          <Button htmlType="submit" loading={isSignupLoading}>
            회원가입
          </Button>
        </form>
      </div>
    </AppLayout>
  );
};

const Input = styled.input`
  margin-bottom: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin: 0;
`;
export default Signup;
