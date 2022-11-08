import React from "react";
import { Link } from "react-router-dom";
import LoginLayout from "../components/layout/login-layout";
import JoinForm from "components/login/join-form";

export const Join: React.FC = () => {
  return (
    <LoginLayout title="Sign Up">
      <JoinForm />
      <div className="mb-16 text-center text-gray-400">
        Already have an account?{" "}
        <Link to={"/login"} className="text-mainBlue hover:underline">
          Go to Login
        </Link>
      </div>
    </LoginLayout>
  );
};
