import { useMe } from 'hooks/useMe';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import userFilled from '../../images/icon/userFilled.svg';
import bellAlarm from 'images/icon/bellAlarm.svg';

const MainBar = () => {
  return (
    <div className="flex justify-between absolute px-8 py-6 w-full">
      <SearchBar />
      <div className="flex items-center">
        <Alarm />
        <MyProfile />
      </div>
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

const Alarm = () => {
  const alarm = false;
  const [toggle, setToggle] = useState(false);
  function clickAlarm() {
    setToggle(!toggle);
  }
  return (
    <div className="cursor-pointer" onClick={clickAlarm}>
      <p className="mr-4 pt-1 relative">
        <img src={bellAlarm} alt="bellAlarm" />
        {!alarm && (
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-mainRed"></span>
        )}
      </p>
      {toggle && <AlarmList />}
    </div>
  );
};

const AlarmList = () => {
  const alarms = [
    '환영합니다. username 님!',
    '가입을 축하드려요.',
    '프로젝트를 생성해서 애자일 템플릿을 적용해 보세요!',
  ];
  return (
    <div className="fixed top-0 right-4 z-50 w-full h-full">
      <ol className="absolute top-16 right-0 w-[360px] mt-1 shadow-lg bg-white rounded-lg overflow-hidden">
        {alarms.map((alarm) => (
          <li
            key={alarm}
            className="hover:bg-middleBlue transition px-4 py-3 w-full text-sm text-darkGray border-2 border-lightGray"
          >
            {alarm}
          </li>
        ))}
      </ol>
    </div>
  );
};

const MyProfile = () => {
  const { data: myProfile, loading: myProfileLoading } = useMe();
  const [toggle, setToggle] = useState(false);
  function clickProfile() {
    setToggle(!toggle);
  }
  const porfileImg = '';

  return (
    <div className="relative flex" onClick={clickProfile}>
      <div className=" text-darkGray text-sm flex items-center cursor-pointer">
        <p className="bg-white transition w-8 h-8 mr-2 p-2 rounded-full ring-2 ring-lightGray shadow-md">
          {(myProfile && (
            <img
              src={myProfile?.me.profileUrl}
              alt="porfileImg"
              className="w-8"
            />
          )) || <img src={userFilled} alt="userFilled" className="w-8" />}
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
    <div className="fixed top-0 right-4 z-50 w-full h-full">
      <ol className="absolute top-16 right-0 w-[160px] mt-1 shadow-lg bg-white rounded-lg overflow-hidden">
        {menus.map((menu) => (
          <Link to={menu.link} className="text-darkGray" key={menu.title}>
            <li className="hover:bg-middleBlue transition px-4 py-2 w-full text-center text-sm text-darkGray border-2 border-lightGray">
              {menu.title}
            </li>
          </Link>
        ))}
      </ol>
    </div>
  );
};
