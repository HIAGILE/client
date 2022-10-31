import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from " pages/404";
import { Login } from " pages/login-page";
import { Join } from " pages/join-page";

export const LoggedOutRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/join" element={<Join />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
