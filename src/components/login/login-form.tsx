import React from 'react';
import { useForm } from 'react-hook-form';
import { FormError } from '../common/form-error';
import { LoginBtn } from './login-button';
import { ILoginForm } from '../../interface/login-join-type';
import { gql, useMutation, useQuery } from '@apollo/client';
import { LOCALSTORAGE_TOKEN } from 'constant';
import {
  loginMutation,
  loginMutationVariables,
} from '__generated__/loginMutation';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      ok
      token
      error
    }
  }
`;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
  } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  // const [validateAccount, {data:result, loading}] = useQuery

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token, error },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
      navigate('/');
    }
    if (ok! || error) {
      // alert(error);
      toast.error('이메일 또는 비밀번호가 틀립니다.', {
        position: 'top-right',
      });
    }
  };

  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const { email, password } = getValues();

  const onSubmit = () => {
    if (!loading) {
      loginMutation({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
  };
  return (
    <form
      className="grid gap-2 mt-8 mb-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register('email', {
          required: '이메일을 입력해주세요',
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="email"
        type="email"
        placeholder="Email"
        required
        className={`login-input ${
          errors.email ? 'border-mainRed focus:border-mainRed ' : ''
        }`}
        // className="login-input"
        autoComplete="true"
      />
      <input
        {...register('password', {
          required: '비밀번호를 입력해주세요',
        })}
        name="password"
        type="password"
        required
        placeholder="Password"
        className={`login-input ${
          errors.password ? 'border-mainRed focus:border-mainRed' : ''
        }`}
        // className="login-input"
        autoComplete="true"
      />
      {(errors.email?.type && (
        <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
      )) ||
        (errors.email?.message && (
          <FormError errorMessage={errors.email?.message} />
        )) ||
        (errors.password?.message && (
          <FormError errorMessage={errors.password?.message} />
        ))}
      <LoginBtn canClick={isValid} actionText="Login" loading={false} />
    </form>
  );
};

export default LoginForm;
