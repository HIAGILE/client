import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../common/form-error";
import { LoginBtn } from "./login-button";
import { ILoginForm } from "../../interface/login-join-type";

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
  const { email, password } = getValues();
  const onSubmit = (data: any) => {
    if (data) {
      console.log(data);
    }
  };
  console.log(isValid);
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
