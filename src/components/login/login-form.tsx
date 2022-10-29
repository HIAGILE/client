import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { Button } from "../button";

interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { register, getValues, formState, handleSubmit } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    if (!false) {
      const { email, password } = getValues();
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
      {formState.errors.email?.type === "pattern" && (
        <FormError errorMessage="올바른 이메일 형식을 입력해주세요" />
      )}
      {formState.errors.email?.message && (
        <FormError errorMessage={formState.errors.email?.message} />
      )}
      <input
        {...register("password", {
          required: "비밀번호를 입력해주세요",
          maxLength: 14,
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="password"
        type="password"
        required
        placeholder="Password"
        className="input"
        autoComplete="true"
      />
      {formState.errors.password?.type === "pattern" && (
        <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&)는 필수입니다" />
      )}
      {formState.errors.password?.message && (
        <FormError errorMessage={formState.errors.password?.message} />
      )}
      <Button
        canClick={formState.isValid}
        actionText="Log In"
        loading={false}
      />
    </form>
  );
};

export default LoginForm;
