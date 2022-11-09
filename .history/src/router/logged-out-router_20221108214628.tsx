import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from " pages/404";
import { Login } from " pages/login-page";
import { Join } from " pages/join-page";
import { Logout } from " pages/logout-page";
import { GithubConfirm } from "routes/GithubConfirm";
import { KakaoConfirm } from "routes/KakaoConfirm";

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/:path" element={<Login />} />
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/social/github" element={<GithubConfirm></GithubConfirm>}></Route>
      <Route path="/social/kakao" element={<KakaoConfirm></KakaoConfirm>}></Route>
      <Route path="/join" element={<Join />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
