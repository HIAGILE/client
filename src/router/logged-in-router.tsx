import React from "react";
import { NotFound } from " pages/404";
import CreateProject from " pages/create-project";
import { Logout } from " pages/logout-page";
import MainDashboard from " pages/main-dashboard";
import MyProfile from " pages/my-profile";
import AppBar from "components/header/header-appbar";
import DashboardLayout from "components/layout/dashboard-layout";
import { Route, Routes, Navigate } from "react-router-dom";
import AddMembers from " pages/add-members";
import { ProjectDashboard } from " pages/project-dashboard";

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
    path: "/create-project",
    component: <CreateProject />,
  },
  {
    path: "/add-members/:projectId",
    component: <AddMembers />,
  },
  {
    path: "/logout",
    component: <Logout />,
  },
  {
    path: "/project/:projectId",
    component: <ProjectDashboard />,
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
