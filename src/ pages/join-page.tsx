import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from "../images/logo.png";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { Process } from "../components/common/process";
import LoginLayout from "../components/layout/login-layout";

export const Join = () => {
  return (
    <LoginLayout title="Join to Hi Agile!">
      <JoinForm />
      <div>
        Already have an account?{" "}
        <Link to={"/login"} className="text-green-600 hover:underline">
          Go to Login
        </Link>
      </div>
    </LoginLayout>
  );
};
interface ICreateAccountForm {
  email: string;
  password: string;
  passwordAgin: string;
  name: string;
  role: string;
}
const JoinForm = () => {
  const { register, getValues, formState, handleSubmit, watch } =
    useForm<ICreateAccountForm>({
      mode: "onChange",
    });
  const navigate = useNavigate();
  const onSubmit = () => {
    if (!false) {
      const { email, password, passwordAgin, name, role } = getValues();
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
      <input
        {...register("passwordAgin", {
          required: "비밀번호를 입력해주세요",
          pattern:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        name="passwordAgin"
        type="passwordAgin"
        placeholder="password agin"
        required
        className="input transition-colors"
        autoComplete="true"
      />
      {formState.errors.email?.type === "pattern" && (
        <FormError errorMessage="대소문자, 숫자, 특수문자(@$!%*?&)는 필수입니다" />
      )}
      {formState.errors.email?.message && (
        <FormError errorMessage={formState.errors.email?.message} />
      )}
      <input
        {...register("name", {
          required: "이름을 입력해주세요",
          pattern:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/,
        })}
        name="name"
        type="name"
        placeholder="Name"
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
      <Button
        canClick={formState.isValid}
        actionText={"Create Account"}
        loading={false}
      ></Button>
    </form>
  );
};
