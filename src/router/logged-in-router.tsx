import React from 'react';
import { NotFound } from ' pages/404';
import CreateProject from ' pages/create-project';
import { Logout } from ' pages/logout-page';
import MainDashboard from ' pages/main-dashboard';
import MyProfile from ' pages/my-profile';
import AppBar from 'components/header/header-appbar';
import DashboardLayout from 'components/layout/dashboard-layout';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddMembers from ' pages/add-members';
import { Process } from 'components/common/process';
import { ProjectDashboard } from ' pages/project-dashboard';
import { ProjectDetail } from ' pages/project-detail';
import { FriendsDashboard } from ' pages/friends-dashboard';
import { ScheduleDashboard } from ' pages/schedule-dashboard';
import { ToDoListDashboard } from ' pages/todolist-dashboard';
import { isLoggedInVar, meVar } from 'apollo';
import { useReactiveVar } from '@apollo/client';
import { Confirm } from ' pages/confirm';

const clientRoutes = [
  {
    path: '/',
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: '/login',
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: '/join',
    component: <Navigate to="/main" replace={true} />,
  },
  {
    path: '/main',
    component: <MainDashboard />,
  },
  {
    path: '/profile',
    component: <MyProfile />,
  },
  {
    path: '/create-project',
    component: <CreateProject />,
  },
  {
    path: '/add-members/:projectId',
    component: <AddMembers />,
  },
  {
    path: '/confirm/:code',
    component: <Confirm />,
  },
  {
    path: '/logout',
    component: <Logout />,
  },
  {
    path: '/project',
    component: <ProjectDashboard />,
  },
  {
    path: '/project/:projectId',
    component: <ProjectDetail />,
  },
  {
    path: '/friends',
    component: <FriendsDashboard />,
  },
  {
    path: '/schedule',
    component: <ScheduleDashboard />,
  },
  {
    path: '/todolist',
    component: <ToDoListDashboard />,
  },
  {
    path: '*',
    component: <NotFound />,
  },
];

export const LoggedInRouter = () => {
  return (
    <>
      <AppBar />
      <DashboardLayout>
        <Process />
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
