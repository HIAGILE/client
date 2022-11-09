import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { useEffect } from "react";
import { gql } from "@apollo/client";

// export const GITHUB_LOGIN_QUERY = gql`
//   query githubLogin($oAuthInput: OAuthInput) {
//     githubLogin(input: $oAuthInput) {
//       token
//     }
//   }
// `;

export const GITHUB_LOGIN_QUERY = gql`
    mutation githubLoginMutation($gitHubOAuthInput: GitHubOAuthInput!){
        githubLogin(input:$gitHubOAuthInput){
            ok
            token
            error
        }
    }
`

export function GithubConfirm(){
    const {search} = useLocation()
    useEffect(()=>{
        const x = new URLSearchParams(search);
        console.log(x.get("code"))
    },[]);
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>GitHub Confirm | Hi Agile</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">깃허브 로그인 중입니다....</h2>
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