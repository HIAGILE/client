import React, { useEffect } from "react";
import axios from "axios";
import qs from "qs";

const KakaoLoginBtn = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = window.location.href;
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get("code");
  const kakao = axios.create({ baseURL: "https://kauth.kakao.com" });

  useEffect(() => {
    if (AUTHORIZE_CODE) {
      kakao
        .post(
          `/oauth/token`,
          {},
          {
            // 400 errors
            params: {
              grant_type: "application/x-www-form-urlencoded;charset=utf-8",
              client_id: REST_API_KEY,
              redirect_uri: REDIRECT_URI,
              code: AUTHORIZE_CODE,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      // server로 토큰 보내기
    }
  }, [AUTHORIZE_CODE]);

  return (
    <button className="mb-4 px-6 py-4 bg-kakaoYello text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={kakaoCodeURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
