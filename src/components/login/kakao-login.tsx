import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const KakaoLoginBtn = () => {
  const param = useParams();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = `${window.location.origin}/login/kakao`;
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakao = axios.create({ baseURL: "https://kauth.kakao.com" });

  useEffect(() => {
    if (param.path === "kakao") {
      const AUTHORIZE_CODE = new URL(REDIRECT_URI).searchParams.get("code");

      const getApi = async () => {
        return await kakao
          .post(
            `/oauth/token`,
            {}, // 없으면 error
            {
              // 400 errors
              // 인가 코드 재사용 에러 KOE320
              params: {
                grant_type: "authorization_code",
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
          .catch((error) => console.log(error));
      };
      getApi();
    }
    // server로 토큰 보내기
  }, [param.path === "kakao"]);

  return (
    <button className="mb-4 px-6 py-4 bg-kakaoYello text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={kakaoCodeURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
