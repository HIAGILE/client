import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Header() {
  return (
    <>
      <div className="flex container border-b-1">
        <Logo />
        <AppBar />
      </div>
      <AppMenu />
    </>
  );
}

export default Header;

const AppBar = () => {
  return (
    <div className="flex justify-between items-center w-full px-20 border-b-2 shadow-md">
      <Link to="/">
        <h1 className="text-xl font-bold">Hi, Agile</h1>
      </Link>
      <div className="">logout</div>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="border-r-2 border-b-2 px-16 py-2">
      <Link to="/">
        <img src={logo} alt="uberlogo" className="w-14" />
      </Link>
    </div>
  );
};

const AppMenu = () => {
  return (
    <div className="absolute border-r-2 w-40 h-screen px-2 py-8">
      <p>welcome, {"회원명"}</p>
      <nav></nav>
    </div>
  );
};
