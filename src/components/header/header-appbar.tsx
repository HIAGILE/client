import React from 'react';
import Logo from 'components/common/logo';
import { Link } from 'react-router-dom';

function AppBar() {
  return (
    <div className="w-[200px] py-8 flex flex-col items-center bg-darkBlue absolute inset-0 pr-10">
      <Logo mode="home" />
      <AppMenu />
    </div>
  );
}

export default AppBar;

const AppMenu = () => {
  const menus = [
    { title: 'My Agile', link: '/' },
    { title: '프로젝트', link: '/project' },
    { title: '친구찾기', link: '/friends' },
    { title: '일감관리', link: '/todolist' },
    { title: '일정관리', link: '/schedule' },
  ];
  return (
    <nav className="w-full mt-48 text-lightBlue text-md">
      <ul className="grid gap-4">
        {menus.map((menu) => {
          return (
            <Link key={menu.title} to={menu.link}>
              <li

                className="h-10 transition duration-300 ease-in-out flex justify-center items-center hover:bg-white hover:text-darkBlue cursor-pointer "
              >
                {menu.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
