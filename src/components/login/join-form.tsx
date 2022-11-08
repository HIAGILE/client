import React, { useEffect, useState } from "react";
import { LoginBtn } from "./login-button";
import { useForm } from "react-hook-form";
import { FormError } from "../common/form-error";
import { ICreateAccountForm } from "../../interface/login-join-type";
import { gql, useMutation } from "@apollo/client";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "__generated__/createAccountMutation";
import { useNavigate } from "react-router-dom";

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;
const JoinForm = () => {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const { name, email, password, passwordAgin, agreeCheckbox } = getValues();

  console.log(isValid, typeof agreeCheckbox);

  const onSubmit = () => {
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email: email,
            password: password,
            name: name,
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
        {...register("name", {
          required: "이름을 입력해주세요",
          pattern: /^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/,
        })}
        name="name"
        type="text"
        placeholder="Name *"
        required
        className="login-input transition-colors"
        autoComplete="true"
      />
      {errors.name?.type === "pattern" && (
        <FormError errorMessage="영문과 숫자를 입력해주세요" />
      )}
      {errors.name?.message && (
        <FormError errorMessage={errors.name?.message} />
      )}
      <input
        {...register("email", {
          required: "이메일을 입력해주세요",
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="email"
        type="email"
        placeholder="Email *"
        required
        className="login-input transition-colors"
        autoComplete="true"
      />
      {errors.email?.type === "pattern" && (
        <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
      )}
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
        placeholder="Password *"
        className="login-input"
        autoComplete="true"
      />
      {errors.password?.type === "pattern" && (
        <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&) 8-14자리를 입력해주세요" />
      )}
      {errors.password?.message && (
        <FormError errorMessage={errors.password?.message} />
      )}
      <input
        {...register("passwordAgin", {
          required: "비밀번호를 재입력해주세요",
          pattern:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="passwordAgin"
        type="password"
        placeholder="password agin *"
        required
        className="login-input transition-colors"
        autoComplete="true"
      />
      {passwordAgin && passwordAgin !== password && (
        <FormError errorMessage="비밀번호가 일치하지 않습니다" />
      )}
      {errors.passwordAgin?.message && (
        <FormError errorMessage={errors.passwordAgin?.message} />
      )}
      <label className="ml-6 mt-4 text-sm text-darkGray">
        <input
          {...register("agreeCheckbox")}
          name="agreeCheckbox"
          type="checkbox"
          className="mr-2"
          value={"1"}
        />
        HiAgile 서비스 이용을 위한 개인정보 제공 및 수집에 동의합니다.
      </label>
      <LoginBtn
        canClick={isValid && agreeCheckbox === "1"}
        actionText="Create Account"
        loading={false}
      />
    </form>
  );
};
export default JoinForm;
