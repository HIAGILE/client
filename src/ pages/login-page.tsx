import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Process } from "../components/common/process";
import LoginForm from "../components/login/login-form";
import KakaoLoginBtn from "components/login/kakao-login";
import GitHubLoginBtn from "components/login/github-login";

export function Login() {
  return (
    <div className="flex items-center flex-col mt-40 lg:mt-28">
      <Process />
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={logo} className="w-32 mb-8" alt="UberLogo" />
        <h4 className=" w-full font-medium text-center text-3xl mb-20">
          Hi, Agile!
        </h4>
        <LoginForm />
        <div>
          New to HiAgile?{" "}
          <Link to="/create-account" className="text-green-600 hover:underline">
            Create an Account
          </Link>
        </div>
        <div className="w-full">
          <KakaoLoginBtn />
          <GitHubLoginBtn />
        </div>
      </div>
    </div>
  );
}
