import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./util/apollo";
import React from "react";
import { LoggedInRouter } from "./router/logged-in-router";
import { LoggedOutRouter } from "./router/logged-out-router";

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};
