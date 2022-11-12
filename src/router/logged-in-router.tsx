import React from "react";
import { NotFound } from " pages/404";
import CreateProject from " pages/create-project";
import { Logout } from " pages/logout-page";
import MainDashboard from " pages/main-dashboard";
import MyProfile from " pages/my-profile";
import AppBar from "components/header/header-appbar";
import DashboardLayout from "components/layout/dashboard-layout";
import { Route, Routes, Navigate } from "react-router-dom";

const clientRoutes = [
  {
    path: "/",
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: "/login",
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: "/join",
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
  {
    path: "/logout",
    component: <Logout />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];

export const LoggedInRouter = () => {
  return (
    <>
      <AppBar />
      <DashboardLayout>
        <Routes>
          {clientRoutes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </DashboardLayout>
    </>
  );
};
