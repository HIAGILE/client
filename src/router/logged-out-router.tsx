import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound } from ' pages/404';
import { Login } from ' pages/login/login-page';
import { Join } from ' pages/login/join-page';
import { Logout } from ' pages/logout-page';
import { GithubConfirm } from ' pages/login/GithubConfirm';
import { KakaoConfirm } from ' pages/login/KakaoConfirm';

export const LoggedOutRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/social/github"
        element={<GithubConfirm></GithubConfirm>}
      ></Route>
      <Route
        path="/social/kakao"
        element={<KakaoConfirm></KakaoConfirm>}
      ></Route>
      <Route path="/join" element={<Join />} />
      <Route path="*" element={<Navigate to="/login" replace={true} />} />
    </Routes>
  );
};
