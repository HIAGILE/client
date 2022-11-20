import React from 'react';

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
    <button className="login-btn mb-4 bg-kakaoYello w-full">
      <a href={kakaoCodeURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
