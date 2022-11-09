import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MutatingDots } from "react-loader-spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { kakaoLoginMutation, kakaoLoginMutationVariables } from "__generated__/kakaoLoginMutation";

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
    const navigate = useNavigate()
    const onCompleted = (data: kakaoLoginMutation) => {
    const {
        kakaoLogin: { ok,token },
      } = data;
      if (ok) {
        alert("카카오 로그인 완료!");
        navigate("/");
      }
    };
  
    const [
        kakaoLoginMutation,
        { loading, data: kakaoLoginMutationResult },
        ] = useMutation<kakaoLoginMutation, kakaoLoginMutationVariables>(
            KAKAO_LOGIN_MUTATION,
        { onCompleted }
        );

    const codeSending = (code:string) => {
        if (!loading) {
            kakaoLoginMutation({
            variables: {
                kakaoOAuthInput: {
                    code:code,
                },
            },
            });
        }
        };
    useEffect(()=>{
        const x = new URLSearchParams(search);
        codeSending(x.toString())
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