import { gql } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MutatingDots } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";

export const KAKAO_LOGIN_MUTATION = gql`
    mutation kakaoLoginMutation($kakaoOAuthInput: KakaoOAuthInput!){
        kakaoLogin(input:$kakaoOAuthInput){
            ok
            token
            error
        }
    }
`

export function KakaoConfirm() {
    const {search} = useLocation()
    useEffect(()=>{
        const x = new URLSearchParams(search);
    },[]);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Kakao Confirm | Hi Agile</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">카카오 로그인 중입니다....</h2>
            <h4 className="font-medium text-base mb-5">
                다른 페이지로 이동하지 마세요.
            </h4>
            <MutatingDots
            height={120}
            width={120}
            color="rgb(74 222 128)"
            secondaryColor="rgb(239 68 68)"
            radius={12.5}
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass={""}
            visible={true}
            />
        </div>
    )
}