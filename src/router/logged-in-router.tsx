import { NotFound } from " pages/404";
import Main from " pages/main-dashboard";
import Header from "components/header/header-appbar";
import React from "react";
import { Route, Routes } from "react-router-dom";

const clientRoutes = [
  {
    path: "/",
    component: <Main />,
  },
];

export const LoggedInRouter = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        {clientRoutes.map((route) => {
          return (
            <Route
              path={route.path}
              key={route.path}
              element={route.component}
            />
          );
        })}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
