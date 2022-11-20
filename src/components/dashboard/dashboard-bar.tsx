import { useMe } from 'hooks/useMe';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userFilled from '../../images/icon/userFilled.svg';
// https://icon-icons.com/ko/pack/Teamleader-Icons/2346

const MainBar = () => {
  return (
    <div className="flex justify-between absolute px-4 py-6 w-full">
      <SearchBar />
      <MyProfile />
    </div>
  );
};

export default MainBar;

const SearchBar = () => {
  return (
    <form method="post">
      <input
        placeholder="search"
        name="search"
        type="text"
        className="search-input"
      />
    </form>
  );
};

const MyProfile = () => {
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const [toggle, setToggle] = useState(false);
  const porfileImg = '';

  return (
    <div
      className="relative flex"
      onMouseOver={() => setToggle(true)}
      onMouseOut={() => setToggle(false)}
    >
      <div className=" text-darkGray text-sm flex items-center cursor-pointer">
        <p className="bg-white transition w-8 h-8 mr-2 p-2 rounded-full ring-2 ring-lightGray shadow-md">
          {(porfileImg && <img src={porfileImg} className="w-8" />) || (
            <img src={userFilled} alt="teamleadercrm" className="w-8" />
          )}
        </p>
        {myProfile?.me.name || 'user'}
        {toggle && <ProfileMenu />}
      </div>
    </div>
  );
};

const ProfileMenu = () => {
  const menus = [
    { title: 'My Profile', link: '/profile' },
    { title: 'Found Friends', link: '/search-friends' },
    { title: 'Logout', link: '/logout' },
  ];
  return (
    <div className="absolute top-10 -right-4 z-50 ">
      <ol className="w-40 mt-1 shadow-lg bg-white rounded-lg border-2 border-lightGray">
        {menus.map((menu) => (
          <Link to={menu.link} className="text-darkGray" key={menu.title}>
            <li className="hover:bg-middleBlue transition py-2 w-full text-center text-sm">
              {menu.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};
