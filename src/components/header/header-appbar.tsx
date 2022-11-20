import React from 'react';
import Logo from 'components/common/logo';

function AppBar() {
  return (
    <div className="bg-darkBlue absolute inset-0 py-8 flex flex-col w-[160px] items-center">
      <Logo mode="home" />
      <AppMenu />
    </div>
  );
}

export default AppBar;

const AppMenu = () => {
  return (
    <nav className="text-lightGray w-full">
      <ul className="grid gap-5">
        <li className="py-4 hover:bg-white hover:text-darkBlue transition flex justify-center items-center">
          My Agile
        </li>
        <li className="py-4 hover:bg-white hover:text-darkBlue transition flex justify-center items-center">
          프로젝트
        </li>
        <li className="py-4 hover:bg-white hover:text-darkBlue transition flex justify-center items-center">
          친구찾기
        </li>
        <li className="py-4 hover:bg-white hover:text-darkBlue transition flex justify-center items-center">
          일감관리
        </li>
        <li className="py-4 hover:bg-white hover:text-darkBlue transition flex justify-center items-center">
          일정관리
        </li>
      </ul>
    </nav>
  );
};
