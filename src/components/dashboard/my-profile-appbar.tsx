import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userFilled from '../../images/icon/userFilled.svg';
import { useMe } from 'lib/useMe';

const MyProfile = () => {
  const { data: myProfile, loading: myProfileLoading } = useMe();

  const [toggle, setToggle] = useState(false);
  function clickProfile() {
    setToggle(!toggle);
  }

  return (
    <div className="relative flex" onClick={clickProfile}>
      <div className=" text-darkGray text-sm flex items-center cursor-pointer">
        <p className="bg-white transition w-8 h-8 mr-2 rounded-full ring-2 ring-lightGray shadow-md">
          {(myProfile && (
            <img
              src={myProfile?.me.profileUrl}
              alt="porfileImg"
              className="w-8 "
            />
          )) || <img src={userFilled} alt="userFilled" className="w-8 p-1" />}
        </p>
        {myProfile?.me.name || 'user'}
        {toggle && <ProfileMenu />}
      </div>
    </div>
  );
};
export default MyProfile;

const ProfileMenu = () => {
  const menus = [
    { title: 'My Profile', link: '/profile' },
    { title: 'My Project', link: '/project' },
    { title: 'My Work', link: '/todolist' },
    { title: 'Search Friends', link: '/friends' },
    { title: 'Logout', link: '/logout' },
  ];
  return (
    <div className="fixed top-0 right-4 z-50 w-full h-full">
      <ol className="absolute top-16 right-0 w-[160px] mt-1 shadow-lg bg-white rounded-lg overflow-hidden">
        {menus.map((menu) => (
          <Link to={menu.link} className="text-darkGray" key={menu.title}>
            <li className="hover:bg-middleBlue transition duration-300 ease-in-out px-4 py-2 w-full text-center text-sm text-darkGray border-2 border-lightGray">
              {menu.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};
