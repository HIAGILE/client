import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/login/login-form";
import KakaoLoginBtn from "components/login/kakao-login";
import GitHubLoginBtn from "components/login/github-login";
import LoginLayout from "components/layout/login-layout";

export function Login() {
  return (
    <LoginLayout title="Hi, Agile!">
      <LoginForm />
      <div>
        New to HiAgile?{" "}
        <Link to="/join" className="text-green-600 hover:underline">
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
