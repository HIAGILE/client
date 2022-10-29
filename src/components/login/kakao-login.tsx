import React from "react";
import axios from "axios";

const KakaoLoginBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  if (AUTHORIZE_CODE) {
    axios
      .post(`https://kauth.kakao.com/oauth/token`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code: AUTHORIZE_CODE,
          client_secret: CLIENT_SECRET,
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return (
    <button
      className={`bg-[#FEE500] text-lg text-center w-full focus:outline-none font-medium py-4 transition-colors`}
    >
      <a href={kakaoURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
