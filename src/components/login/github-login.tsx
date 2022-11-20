import React from 'react';

const GitHubLoginBtn: React.FC = () => {
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const loginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook read:user user:email`;

  return (
    <button className="login-btn bg-darkGray text-lightGray">
      <a href={loginUrl} className="w-full">
        Login with Git Hub
      </a>
    </button>
  );
};

export default GitHubLoginBtn;
