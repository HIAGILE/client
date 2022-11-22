import React from 'react';
import {FaComment} from 'react-icons/fa';

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

const KakaoLoginBtn: React.FC = () => {
  const kakaoParam: kakaoParamType | URLSearchParams | Record<string, string> =
    {
      client_id: process.env.REACT_APP_KAKAO_API_KEY,
      redirect_uri: `${window.location.origin}/social/kakao`,
      response_type: 'code',
    };
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
    kakaoParam,
  ).toString()}`;

  return (
    <a href={kakaoCodeURL} >
      <button className="login-btn hover:bg-yellow-400 transition duration-300 ease-in-out flex justify-center items-center mb-4 bg-kakaoYello w-full">
        <FaComment className='mr-2'></FaComment>
          Login with Kakao
      </button>
    </a>
  );
};

export default KakaoLoginBtn;
