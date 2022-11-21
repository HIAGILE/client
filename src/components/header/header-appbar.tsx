import React from 'react';
import Logo from 'components/common/logo';
import { Link } from 'react-router-dom';

function AppBar() {
  return (
    <div className="w-[200px] px-4 py-8  flex flex-col  items-start bg-darkBlue absolute inset-0">
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
    <nav className="w-full mt-48 pl-2 text-lightBlue text-sm ">
      <ul className="grid gap-4">
        {menus.map((menu) => {
          return (
            <li
              key={menu.title}
              className="transition flex justify-start items-center hover:bg-white hover:text-darkBlue cursor-pointer "
            >
              <Link to={menu.link}>{menu.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
