import React from "react";
import { Link } from "react-router-dom";
import logoWhite from "../../images/logoWhite.svg";
import Logo from "components/common/logo";

function AppBar() {
  return (
    <div className="bg-darkBlue absolute inset-0 -z-50 py-8 px-4 flex flex-col justify-between">
      <Logo className="justify-start" mode="home" />
      <AppMenu />
      <Link to="/logout" className="text-lightGray ml-4 mb-12">
        로그아웃
      </Link>
    </div>
  );
}

export default AppBar;

const AppMenu = () => {
  return (
    <nav className="text-lightGray ml-4">
      <ul className="grid gap-2">
        <li>메뉴1</li>
        <li>메뉴1</li>
        <li>메뉴1</li>
        <li>메뉴1</li>
        <li>메뉴1</li>
      </ul>
    </nav>
  );
};
