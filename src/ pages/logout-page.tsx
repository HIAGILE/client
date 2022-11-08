import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_TOKEN } from "constant";
import { authTokenVar, client, isLoggedInVar } from "../util/apollo";

export function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    alert("다음에 또 만나요! 😍😍😍");
    authTokenVar("");
    isLoggedInVar(false);
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    client.resetStore();
    navigate("/");
  }, []);
  return null;
}
