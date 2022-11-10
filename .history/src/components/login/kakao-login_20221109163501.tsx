import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const KakaoLoginBtn = () => {
  const param = useParams();
  const REST_API_KEY = "b3a9beab04e6e23fce4144d6733c69ab";
  const REDIRECT_URI = `http://127.0.0.1:3000/social/kakao`;
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return (
    <button className="mb-4 px-6 py-4 bg-kakaoYello text-md text-center w-full focus:outline-none rounded-full shadow-lg">
      <a href={kakaoCodeURL} className="w-full">
        Login with Kakao
      </a>
    </button>
  );
};

export default KakaoLoginBtn;
