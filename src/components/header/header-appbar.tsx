import React from 'react';
import Logo from 'components/common/logo';
import { Link } from 'react-router-dom';

function AppBar() {
  return (
    <div className="w-[200px] py-8 flex flex-col items-start bg-darkBlue absolute inset-0">
      <div className="ml-6">
        <Logo mode="home" />
      </div>
      <AppMenu />
    </div>
  );
}

export default React.memo(AppBar);

const AppMenu = () => {
  const menus = [
    { title: 'My Agile', link: '/' },
    { title: 'My Projects', link: '/project' },
    { title: 'My Friends', link: '/friends' },
    { title: 'My To-do', link: '/todolist' },
    { title: 'My Schedules', link: '/schedule?view=month&me=0' },
  ];
  return (
    <nav className="w-full mt-48 text-lightBlue text-md">
      <ul className="grid gap-4">
        {menus.map((menu) => {
          return (
            <Link key={menu.title} to={menu.link}>
              <li className="py-2 pl-8 transition duration-300 ease-in-out hover:bg-white hover:text-darkBlue cursor-pointer">
                {menu.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};
