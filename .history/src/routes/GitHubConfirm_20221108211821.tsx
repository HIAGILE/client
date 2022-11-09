import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function GithubConfirm(){
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>GitHub Confirm | Hi Agile</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">깃허브 로그인 중입니다....</h2>
            <h4 className="font-medium text-base mb-5">
                다른 페이지로 이동하지 마세요.
            </h4>
        </div>
    )
}