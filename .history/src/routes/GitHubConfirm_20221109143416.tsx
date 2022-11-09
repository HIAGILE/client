import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { githubLoginMutation, githubLoginMutationVariables } from "__generated__/githubLoginMutation";
import { LOCALSTORAGE_TOKEN } from "constant";

// export const GITHUB_LOGIN_QUERY = gql`
//   query githubLogin($oAuthInput: OAuthInput) {
//     githubLogin(input: $oAuthInput) {
//       token
//     }
//   }
// `;

export const GITHUB_LOGIN_MUTATION = gql`
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
    const navigate = useNavigate()
    const onCompleted = (data: githubLoginMutation) => {
    const {
          githubLogin: { ok,token,error },
        } = data;
        if (!ok) {
            alert(error);
        }
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            //authTokenVar(token);
            //isLoggedInVar(true);
            navigate("/");
        }
      };


    const [
        githubLoginMutation,
        { loading, data: githubLoginMutationResult },
      ] = useMutation<githubLoginMutation, githubLoginMutationVariables>(
        GITHUB_LOGIN_MUTATION,
        { onCompleted }
      );
    
    const codeSending = (code:string) => {
        if (!loading) {
            githubLoginMutation({
            variables: {
                gitHubOAuthInput: {
                code:code,
              },
            },
          });
        }
      };
    useEffect(()=>{
        const x = new URLSearchParams(search).get('code');
        codeSending(x ?? "")
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