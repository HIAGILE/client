import React from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FormError } from '../components/form-error';
import logo from '../images/logo.png';
import { Button } from '../components/button';
import { LOCALSTORAGE_TOKEN } from '../constant';

interface ILoginForm {
  email: string;
  password: string;
}

export function Login() {
  const { register, getValues, formState, handleSubmit } = useForm<ILoginForm>({
    mode: 'onChange',
  });

  const onSubmit = () => {
    if (!false) {
      const { email, password } = getValues();
    }
  };
  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Hi Agile</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={logo} className="w-52 mb-10" alt="UberLogo" />
        <h4 className=" w-full font-medium text-left text-3xl">Welcome back</h4>
        <form className="grid gap-3 mt-5 w-full mb-5" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="Email"
            required
            className="input transition-colors"
           />
          {formState.errors.email?.type === 'pattern' && (
            <FormError errorMessage="Please enter a valid email" />
          )}
          {formState.errors.email?.message && <FormError errorMessage={formState.errors.email?.message} />}
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            required
            placeholder="Password"
            className="input"
           />
          {formState.errors.password?.message && (
            <FormError errorMessage={formState.errors.password?.message} />
          )}
          <Button canClick={formState.isValid} actionText="Log In" loading={false} />
        </form>
        <div>
          New to Agile?{' '}
          <Link to="/create-account" className="text-green-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
