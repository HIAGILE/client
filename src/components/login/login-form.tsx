import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../common/form-error";
import { LoginBtn } from "./login-button";
import { ILoginForm } from "../../interface/login-join-type";
import { gql, useMutation } from "@apollo/client";
import { LOCALSTORAGE_TOKEN } from "constant";
import { loginMutation, loginMutationVariables } from "__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "../../apollo";


export const LOGIN_MUTATION = gql`
  mutation loginMutation($input:LoginInput!){
    login(input:$input){
      ok,
      token,
      error,
    }
  }
`

const LoginForm = () => {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data:loginMutation) => {
    const {
      login:{ok,token,error}
    } = data
    if (!ok)
    {
      alert(error)
    }
    if (ok && token)
    {
      localStorage.setItem(LOCALSTORAGE_TOKEN,token);
      authTokenVar(token);
      isLoggedInVar(true)
    }
  }
  const [loginMutation,{data:loginMutationResult,loading}] = useMutation<
  loginMutation,
  loginMutationVariables>(
    LOGIN_MUTATION,{
      onCompleted
    }
  )
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables:{
          input:{
            email:email,
            password:password,
          }
        }
      })
    }
  };
  return (
    <form
      className="grid gap-3 mt-5 w-full mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="email"
        type="email"
        placeholder="Email"
        required
        className="input transition-colors"
        autoComplete="true"
      />
      {errors.email?.message && (
        <FormError errorMessage={errors.email?.message} />
      )}
      <input
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="password"
        type="password"
        required
        placeholder="Password"
        className="input"
        autoComplete="true"
      />
      {errors.password?.message && (
        <FormError errorMessage={errors.password?.message} />
      )}
      <LoginBtn canClick={isValid} actionText="Login" loading={false} />
    </form>
  );
};

export default LoginForm;
