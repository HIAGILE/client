import { NotFound } from " pages/404";
import { Logout } from " pages/logout-page";
import Main from " pages/main-dashboard";
import Header from "components/header/header-appbar";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const clientRoutes = [
  {
    path: "/",
    component: <Main />,
  },
];

export const LoggedInRouter = () => (
  <>
    <Header />
    <Routes>
      {clientRoutes.map((route) => {
        return (
          <Route path={route.path} key={route.path} element={route.component} />
        );
      })}
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/login" element={<Navigate to="/" replace={true} />} />
      <Route path="/join" element={<Navigate to="/" replace={true} />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
);
