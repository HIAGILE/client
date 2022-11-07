import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const NotFound = () =>{
    return(
        <div className="h-screen flex flex-col items-center justify-center">
            <Helmet>
                <title>Not Found | Hi Agile</title>
            </Helmet>
            <h2 className="font-semibold text-2xl mb-3">페이지를 찾지 못했어요 😂😂😂😂</h2>
            <h4 className="font-medium text-base mb-5">
            찾는 페이지가 존재하지 않거나 삭제된 것 같아요.
            </h4>
            <Link className="hover:underline text-red-600" to="/">
            메인으로 돌아갈까요? &rarr;
            </Link>
        </div>
    );
}