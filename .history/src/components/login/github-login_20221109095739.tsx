import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const GitHubLoginBtn = () => {
  const param = useParams();
  const client_id = "7cf6aa6be0c8c9c03214";
  const redirect_uri = `${window.location.origin}/login/github`;
  const loginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook read:user user:email`;

  useEffect(() => {
    if (param.path === "github") {
      const code = new URL(redirect_uri).searchParams.get("code");
      
    }
  }, []);
  return (
    <button className="px-6 py-4 bg-darkGray text-lightGray text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={loginUrl} className="w-full">
        Login with Git Hub
      </a>
    </button>
  );
};

export default GitHubLoginBtn;
