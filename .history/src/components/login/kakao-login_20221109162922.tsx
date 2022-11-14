import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const KakaoLoginBtn = () => {
  const param = useParams();
  const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
  const REDIRECT_URI = `${window.location.origin}/login/kakao`;
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  const kakao = axios.create({ baseURL: "https://kauth.kakao.com" });

  return (
    <button className="mb-4 px-6 py-4 bg-kakaoYello text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={kakaoCodeURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
