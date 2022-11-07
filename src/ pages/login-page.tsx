import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/login-form";
import KakaoLoginBtn from "components/login/kakao-login";
import GitHubLoginBtn from "components/login/github-login";
import LoginLayout from "components/layout/login-layout";

export function Login() {
  return (
    <LoginLayout title="Sign In">
      <LoginForm />
      <div className="mb-16 text-center text-gray-400">
        New to HiAgile?{" "}
        <Link to="/join" className="text-mainBlue hover:underline">
          Create an Account
        </Link>
      </div>
      <div className="w-full">
        <KakaoLoginBtn />
        <GitHubLoginBtn />
      </div>
    </LoginLayout>
  );
}
