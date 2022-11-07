import React from "react";
import { Link } from "react-router-dom";
import LoginLayout from "../components/layout/login-layout";
import JoinForm from "components/login/join-form";

export const Join: React.FC = () => {
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
