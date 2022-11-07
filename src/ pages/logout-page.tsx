import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/login/login-form";
import KakaoLoginBtn from "components/login/kakao-login";
import GitHubLoginBtn from "components/login/github-login";
import LoginLayout from "components/layout/login-layout";
import { LOCALSTORAGE_TOKEN } from "constant";
import { authTokenVar, client, isLoggedInVar } from "../apollo";

export function Logout() {
    const navigate = useNavigate();
    useEffect(()=>{
        alert("다음에 또 만나요! 😍😍😍");
        authTokenVar("");
        isLoggedInVar(false)
        localStorage.removeItem(LOCALSTORAGE_TOKEN);
        client.resetStore();
        navigate("/")
    },[])
    return null
}
