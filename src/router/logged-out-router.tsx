import React from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from " pages/404";
import { Login } from " pages/login-page";
import { CreateAccount } from " pages/create-account";

export const LoggedOutRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/create-account" element={<CreateAccount />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
