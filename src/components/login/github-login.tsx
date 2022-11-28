import React from 'react';
import {FaGithub} from 'react-icons/fa';

const GitHubLoginBtn: React.FC = () => {
  const client_id = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const loginUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo:status read:repo_hook read:user user:email`;

  return (
      <a href={loginUrl}>
        <button className="login-btn hover:bg-gray-600 transition duration-300 ease-in-out flex justify-center items-center w-full bg-darkGray text-lightGray">
          <FaGithub className='mr-2'></FaGithub>
          Login with Git Hub
        </button>
      </a>
  );
};

export default GitHubLoginBtn;
