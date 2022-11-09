import { NotFound } from " pages/404";
import CreateProject from " pages/create-project";
import { Logout } from " pages/logout-page";
import MainDashboard from " pages/main-dashboard";
import MyProfile from " pages/my-profile";
import AppBar from "components/header/header-appbar";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const clientRoutes = [
  {
    path: "/",
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: "/main",
    component: <MainDashboard />,
  },
  {
    path: "/profile",
    component: <MyProfile />,
  },
  {
    path: "/createproject",
    component: <CreateProject />,
  },
];

export const LoggedInRouter = () => (
  <>
    <AppBar />
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
