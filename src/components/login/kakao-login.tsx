import React from "react";
import axios from "axios";

const KakaoLoginBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  if (AUTHORIZE_CODE) {
    // server로 토큰 보내기
    axios
      .post(`https://kauth.kakao.com/oauth/token`, {
        param: {
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: AUTHORIZE_CODE,
          client_secret: CLIENT_SECRET,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  // bg-kakaoYello
  return (
    <button className="mb-4 px-6 py-4 border-2 border-kakaoYello text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={kakaoURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
